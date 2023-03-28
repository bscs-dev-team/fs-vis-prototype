import './Exploration.css';
// const CSV2JSON = require('convert-csv-to-json');

function rnd() { return Math.trunc(Math.random()*100)/10; }

export default function DataTable() {

  const headers = ['DATE', 'WaterType', 'pH', 'CL ppm', 'Alk ppm', 'Nitrate', 'Nitrite', 'Hardness' ];
  const data = [];
  // Generate random data
  for (let i = 0; i<50; i++) {
    const type = Math.random() > 0.5 ? 'Pond': 'Stream';
    const ph = rnd();
    const cl = rnd();
    const al = rnd();
    const ni = rnd();
    const na = rnd();
    const hd = rnd();
    data.push(['1/14/23', type, ph, cl, al, ni, na, hd ])
  }

  // Load CSV
  // const csvFile = './data/springpeepers.csv';
  // const json = CSV2JSON.getJsonFromCsv(csvFile);
  // console.log(JSON.stringify(json));

  return (
    <div className="DataTable">
        <table>
          <thead>
            <tr>
              {headers.map((h, i) => (
                  <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((item, i) => (
                  <td key={i}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
