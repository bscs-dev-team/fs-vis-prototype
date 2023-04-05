import './Exploration.css';
import GraphIcon from './GraphIcon';

export default function GraphView({graphData, handleGraphTitle, handleGraphDescription}) {

  console.warn('GraphView Render', graphData)
  return (
    <div className="GraphView" style={{ width: '100%', display: 'grid', gridTemplateColumns: '300px auto' }}>
      {graphData && <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <input value={graphData.title} onChange={handleGraphTitle} style={{ flexGrow: 1 }}/>
              <button>[ ]</button>
            </div>
            <textarea onChange={handleGraphDescription} value={graphData.description} style={{width: '98%', height: '10em'}}/>
            <div style={{ flexGrow: 1}}>&nbsp;</div>
            <div className="colophon"><a>Data</a> from <a>Water Insights</a> project</div>
            <div className="colophon">Powered by <a>FieldScope</a></div>
          </div>
          <GraphIcon size="max" type={graphData.type} />
          </>
      }
    </div>
  );
}
