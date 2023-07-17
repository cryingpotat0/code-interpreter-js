
// CodeCell.tsx

import React, { useState, useRef } from 'react';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { Collapse } from 'react-bootstrap';

interface Props {
    index: number;
}

const CodeCell: React.FC<Props> = ({ index }) => {
    const [code, setCode] = useState('');
    const [open, setOpen] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleRunCode = () => {
        if (!iframeRef.current) return;
        const iframe = iframeRef.current;
        const script = `
      <body>
          ${eval(code)}
      </body>`;
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(script);
    };

    return (
        <Box sx={{ marginBottom: 2 }}>
            <Button onClick={() => setOpen(!open)}>
                {open ? 'Collapse' : 'Expand'}
            </Button>
            <Collapse in={open}>
                <div>
                    <TextField
                        id={`outlined-multiline-static-${index}`}
                        label={`Code Block ${index + 1}`}
                        multiline
                        value={code}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <Button onClick={handleRunCode}>Run</Button>
                    <iframe title={`Output ${index + 1}`} ref={iframeRef} />
                </div>
            </Collapse>
        </Box>
    );
};

export default CodeCell;
