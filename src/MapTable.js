import './Exploration.css';
import DataTable from './DataTable';
import map from './img/vis-widget-card-map.png';

export default function MapTable({data, handleAddFilter}) {

  return (
    <div className="MapTable">
        <button>Table/Map</button>
        <div style={{ display: "grid", gridTemplateColumns: "80% 20%", height: "100%"}}>
            <DataTable />
            <img src={map} alt="map"/>
        </div>
    </div>
  );
}
