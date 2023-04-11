import { useState, useEffect } from 'react';
import './Exploration.css';
import GraphIcon from './GraphIcon';
import Help, { showhelpStyle } from './Help';

export default function History({data, selected, handleShowHistory, handleShowSaved, handleGraphSelect, handleAddGraph}) {

  useEffect(() => {
    console.log('useEffect history')
    const els = document.getElementsByClassName('selected');
    els[0].scrollIntoView()
  })

  const showHistory = data.showHistory;

  function handleGraphClick(filterIndex, graphIndex) {
    handleGraphSelect(filterIndex, graphIndex);
  }

      
  const [showhelp, setShowhelp] = useState(false);  
  const helptext = `"History" keeps track of the filters and graphs you've created,
   as well as the graphs you saved. Click on a graph to select it. 
   Click on "SAVED GRAPHS" to toggle between a full history view and a list of graphs
   you've saved.`

  return (
    <>
      <Help helptext={helptext} left="350px" showhelp={showhelp}/>
      <div className="History short"  onMouseEnter={()=>setShowhelp(true)} onMouseLeave={()=>setShowhelp(false)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr"}}>
            <div className="toggleButton on"  onClick={handleShowHistory}>HISTORY</div>
            <div className="toggleButton"  onClick={handleShowSaved}>SAVED GRAPHS</div>
          </div>
          <div className="browserViewer">
            <div className="browser">
              <ul>
              {data.filtersets.map((d, filterIndex) => 
                <li key={filterIndex} 
                  style={{ display: "flex" }}
                  className={filterIndex===data.selectedFilterSetIndex ? 'selected' : ''}>
                    {showHistory && <div className="FilterSet  filtersetTitle">{d.title !== undefined ? d.title : 'No Filters'}</div>}
                    {d.graphs.map((g, graphIndex) => {
                      if (showHistory || g.saved) {
                        return <GraphIcon 
                          key={graphIndex}
                          type={g.type}
                          size="small"
                          selected={(filterIndex===data.selectedFilterSetIndex) && (data.selectedGraphIndex === graphIndex)}
                          saved={g.saved}
                          handleClick={() => handleGraphClick(filterIndex, graphIndex)}
                        />
                      }
                      // No graph
                      return <div></div>
                    })}
                    {filterIndex===data.selectedFilterSetIndex && <button className="primary" onClick={handleAddGraph}>+ GRAPH</button>}
                </li>
              )}
              </ul>
            </div>
          </div>
        </div>
    </>
   );
}
