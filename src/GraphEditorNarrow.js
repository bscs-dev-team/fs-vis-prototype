import './Exploration.css';
import GraphIcon from './GraphIcon';

export default function GraphEditor({graphData, handleAddFilter, handleGraphTypeSelect}) {

  return (
    <div className="GraphEditor" style={{ overflow: 'hidden' }}>
      <div className="system">DATA DISPLAY</div>
      {graphData && <div style={{ display: "grid", gridTemplateColumns: "40px 2fr"}}>
        <label>X:</label>
        <input value={'x'}  />
        <label>Y:</label>
        <input value={'y'}  />
        <label></label>
        <label style={{textAlign: 'left'}}>Select Graph Type:</label>
        <label></label>
        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", rowGap: '10px'}}>
          <GraphIcon size="large" type="map" handleClick={() => handleGraphTypeSelect('map')} />
          <GraphIcon size="large" type="histogram" handleClick={() => handleGraphTypeSelect('histogram')} />
          <GraphIcon size="large" type="numeric" handleClick={() => handleGraphTypeSelect('numeric')} />
          <GraphIcon size="large" type="scatterplot" handleClick={() => handleGraphTypeSelect('scatterplot')} />
          <GraphIcon size="large" type="timeseries" handleClick={() => handleGraphTypeSelect('timeseries')} />
          <GraphIcon size="large" type="whisker" handleClick={() => handleGraphTypeSelect('whisker')} />
        </div>
        <label></label>
        <div>
          <a>Copy to Clipboard</a>
          <a>Download PNG</a>
        </div>
      </div>}
    </div>
  );
}
