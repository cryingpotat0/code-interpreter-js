import React, { ChangeEvent, useRef, } from 'react';
import { AppStateProps } from '../dataContext';

type HeroInputProps = AppStateProps

const HeroInput: React.FC<HeroInputProps> = ({
    appState: {
    },
    setAppState
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setAppState((prevState) => ({
                ...prevState,
                data: e.target?.result as string,
            }));
            reader.readAsText(file);
        }
    };


    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    }

    return (
        // A wide textbox with a tiny file upload button on the left corner.
        <div className="flex justify-center align-middle">
            <div
                className="w-2/12 text-center justify-center align-middle text-lg rounded p-3 cursor-pointer"
                onClick={handleFileInputClick}
            >
                <span role="img" aria-label="File">📁</span>
                <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
            </div>
            <input
                className="w-11/12 text-left text-sm my-5 border border-gray-300 rounded p-3"
                placeholder="What do you want to do"
            />

        </div>
    );
};

export default HeroInput;
