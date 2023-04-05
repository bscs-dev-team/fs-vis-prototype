import './Exploration.css';

export default function DataTable({tableData}) {
  const HACK = [
    "Observation Date is the date the data was observed and recorded",
    "Start Time is the local time when the participant started to listen/record for frog sounds",
    "End Time is the local time when the participant stopped listening/recording frog sounds",
    "Species is the frog species heard",
    "Call Intensity is the number of individuals heard",
    "Air Temperature in Celcius",
    "Characterize Land Use is the type of land area",
    "Observation Notes are additional notes taken during the observation"
  ]
  console.log('table render')
  return (
    <div className="DataTable" style={{ display: "grid" }}>
        <table>
          <thead>
            <tr>
              {tableData.headers.map((h, i) => (
                  <th key={i}><div title={HACK[i]}>{h}</div></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.data.map((row, i) => (
              <tr key={i}>
                {row.map((item, i) => (
                  <td key={i}>
                    <div style={{ height: '1.2em', overflow: 'hidden'}} title={item}>{item}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
