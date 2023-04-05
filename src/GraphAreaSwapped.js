import './Exploration.css';
import GraphView from './GraphViewWide';
import GraphEditor from './GraphEditorNarrow';

export default function GraphArea({graphData, handleGraphTitle, handleGraphDescription, handleGraphTypeSelect, handleGraphSave, handleGraphDelete}) {

  const isDirty = true;
  console.error('GraphArea')

  return (
    <div className="GraphArea" style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: "grid", gridTemplateColumns: "350px auto"}}>
            <GraphEditor graphData={graphData} handleGraphTypeSelect={handleGraphTypeSelect}/>
            <GraphView 
              graphData={graphData}
              handleGraphTitle={handleGraphTitle}
              handleGraphDescription={handleGraphDescription}
            />
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
