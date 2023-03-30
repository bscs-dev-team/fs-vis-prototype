import { useEffect } from 'react';
import './Exploration.css';
import GraphIcon from './GraphIcon';

export default function History({data, selected, handleShowHistory, handleShowSaved, handleGraphSelect, handleAddGraph}) {

  useEffect(() => {
    const els = document.getElementsByClassName('selected');
    els[0].scrollIntoView()
  })

  const showHistory = data.showHistory;

  function handleGraphClick(filterIndex, graphIndex) {
    handleGraphSelect(filterIndex, graphIndex);
  }

  return (
    <div className="History">
      <button onClick={handleShowHistory}>HISTORY</button><button onClick={handleShowSaved}>SAVED GRAPHS</button>
      <div className="browserViewer">
        <div className="browser">
          <ul>
          {data.filtersets.map((d, filterIndex) => 
            <li key={filterIndex} className={filterIndex===data.selectedFilterSetIndex ? 'selected' : ''}>
                <div className="filtersetTitle">{d.title !== undefined ? d.title : 'No Filters'}</div>
                {d.graphs.map((g, graphIndex) => {
                  if (showHistory || g.saved) {
                    return <GraphIcon 
                      key={graphIndex}
                      type={g.type}
                      selected={(filterIndex===data.selectedFilterSetIndex) && (data.selectedGraphIndex === graphIndex)}
                      saved={g.saved}
                      handleClick={() => handleGraphClick(filterIndex, graphIndex)}
                    />
                  }
                  return <div>No Graph</div>
                }
                )}
                {filterIndex===data.selectedFilterSetIndex && <button className="primary" onClick={handleAddGraph}>+ GRAPH</button>}
            </li>
          )}
          </ul>
        </div>
      </div>
    </div>
  );
}
