import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { vim } from "@replit/codemirror-vim";
import { keymap } from "@codemirror/view";
import { WebContainer } from "@webcontainer/api";
import { files } from "./InnerReactWrapper";
import { ProgressBar, ProgressStep } from './ProgressBar';

const src_python_js = `
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'x': np.random.rand(100),
    'y': np.random.rand(100),
})

# do some manipulation of the data
df['x'] = df['x'] * 100
df['y'] = df['y'] * 100
`

function CodeBlock({
    setCurrentStep
}: {
    setCurrentStep: Dispatch<SetStateAction<ProgressStep['name']>>
}) {
    const onChange = useCallback((_value: string, _viewUpdate) => {
    }, []);
    const src_victory_js = files['src']['directory']['victory.js']['file']['contents'];
    const [jsxCode, setJsxCode] = useState<string>(src_victory_js);
    const [_pythonResult, setPythonResult] = useState<any | undefined>(undefined);
    const [pyCode, setPyCode] = useState<string>(src_python_js);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [webContainer, setWebContainer] = useState<WebContainer | undefined>(undefined);
    const [pyodide, setPyodide] = useState<any | undefined>(undefined);
    const [termOutput, setTermOutput] = useState<string | undefined>(undefined);

    useEffect(() => {
        (async () => {
            await Promise.all([
                (async () => {
                    console.log('Loading pyodide');
                    // @ts-ignore
                    const pyodide_ = await window.loadPyodide();
                    console.log('Loaded pyodide');
                    setPyodide(pyodide_);
                })(),
                (async () => {
                    try {
                        setCurrentStep('Booting');
                        const webcontainerInstance = await WebContainer.boot();
                        setWebContainer(webcontainerInstance);
                        setCurrentStep('Mounting');
                        await webcontainerInstance.mount(files);
                        setCurrentStep('Installing');
                        const installProcess = await webcontainerInstance.spawn('npm', ['install']);
                        if (await installProcess.exit !== 0) {
                            throw new Error(`Failed to install: ${JSON.stringify(await installProcess.output.getReader().read())}`);
                        }
                        setCurrentStep('Starting');
                        const runProcess = await webcontainerInstance.spawn('npm', ['run', 'start']);
                        webcontainerInstance.on('error', (error) => {
                            console.error('webcontainer Error', error);
                        });
                        webcontainerInstance.on('server-ready', (_port, url) => {
                            setCurrentStep('Running');
                            setUrl(url);
                        });
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
                    } catch (e: any) {
                        if (e?.message === 'WebContainer already booted') {
                            return
                        }
                        throw e;
                    }
                })()
            ]);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (webContainer) {
                console.log('writing to webcontainer');
                await webContainer.fs.writeFile('src/victory.js', jsxCode);
            }
        })();
    }, [jsxCode]);

    useEffect(() => {
        if (pyCode === src_python_js) {
            return;
        }
        (async () => {
            if (pyodide) {
                console.log('pyodide is ready');
                await pyodide.loadPackage(['pandas', 'numpy']);
                console.log('loaded pandas and numpy');
                pyodide.runPython(pyCode);
                console.log('ran python');
                const df = pyodide.globals.get('df');
                const df_json = df.to_json();
                console.log('got df', df_json);
                setPythonResult(df_json);
                setJsxCode(`const data = ${df_json};\n${jsxCode}`);
            }
        })();
    }, [pyodide, pyCode]);

    return (
        <div className="w-10/12">
            {!webContainer && <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <div>Loading...</div>
            </div>}
            {webContainer && <>
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <CodeMirror
                        value={pyCode}
                        height="200px"
                        width="100%"
                        extensions={[
                            keymap.of([{
                                key: "Ctrl-Enter",
                                run: (editorView) => {
                                    const code = editorView.state.doc.toString()
                                    const result = code;
                                    // TODO: condition on whether it's javascript or JSX
                                    setPyCode(result);
                                    console.log(`Python! Ctrl-Enter ${result}`);
                                    return true;
                                }
                            }]),
                            vim(),
                            basicSetup(),
                            python()
                        ]}
                    />
                </div>
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <CodeMirror
                        value={jsxCode}
                        height="200px"
                        width="100%"
                        extensions={[
                            keymap.of([{
                                key: "Ctrl-Enter",
                                run: (editorView) => {
                                    const code = editorView.state.doc.toString()
                                    const result = code;
                                    // TODO: condition on whether it's javascript or JSX
                                    setJsxCode(result);
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
                </div>
            </>}
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

    const [currentStep, setCurrentStep] = useState<ProgressStep['name']>('Booting');

    return (
        <>
            <div className="bg-white text-gray-600 flex text-center items-center justify-center m-3 p-3">
                <div className="w-6/12">
                    <ProgressBar<ProgressStep, 'name'>
                        steps={[
                            { name: 'Booting' },
                            { name: 'Mounting' },
                            { name: 'Installing' },
                            { name: 'Starting' },
                            { name: 'Running' },
                        ]}
                        propertyName={'name'}
                        currentStep={currentStep} />
                </div>
            </div>
            <div className="bg-white text-gray-600 flex items-center justify-center">
                <CodeBlock setCurrentStep={setCurrentStep} />
            </div>
        </>
    );
}

export default App;
