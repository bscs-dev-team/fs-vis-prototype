import './Exploration.css';
import GraphView from './GraphViewWide';
import GraphEditor from './GraphEditorNarrow';

export default function GraphArea({graphData, handleAddGraph, handleGraphTitle, handleGraphDescription, handleGraphTypeSelect, handleGraphSave, handleGraphDelete, handleNotImplemented}) {

  const isDirty = true;

  console.log('graphData is', graphData)
  return (
    <div className="GraphArea" style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: "grid", gridTemplateColumns: "auto"}}>
        {/* <div style={{ display: "grid", gridTemplateColumns: "350px auto"}}> */}
            { graphData.title !== undefined &&
              <>
                {!graphData.saved && <GraphEditor graphData={graphData} handleGraphTypeSelect={handleGraphTypeSelect}/>}
                <GraphView 
                  graphData={graphData}
                  handleGraphTitle={handleGraphTitle}
                  handleGraphDescription={handleGraphDescription}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#999'}}>
                  <button className="link" onClick={handleNotImplemented}>DUPLICATE (Save As)</button>
                  <button className="link" onClick={handleGraphDelete}>DELETE</button>
                  <button className="secondary" onClick={handleNotImplemented}>CLOSE</button>
                  <button disabled={!isDirty} className={isDirty ? "primary" : ""} onClick={handleGraphSave}>SAVE</button>
                </div>
              </>
            }
        </div>
    </div>
  );
}
