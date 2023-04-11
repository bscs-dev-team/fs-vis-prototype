import { useState, useEffect } from 'react';
import './Exploration.css';
import GraphIcon from './GraphIcon';
import Help, { showhelpStyle } from './Help';

export default function GraphView({graphData, handleGraphTitle, handleGraphDescription}) {

  const [showhelp, setShowhelp] = useState(false);  
  const helptext = `This is the graph view that plots the data from the filtered table. 
  [This prototype is nonfunctional and just shows a static graph.]  
  Add a graph title and description.  If you want to keep a graph, click "Save" to save it.`

  console.warn('GraphView Render', graphData)
  return (
    <div>
      <Help helptext={helptext} left="30px" showhelp={showhelp}/>
      <div className="GraphView" style={{ width: '100%', display: 'grid', gridTemplateColumns: '33% auto' }}  onMouseEnter={()=>setShowhelp(true)} onMouseLeave={()=>setShowhelp(false)}>
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
    </div>
  );
}
