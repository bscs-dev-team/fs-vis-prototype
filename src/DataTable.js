import { useState, useEffect } from 'react';
import './Exploration.css';
const csv2json = require('csvtojson');
import csvFileUrl from 'url:./data/frogs.csv';

function rnd() { return Math.trunc(Math.random()*100)/10; }

let alreadyLoaded = false;

const fieldsToShow = [
  "Observation Date",
  "Start Time",
  "End Time",
  "Species",
  "Call Intensity",
  "Air Temperature",
  "Characterize Land Use",
  "Observation Notes"
]

export default function DataTable() {

  // HACKED DATA
  // const headers = ['DATE', 'WaterType', 'pH', 'CL ppm', 'Alk ppm', 'Nitrate', 'Nitrite', 'Hardness' ];
  // const data = [];
  // // Generate random data
  // for (let i = 0; i<50; i++) {
  //   const type = Math.random() > 0.5 ? 'Pond': 'Stream';
  //   const ph = rnd();
  //   const cl = rnd();
  //   const al = rnd();
  //   const ni = rnd();
  //   const na = rnd();
  //   const hd = rnd();
  //   data.push(['1/14/23', type, ph, cl, al, ni, na, hd ])
  // }

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const json = [
    { date: '', stime: '' }
  ]

  console.log('setting alreadyLoaded to false')
  useEffect(() => {
    async function loadCSV() {
      if (alreadyLoaded) {
        return console.log('...skipping');
      }
      console.log('...loadCSV!')
      await fetch(csvFileUrl)
        .then(r => r.text())
        .then(text => {
          console.log('......result', alreadyLoaded)
          alreadyLoaded = true;
          csv2json()
            .fromString(text)
            .then((json) => {
              if (json === undefined) return console.error('Could not load CSV!');
              // setHeaders( Object.keys(json[0]).filter( h => fieldsToShow.includes(h) ) );
              setHeaders( fieldsToShow );
              setData( () => {
                const fieldData = json.map(row => {
                  const items = [];
                  fieldsToShow.forEach(k => items.push(row[k]));
                  return items;
                });
                console.log('fieldData', fieldData)
                return fieldData;
              });
            });
        });
    }

    // 
    console.error('useEffect!', alreadyLoaded)
    loadCSV();
    return
  }, [data, headers]);

  return (
    <div className="DataTable" style={{ display: "grid" }}>
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
