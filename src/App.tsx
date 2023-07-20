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
    const src_victory_js = files['src']['directory']['victory.js']['file']['contents'];
    const [result, setResult] = useState<string>(src_victory_js);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [webContainer, setWebContainer] = useState<WebContainer | undefined>(undefined);
    const [termOutput, setTermOutput] = useState<string | undefined>(undefined);

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
                // Read the readable stream of runProcess
                const reader = runProcess.output.getReader();
                setInterval(async () => {
                    const { done, value } = await reader.read()

                    // When no more data needs to be consumed, break the loop.
                    if (done) {
                        reader.releaseLock();
                        return;
                    }

                    setTermOutput((prev) => {
                        return `${prev}${value}`;
                    });
                }, 500);
                console.log('Ran');
            } catch (e: any) {
                if (e?.message === 'WebContainer already booted') {
                    return
                }
                throw e;
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (webContainer) {
                console.log('writing to webcontainer');
                await webContainer.fs.writeFile('src/victory.js', result);
            }
        })();
    }, [result]);

    return (
        <div className="w-10/12">
            {!webContainer && <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <div>Loading...</div>
            </div>}
            {webContainer && <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <CodeMirror
                    value={result}
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
            <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4 h-screen">
                <iframe src={url} className="w-full h-full" seamless></iframe>
            </div>
            <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <div className="text-lg font-bold">Terminal Output</div>
                <div className="text-sm">{termOutput}</div>
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
