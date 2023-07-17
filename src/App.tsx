import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useState } from 'react';
import { vim } from "@replit/codemirror-vim"
import { keymap } from "@codemirror/view"

const CodeBlock = () => {
    const onChange = useCallback((_value: string, _viewUpdate) => {
    }, []);
    const [result, setResult] = useState("");

    return (
        <div className="w-10/12">
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <CodeMirror
                    value="console.log('hello world!');"
                    height="200px"
                    width="100%"
                    extensions={[
                        keymap.of([{
                            key: "Ctrl-Enter",
                            run: (editorView) => {
                                const code = editorView.state.doc.toString()
                                const result = eval(code);
                                setResult(String(result));
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
            {/* Make a result pane for when Ctrl-Enter is pressed */}
            {result?.length > 0 && <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p>{result}</p>
            </div>}
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
