import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useEffect, useState } from 'react';
import { vim } from "@replit/codemirror-vim";
import { keymap } from "@codemirror/view";
import { WebContainer } from "@webcontainer/api";
import { files } from "./InnerReactWrapper";

const CodeBlock = () => {
    const onChange = useCallback((_value: string, _viewUpdate) => {
    }, []);
    const [_result, setResult] = useState<string | undefined>(undefined);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [webContainer, setWebContainer] = useState<WebContainer | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                const webcontainerInstance = await WebContainer.boot();
                setWebContainer(webcontainerInstance);
                console.log('Mounting');
                await webcontainerInstance.mount(files);
                console.log('Mounted, installing');
                const installProcess = await webcontainerInstance.spawn('npm', ['install']);
                console.log('Install process', installProcess);
                if (await installProcess.exit !== 0) {
                    throw new Error(`Failed to install: ${JSON.stringify(await installProcess.output.getReader().read())}`);
                }
                console.log('Installed, running');
                const runProcess = await webcontainerInstance.spawn('npm', ['run', 'start']);
                webcontainerInstance.on('error', (error) => {
                    console.error('webcontainer Error', error);
                });
                webcontainerInstance.on('server-ready', (port, url) => {
                    console.log('Server ready', port, url);
                    setUrl(url);
                });
                console.log('waiting for run');
                if (await runProcess.exit !== 0) {
                    throw new Error(`Failed to run: ${JSON.stringify(await runProcess.output.getReader().read())}`);
                }
                console.log('Ran');
            } catch (e: any) {
                if (e?.message === 'WebContainer already booted') {
                    return
                }
                throw e;
            }
        })();
    }, []);


    return (
        <div className="w-10/12">
            {!webContainer && <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <div>Loading...</div>
            </div>}
            {webContainer && <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <CodeMirror
                    value="console.log('hello world!');"
                    height="200px"
                    width="100%"
                    extensions={[
                        keymap.of([{
                            key: "Ctrl-Enter",
                            run: (editorView) => {
                                const code = editorView.state.doc.toString()
                                const result = code;
                                // TODO: condition on whether it's javascript or JSX
                                setResult(result);
                                console.log(`Run! Ctrl-Enter ${result}`);
                                return true;
                            }
                        }]),
                        vim(),
                        basicSetup(),
                        javascript({ jsx: true })
                    ]}
                    onChange={onChange}
                />
            </div>}
            {/* Make a result pane for when Ctrl-Enter is pressed */}
            <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <iframe src={url} className="w-full" sandbox="allow-scripts" seamless></iframe>
            </div>
        </div>
    )
}

const App = () => {

    return (
        <div className="bg-white text-gray-600 min-h-screen flex items-center justify-center">
            <CodeBlock />
        </div>
    );
}

export default App;
