import './Exploration.css';
import GraphIcon from './GraphIcon';

export default function GraphView({graphData, handleGraphTitle, handleGraphDescription}) {

  return (
    <div className="GraphView" style={{ display: 'flex', flexDirection: 'column' }}>
      {graphData && <>
          <div style={{ display: 'flex' }}>
            <input value={graphData.title} onChange={handleGraphTitle} style={{ flexGrow: 1 }}/>
            <button>[ ]</button>
          </div>
          <textarea onChange={handleGraphDescription} value={graphData.description} />
          <GraphIcon  size="max" type={graphData.type} />
          </>
      }
    </div>
  );
}
