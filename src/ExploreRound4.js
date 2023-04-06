import React from "react";

import './Explore.css';
import ExplorationTitle from './ExplorationTitle';
import History from './History';
import FilterSet from './FilterSet';
import MapTable from './MapTable';
import GraphArea from './GraphArea';


/* 
  Set 1
  
  FILTER  |  HISTORY 
  TABLE | MAP
  GRAPH

*/


export default function Explore({
  e,
  tableData,
  handleTitleUpdate,
  handleFilterTitle,
  handleFilterSource,
  handleAddFilter,
  handleShowHistory,
  handleShowSaved,
  handleGraphSelect,
  handleAddGraph,
  handleGraphTitle,
  handleGraphDescription,
  handleGraphTypeSelect,
  handleGraphSave,
  handleGraphDelete
}) {

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  return (
    <div className="Explore" style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'column', maxHeight: '25%', padding: "10px"}}>
        <ExplorationTitle title={e.title} handleTitleUpdate={handleTitleUpdate} />
        <div style={{display: "grid", gridTemplateColumns: '1fr 1fr', columnGap: '10px', height: '90%' }}>
          <FilterSet data={e.filtersets[e.selectedFilterSetIndex]} 
            filters={tableData.headers}
            handleFilterTitle={handleFilterTitle}
            handleFilterSource={handleFilterSource}
            handleAddFilter={handleAddFilter} />
          <History data={e} 
            handleShowHistory={handleShowHistory}
            handleShowSaved={handleShowSaved}
            handleGraphSelect={handleGraphSelect} 
            handleAddGraph={handleAddGraph} />
        </div>
      </div>
      <div style={{ flexGrow: 1, overflow: 'hidden' }}>
        <MapTable tableData={tableData} />
      </div>
      <GraphArea 
        graphData={e.filtersets[e.selectedFilterSetIndex].graphs[e.selectedGraphIndex]}
        handleGraphTitle={handleGraphTitle}
        handleGraphDescription={handleGraphDescription}
        handleGraphTypeSelect={handleGraphTypeSelect}
        handleGraphSave={handleGraphSave}
        handleGraphDelete={handleGraphDelete}
      />
    </div>
  );
}
