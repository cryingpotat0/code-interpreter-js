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
const data = {"x":{"0":35.0356912461,"1":30.0961356521,"2":30.3969385009,"3":0.012187011,"4":6.5055006433,"5":0.5788094767,"6":40.8608248101,"7":45.336702571,"8":15.8852589205,"9":28.5312541481,"10":14.784937706,"11":43.075300721,"12":45.7110754631,"13":37.4129193939,"14":41.3076033338,"15":45.9477171207,"16":31.0756816295,"17":18.46560633,"18":8.9999842468,"19":40.3728717389,"20":43.5004344435,"21":19.6717306362,"22":35.5990944346,"23":42.1979235014,"24":48.9950275853,"25":26.4031168059,"26":3.4094081559,"27":33.0712634344,"28":22.1834664614,"29":47.5247821294,"30":18.8970717549,"31":1.7453785933,"32":15.0798936748,"33":29.3394817188,"34":0.740995668,"35":16.8087458793,"36":11.6828533556,"37":1.9908962997,"38":46.6397450293,"39":7.278076905,"40":37.4698424364,"41":13.2264592138,"42":27.4867815749,"43":39.0750468421,"44":26.7181138692,"45":9.2193377029,"46":25.3453782274,"47":33.2581771115,"48":37.3315806891,"49":13.8874562547,"50":26.2737940603,"51":2.7306349632,"52":32.3580446947,"53":47.3098854748,"54":3.086695516,"55":45.3351904979,"56":25.1191763329,"57":9.9605546451,"58":5.0569361977,"59":18.2383315956,"60":45.4642538967,"61":4.7937918166,"62":39.4895214567,"63":14.3300366051,"64":27.2052899344,"65":36.5986530005,"66":26.0496614809,"67":8.4162663486,"68":45.324854411,"69":48.0102812109,"70":1.276178439,"71":32.8435459092,"72":31.2856034463,"73":20.3206047818,"74":44.6139397274,"75":15.4193748352,"76":6.0424882049,"77":12.0968684574,"78":40.7523909514,"79":2.636169783,"80":7.3165832693,"81":47.4355655218,"82":6.2459548712,"83":6.3880526784,"84":39.3100992137,"85":5.0597570514,"86":39.9239067128,"87":32.8670942167,"88":34.5172659687,"89":23.9852845588,"90":32.8546747859,"91":11.3899852745,"92":38.3641809609,"93":20.4483924695,"94":10.426850447,"95":11.8163452361,"96":17.8526949492,"97":7.7308994709,"98":27.2325126549,"99":46.5541555922},"y":{"0":18.6197154931,"1":43.6387798976,"2":5.2470788443,"3":13.107175798,"4":36.294069156,"5":29.465329365,"6":5.9617051728,"7":14.2464773614,"8":14.328860979,"9":39.9869719527,"10":7.8753074126,"11":43.9564414131,"12":19.9022974038,"13":19.4930905578,"14":6.183980899,"15":28.1045135005,"16":20.1090922284,"17":0.9035523524,"18":21.3176160514,"19":17.2216749398,"20":33.5168728698,"21":0.6771984026,"22":15.2980426648,"23":10.1548061619,"24":33.6198575685,"25":8.4532603429,"26":12.5250519177,"27":3.0925343093,"28":31.601022207,"29":38.5637501444,"30":34.1460004414,"31":0.4203133367,"32":18.0734720966,"33":41.4588927052,"34":45.2612056208,"35":42.5744023331,"36":30.2782772053,"37":3.7843648717,"38":37.8891624931,"39":19.6542897662,"40":42.6415745409,"41":30.0265591521,"42":9.0010459305,"43":9.9839503765,"44":44.7643935546,"45":11.3049824252,"46":33.8899725657,"47":49.0398230546,"48":31.9279191261,"49":31.6537657428,"50":0.8770459723,"51":25.0915257841,"52":24.8531610911,"53":6.7212264571,"54":3.9305078744,"55":45.8838434767,"56":18.9386518503,"57":2.3977102265,"58":22.6709745405,"59":2.507321558,"60":39.7819307355,"61":7.0399866986,"62":9.0144459644,"63":11.8806393058,"64":2.9919203678,"65":5.636324818,"66":26.5627353688,"67":48.3673102225,"68":45.7332093739,"69":30.1189737987,"70":12.8114999004,"71":11.4298372184,"72":37.5578593442,"73":10.4435816627,"74":27.606884016,"75":39.0558300518,"76":12.4510825358,"77":20.9911922039,"78":25.5029277197,"79":11.6298567978,"80":45.538531675,"81":9.218200852,"82":25.7989061918,"83":18.7423939299,"84":35.0154451932,"85":28.5655546396,"86":45.1460966409,"87":48.2213126831,"88":22.7726620865,"89":5.1329541488,"90":39.9901421725,"91":36.1028051767,"92":4.7382607816,"93":16.7287129043,"94":2.5885183362,"95":23.0281328599,"96":24.850379444,"97":40.0207099412,"98":13.6091390985,"99":14.7432055415}};

// Convert the data into a format that victory likes.
const victoryData = []
for (const xInd in data["x"]) {
  victoryData.push({
    x: data["x"][xInd],
    y: data["y"][xInd]
  })
}


import { VictoryScatter, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
export default function Victory() {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{ x: [0, 100], y: [0, 100] }}
        >
        <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={2}
          data={victoryData}
          />
      </VictoryChart> 
    )
}

// const data2012 = [
//   {quarter: 1, earnings: 13000},
//   {quarter: 2, earnings: 16500},
//   {quarter: 3, earnings: 14250},
//   {quarter: 4, earnings: 19000}
// ];

// const data2013 = [
//   {quarter: 1, earnings: 15000},
//   {quarter: 2, earnings: 12500},
//   {quarter: 3, earnings: 19500},
//   {quarter: 4, earnings: 13000}
// ];

// const data2014 = [
//   {quarter: 1, earnings: 11500},
//   {quarter: 2, earnings: 13250},
//   {quarter: 3, earnings: 20000},
//   {quarter: 4, earnings: 15500}
// ];

// const data2015 = [
//   {quarter: 1, earnings: 18000},
//   {quarter: 2, earnings: 13250},
//   {quarter: 3, earnings: 15000},
//   {quarter: 4, earnings: 12000}
// ];

// import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
// export default function Victory() {
//     return (
//       <VictoryChart
//         domainPadding={20}
//         theme={VictoryTheme.material}
//       >
//         <VictoryAxis
//           tickValues={[1, 2, 3, 4]}
//           tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
//         />
//         <VictoryAxis
//           dependentAxis
//           tickFormat={(x) => (\`\$\${x / 1000}k\`)}
//         />
//         <VictoryStack
//           colorScale={"warm"}
//         >
//           <VictoryBar
//             data={data2012}
//             x="quarter"
//             y="earnings"
//           />
//           <VictoryBar
//             data={data2013}
//             x="quarter"
//             y="earnings"
//           />
//           <VictoryBar
//             data={data2014}
//             x="quarter"
//             y="earnings"
//           />
//           <VictoryBar
//             data={data2015}
//             x="quarter"
//             y="earnings"
//           />
//         </VictoryStack>
//       </VictoryChart>
//     )
// }
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
