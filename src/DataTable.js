import './Exploration.css';

export default function DataTable({tableData}) {
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
                  <td key={i}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
