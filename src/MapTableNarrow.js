import './Exploration.css';
import DataTable from './DataTable';

export default function MapTable({tableData}) {
  return (
    <div className="MapTable" style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: "flex" }}>
          <div className="stats" style={{ flexGrow: 1 }}>Observations Found: {tableData.count}</div>
          {/* <button>Table/Map</button> */}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "100%", height: "100%", overflow: "hidden"}}>
            <DataTable tableData={tableData} />
        </div>
    </div>
  );
}
