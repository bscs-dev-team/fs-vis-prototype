import { useEffect } from 'react';
import './Exploration.css';
import GraphIcon from './GraphIcon';

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

  return (
    <div className="History short">
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
  );
}
