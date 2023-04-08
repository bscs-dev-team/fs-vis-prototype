import './Exploration.css';
import DataTable from './DataTable';
import map from './img/context-map.png';

export default function MapTable({tableData, handleAddFilter}) {

  return (
    <div className="MapTable" style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: "flex" }}>
          <div className="stats" style={{ flexGrow: 1 }}>{tableData.count} Observations</div>
          <button>Table/Map</button>
        </div>
        {/* <div style={{ display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "100%", height: "100%", overflow: "hidden"}}> */}
          <DataTable tableData={tableData} />
          <div style={{ position: 'relative' }}>
            <img src={map} alt="map" style={{ width: '150px', position: 'absolute', right: '5px', bottom: '10px'}} />
          </div>
        {/* </div> */}
    </div>
  );
}
