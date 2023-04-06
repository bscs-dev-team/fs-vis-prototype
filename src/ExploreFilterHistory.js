import React from "react";

import './Explore.css';
import ExplorationTitle from './ExplorationTitle';
import History from './History';
import FilterSet from './FilterSet';
import MapTable from './MapTable';
import GraphArea from './GraphArea';

/* 
  Set 2

  FILTER
  HISTORY 
  TABLE
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
      {/* LAYOUT with three rows */}
      {/* History / Filters */}
      <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: "10px"}}>
        <ExplorationTitle title={e.title} handleTitleUpdate={handleTitleUpdate} />
        <div style={{display: "grid", gridTemplateColumns: '300px 1fr', columnGap: '10px', height: '90%' }}>
          <div style={{display: "flex", flexDirection: 'column', maxHeight: '50%'}}>
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
      </div>
      {/* Table */}
      <div style={{ flexGrow: 1, overflow: 'hidden', height: '100%' }}>
        {/* <Generic/> */}
        <MapTable tableData={tableData} />
      </div>
      {/* Graph Area */}
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
