import './Exploration.css';
import DataTable from './DataTable';
import map from './img/vis-widget-card-map.png';

export default function MapTable({data, handleAddFilter}) {

  return (
    <div className="MapTable" style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: "flex" }}>
          <div className="stats" style={{ flexGrow: 1 }}>{data.count} Observations</div>
          <button>Table/Map</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "80% 20%", gridTemplateRows: "100%", height: "100%", overflow: "hidden"}}>
            <DataTable data={data} />
            <img src={map} alt="map"/>
        </div>
    </div>
  );
}
