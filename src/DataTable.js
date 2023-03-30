import './Exploration.css';

export default function DataTable({tableData}) {
  console.log('table render')
  return (
    <div className="DataTable" style={{ display: "grid" }}>
        <table>
          <thead>
            <tr>
              {tableData.headers.map((h, i) => (
                  <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.data.map((row, i) => (
              <tr key={i}>
                {row.map((item, i) => (
                  <td key={i}>
                    <div style={{ height: '1.2em', overflow: 'hidden'}}>{item}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
