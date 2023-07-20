import { FileSystemTree } from "@webcontainer/api";
// import package_json from "../inner-react/package.json";
// import src_App_js from "../inner-react/src/App.txt";
// import src_index_js from "../inner-react/src/index.txt";

const package_json = `
{
  "name": "stackblitz-starters-hekkme",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@types/react": "18.2.15",
    "@types/react-dom": "18.2.7",
    "victory": "~36.6"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "react-scripts": "latest"
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
import Victory from './victory';

function App() {
    return (
        <div className="App">
            <Victory />
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

const src_victory_js = `
const data2012 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2013 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data2014 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

const data2015 = [
  {quarter: 1, earnings: 18000},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 15000},
  {quarter: 4, earnings: 12000}
];

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
export default function Victory() {
    return (
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (\`\$\${x / 1000}k\`)}
        />
        <VictoryStack
          colorScale={"warm"}
        >
          <VictoryBar
            data={data2012}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2013}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2014}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2015}
            x="quarter"
            y="earnings"
          />
        </VictoryStack>
      </VictoryChart>
    )
}
`

const public_index_html = `
<!DOCTYPE html>
    <div id="root"></div>
</html>
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
            "victory.js": {
                file: {
                    contents: src_victory_js,
                }
            }
        }
    },
    "public": {
        directory: {
            "index.html": {
                file: {
                    contents: public_index_html,
                }
            }
        }
    }
};
