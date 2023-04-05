import React, { useState, useEffect, useCallback } from "react";
import { useImmer } from "use-immer";

import './Explore.css';
import ExplorationTitle from './ExplorationTitle';
import History from './History';
import Generic from './Generic';
import FilterSet from './FilterSet';
import MapTable from './MapTable';
import GraphArea from './GraphArea';
// import History from './History';
// import FilterSet from './FilterSet';
// import MapTable from './MapTable';
// import GraphArea from './GraphArea';

const csv2json = require('csvtojson');
import csvFileUrl from 'url:./data/frogs.csv';

// CSV DATA LOADING
let alreadyLoaded = false;
const fieldsToShow = [ // in sort order
  "Observation Date",
  "Start Time",
  "End Time",
  "Species",
  "Call Intensity",
  "Air Temperature",
  "Characterize Land Use",
  "Observation Notes"
]
let fullDataSet;


export default function Explore() {
  // CSV
  const [tableData, updateTableData] = useImmer({count: 0, headers: [], data: []});
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  // -- Loader Function
  async function loadCSV() {
    if (alreadyLoaded) return console.log('...skipping');
    console.log('...loadCSV!')
    await fetch(csvFileUrl)
      .then(r => r.text())
      .then(text => {
        console.log('......result', alreadyLoaded)
        alreadyLoaded = true;
        csv2json()
          .fromString(text)
          .then((json) => {
            if (json === undefined) return console.error('Could not load CSV!');
            setHeaders( fieldsToShow );
            // const fieldData = json.map(row => {
            //   const items = [];
            //   fieldsToShow.forEach(k => items.push(row[k]));
            //   return items;
            // });
            setData( json );
            const allData = {
              count: json.length,
              data: json,
              headers: fieldsToShow
            };
            fullDataSet = allData;
            console.warn('......loadCSV apply filter allData is', allData)
            applyFilters(allData);
          });
      });
  }
  // -- Init Load
  useEffect(() => {
    console.error('useEffect!', alreadyLoaded)
    loadCSV();
    return
  }, [data, headers]);


  // Exploration Data
  const [ e, updateE ] = useImmer({
    selectedFilterSetIndex: 0,
    selectedGraphIndex: 0,
    count: 5000,

    showHistory: true,

    title: 'March 10 2023 4:35p Exploration',
    filtersets: [
      {
        title: undefined,
        source: 'FrogWatch',
        filters: [],
        graphs: [
          {
            title: 'No filter',
            description: 'Map',
            type: 'map'
          }
        ]
      },
      // {
      //   title: 'Chlorine > 1',
      //   source: 'Water Insights',
      //   filters: [
      //     {
      //       title: "Chlorine > 0.1ppm",
      //       field: "Chlorine",
      //       min: 0.1,
      //       max: undefined
      //     }
      //   ],
      //   graphs: [
      //     {
      //       title: 'chlorine map',
      //       description: 'Default map',
      //       type: 'map',
      //       x: 'pH',
      //       y: 'Water Type'
      //     },
      //     {
      //       title: 'pH by Water Typer',
      //       description: 'Default graph',
      //       type: 'whisker',
      //       x: 'pH',
      //       y: 'Water Type'
      //     }
      //   ]
      // }
    ]
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  // EXPLORATION
  const handleTitleUpdate = useCallback(event => {
    updateE(draft => {draft.title = event.target.value});
  }, [updateE]);


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  // FILTER
  const handleAddFilter = useCallback((filter) => {
    let newFilters = [];
    updateE(draft => {
      const filterLabel = filter.title;
      const filterTitle = filter.title;

      const filterset = draft.filtersets[e.selectedFilterSetIndex];

      // Clone filterset
      const newFilterset = Object.assign({}, filterset);
      newFilterset.title = (filterset.title ? filterset.title + ', ' : '') + filterTitle;

      // Clone only the currently selected graph
      const selectedGraph = Object.assign({}, filterset.graphs[e.selectedGraphIndex]);
      selectedGraph.saved = undefined;
      newFilterset.graphs = [selectedGraph];
      draft.selectedGraphIndex = 0;

      // Clone Filter
      newFilters = [...filterset.filters]; // clone
      newFilters.push(filter);
      newFilterset.filters = newFilters;

      console.log('new filters', newFilters)
      draft.filtersets.push(newFilterset);
      draft.selectedFilterSetIndex = draft.filtersets.length-1; // select it
    });
    applyFilters(fullDataSet, newFilters);
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  const applyFilters = useCallback((allData, filters) => {
    console.log('applyFIlter caleld fullDataset is', fullDataSet)
    updateTableData(draft => {
      draft.headers = allData.headers;
      // Apply Filters
      // data {
      //   Observation: '1/2/23',
      //   Temperature: 5,
      //   Chlorine: 0.01,
      //   Notes: undefined
      // }
      // filter   {
      //       title: "Chlorine > 0.1ppm",
      //       field: "Chlorine",
      //       min: 0.1,
      //       max: undefined
      //     }
      const filteredData = filters 
        ? allData.data.filter(d => {
            let passed = true;
            filters.forEach(f => {
              if (!Object.hasOwn(d, f.field)) return;
              if (f.eq !== undefined && String(d[f.field]) !== String(f.eq)) passed=false;
              if (f.min !== undefined && Number(d[f.field]) <= Number(f.min)) passed=false;
              if (f.max !== undefined && Number(d[f.field]) >= Number(f.max)) passed=false;
            });
            return passed;
          }) 
        : allData.data;
      const rowData = filteredData.map(row => {
        const items = [];
        fieldsToShow.forEach(k => items.push(row[k]));
        return items;
      });
      draft.data = rowData;
      draft.count = rowData.length;
      console.log('count', draft.count)
    });
  }, [updateTableData, fieldsToShow]);

  const handleFilterTitle = useCallback(event => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      filterset.title = event.target.value;
    });
  }, [updateE, e.selectedFilterSetIndex]);

  const handleFilterSource = useCallback(event => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      filterset.source = event.target.value;
    });
  }, [updateE, e.selectedFilterSetIndex]);


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  // HISTORY
  const handleShowHistory = useCallback(() => {
    updateE(draft => {draft.showHistory = true});
  }, [updateE]);

  const handleShowSaved = useCallback(() => {
    updateE(draft => {draft.showHistory = false});
  }, [updateE]);

  const handleGraphSelect = useCallback((filterIndex, graphIndex) => {
    updateE(draft => {
      draft.selectedFilterSetIndex = filterIndex;
      draft.selectedGraphIndex = graphIndex;
    });
    console.log('try ', filterIndex,' filtersets', e.filtersets[filterIndex])
    try {
      const newFilters = e.filtersets[filterIndex].filters;
      applyFilters(fullDataSet, newFilters);
    } catch (e) {
      console.error('Failed', e )
    }
  }, [updateE, e]);


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  // GRAPH 
  const handleAddGraph = useCallback(() => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      const newGraph = Object.assign({},selectedGraph);
      newGraph.title = newGraph.title + " copy";
      newGraph.saved = undefined;
      filterset.graphs.push(newGraph);
      draft.selectedGraphIndex = filterset.graphs.length - 1; // select it
      console.warn('addGraph', draft);
    })
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  const handleGraphTitle = useCallback(event => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.title = event.target.value;
    });
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  const handleGraphDescription = useCallback(event => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.description = event.target.value;
    });
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  const handleGraphTypeSelect = useCallback(type => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.type = type;
      selectedGraph.description += ` ${type}`;
    });
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  const handleGraphSave = useCallback(event => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.saved = true;
    });
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  const handleGraphDelete = useCallback(event => {
    updateE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      filterset.graphs.splice(e.selectedGraphIndex);
      draft.selectedGraphIndex = filterset.graphs.length > 0
        ? draft.selectedGraphIndex - 1
        : -1;
    });
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);


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
