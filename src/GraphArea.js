import './Exploration.css';
import GraphView from './GraphView';
import GraphEditor from './GraphEditor';

export default function GraphArea({graphData, handleGraphTitle, handleGraphDescription, handleGraphTypeSelect, handleGraphSave, handleGraphDelete}) {

  const isDirty = true;

  return (
    <div className="GraphArea">
        <div style={{ display: "grid", gridTemplateColumns: "50% 50%"}}>
            <GraphView 
              graphData={graphData}
              handleGraphTitle={handleGraphTitle}
              handleGraphDescription={handleGraphDescription}
            />
            <GraphEditor handleGraphTypeSelect={handleGraphTypeSelect}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#999'}}>
          <button className="link">DUPLICATE (Save As)</button>
          <button className="link" onClick={handleGraphDelete}>DELETE</button>
          <button className="secondary">CLOSE</button>
          <button disabled={!isDirty} className={isDirty ? "primary" : ""} onClick={handleGraphSave}>SAVE</button>
        </div>
    </div>
  );
}
