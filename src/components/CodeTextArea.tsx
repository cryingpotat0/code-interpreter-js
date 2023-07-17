import React from 'react';
import * as d3 from 'd3';
import { AppStateProps } from '../dataContext';

type CodeTextAreaProps = AppStateProps

const CodeTextArea: React.FC<CodeTextAreaProps> = ({
    appState: {
        data,
        code,
    },
    setAppState
}) => {
    const handleRunCode = () => {
        try {
            // Your logic to integrate d3.js goes here.
            // Assuming data is available as a global or context.
            // eslint-disable-next-line no-new-func
            console.log('Running code', code, data);
            new Function('d3', 'data', code)(d3, data);
        } catch (error) {
            console.error('Error executing code', error);
        }
    };

    return (
        <div className="w-3/5 border border-gray-300 rounded my-5 flex flex-col">
            <textarea
                className="text-lg p-3 flex-grow"
                onChange={(e) => setAppState((prevState) => ({
                    ...prevState,
                    code: e.target.value,
                }))}
            />
            <button
                className="text-white bg-spotify-green p-2 rounded-bl rounded-br"
                onClick={handleRunCode}
            >
                Run
            </button>
        </div>
    );
};

export default CodeTextArea;
