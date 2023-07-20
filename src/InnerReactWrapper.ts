import { FileSystemTree } from "@webcontainer/api";
// import package_json from "../inner-react/package.json";
// import src_App_js from "../inner-react/src/App.txt";
// import src_index_js from "../inner-react/src/index.txt";

const package_json = `
{
  "name": "inner-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
`;

const src_App_js = `
function App() {
    return (
        <div className="App">
            This is my react app
        </div>
    );
}

export default App;
`

const src_index_js = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

`


export const files: FileSystemTree = {
    "package.json": {
        file: {
            contents: package_json,
        }
    },
    "src": {
        directory: {
            "App.js": {
                file: {
                    contents: src_App_js,
                },
            },
            "index.js": {
                file: {
                    contents: src_index_js,
                }
            },
        }
    }
};
