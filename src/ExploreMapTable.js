import React from "react";

import './Explore.css';
import ExplorationTitle from './ExplorationTitle';
import History from './HistoryShort';
import FilterSet from './FilterSetNarrow';
import ContextMap from './ContextMap';
import MapTable from './MapTable';
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
    handleGraphDelete,
    handleNotImplemented
  }) {
  
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  return (
    <div className="Explore" style={{ display: 'flex', flexDirection: 'column'}}>
      {/* LAYOUT with two columns */}
      {/* I. TTILE */}
      <div style={{ padding: '0 5px'}}>
        <ExplorationTitle title={e.title} handleTitleUpdate={handleTitleUpdate} />
      </div>
      {/* II. FILTERS/TABLE */}
      <div style={{overflow: 'hidden', flexGrow: 1, display: 'flex', flexDirection: 'row'}}>
        {/* History / Filters */}
        <div style={{overflow: 'hidden', minWidth: '350px', display: 'flex', flexDirection: 'column'}}>
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
        </div>
        <div style={{overflow: 'hidden', minWidth: '350px', display: 'flex', flexDirection: 'column'}}>
            {/* Table */}
            <div style={{ overflow: 'hidden', flexGrow: 1 }}>
                <MapTable tableData={tableData} />
            </div>
            {/* III. Graph Area */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* <Generic style={{ height: '200px' }} /> */}
                <GraphArea 
                    graphData={e.filtersets[e.selectedFilterSetIndex].graphs[e.selectedGraphIndex]}
                    handleAddGraph={handleAddGraph}
                    handleGraphTitle={handleGraphTitle}
                    handleGraphDescription={handleGraphDescription}
                    handleGraphTypeSelect={handleGraphTypeSelect}
                    handleGraphSave={handleGraphSave}
                    handleGraphDelete={handleGraphDelete}
                    handleNotImplemented={handleNotImplemented}
                />
            </div>
        </div>
      </div>
    </div>
  );
}
