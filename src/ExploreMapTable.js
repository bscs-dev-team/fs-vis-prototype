import React from "react";

import './Explore.css';
import ExplorationTitle from './ExplorationTitle';
import History from './HistoryShort';
import FilterSet from './FilterSetNarrow';
import MapTable from './MapTableNarrow';
import GraphArea from './GraphAreaSwapped';

/* 
  Set 4
  
  FILTER    |    TABLE | MAP
  HISTORY   |    TABLE

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
      {/* LAYOUT with two columns */}
      {/* I. TTILE */}
      <div style={{ padding: '2px 5px'}}>
        <ExplorationTitle title={e.title} handleTitleUpdate={handleTitleUpdate} />
      </div>
      {/* II. FILTERS/TABLE */}
      <div style={{overflow: 'hidden', flexGrow: 1, display: 'flex', flexDirection: 'row'}}>
        {/* History / Filters */}
        <div style={{overflow: 'hidden', minWidth: '350px', display: 'flex', flexDirection: 'column'}}>
            {/* <div style={{display: "grid", gridTemplateColumns: '300px 1fr', columnGap: '10px', height: '90%' }}> */}
                <div style={{height: '100%', display: "flex", flexDirection: 'column'}}>
                    <FilterSet data={e.filtersets[e.selectedFilterSetIndex]} 
                    filters={tableData.headers}
                    handleFilterTitle={handleFilterTitle}
                    handleFilterSource={handleFilterSource}
                    handleAddFilter={handleAddFilter} />
                    <History data={e} 
                        style={{flexGrow: 1}}
                        handleShowHistory={handleShowHistory}
                        handleShowSaved={handleShowSaved}
                        handleGraphSelect={handleGraphSelect} 
                        handleAddGraph={handleAddGraph} />
                </div>
            {/* </div> */}
        </div>
        {/* Table */}
        <div style={{ overflow: 'hidden'}}>
            {/* <Generic/> */}
            <MapTable tableData={tableData} />
        </div>
      </div>
      {/* III. Graph Area */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <Generic style={{ height: '200px' }} /> */}
        <GraphArea 
            graphData={e.filtersets[e.selectedFilterSetIndex].graphs[e.selectedGraphIndex]}
            handleGraphTitle={handleGraphTitle}
            handleGraphDescription={handleGraphDescription}
            handleGraphTypeSelect={handleGraphTypeSelect}
            handleGraphSave={handleGraphSave}
            handleGraphDelete={handleGraphDelete}
        />
      </div>
    </div>
  );
}
