import React, { useState, useEffect, useCallback } from "react";
import { useImmer } from "use-immer";

import ExploreRound4 from './ExploreRound4';
import ExploreFilterHistory from './ExploreFilterHistory';
import ExploreMapHistory from './ExploreMapHistory';
import ExploreMapTable from './ExploreMapTable';

const csv2json = require('csvtojson');
let csvFileUrl; // Defined in handleSetLayout;
import URLCHESAPEAKE from 'url:./data/chesapeake.csv';
import URLFROGS from 'url:./data/frogs.csv';
import URLJOURNEY from 'url:./data/journeynorth.csv';
import URLWATERINSIGHTS from 'url:./data/waterinsights.csv';

const DATASETS = [
  {
    label: 'chesapeake',
    url: URLCHESAPEAKE,
    headers: [ // in sort order
      "Station Name",
      "Observation Date",
      "Latitude",
      "Longitude",
      "Observation Time",
      "Observation Notes",
      "Relative Humidity",
      "Barometric Pressure",
      "Air Temperature",
      "Wind Direction ",
      "Visibility ",
      "Water Temperature",
      "Turbidity",
      "Secchi Depth",
      "Width",
      "Depth",
      "Stream Discharge",
      "Surface Water Appearance",
      "Stream Bank Eroision",
      "Water Type",
      "Salinity",
      "Conductivity",
      "Dissolved Oxygen",
      "Nitrate",
      "Ammonia",
      "Phosphate",
      "pH",
      "Biological Oxygen Demand",
      "Total Dissolved Solids",
      "Fecal Coliform",
      "Dissolved Carbon Dioxide",
      "Tolerant Macroinvertebrates",
      "Less Sensitive Macroinvertebrates",
      "Sensitive Macroinvertebrates",
      "Total Index Value",
      "Caddisfly (Trichoptera-Other)",
      "Mayfly (Ephemeroptera)",
      "Stonefly (Plecoptera)",
      "Watersnipe Flies (Diptera-Athericidae)",
      "Riffle Beetles (Elmidae)",
      "Water Pennies (Psephenidae)",
      "Gilled Snails (Viviparidae)",
      "Dobsonfies (Corydalinae)",
      "Fishflies (Chauliodinae)",
      "Netspinning Caddisfly (Trichoptera-Hydropsychidae)",
      "Damselflies (Zygoptera)",
      "Dragonflies (Anisoptera)",
      "Alderflies (Sialidae)",
      "Crayfish (Astacoidea)",
      "Scuds (Amphipoda)",
      "Aquatic Sowbugs (Isopoda)",
      "Clams (Sphaeriidae)",
      "Mussels (Palaeoheterodonta)",
      "Aquatic Worms (Oligochaeta)",
      "Black Flies (Diptera-Simuliidae)",
      "Midge Flies",
      "Leeches (Hirundinea)",
      "Lunged Snails (Pulmonata)",
      "Other Macroinvertebrate",
      "silt (mud)",
      'sand (1/16"" - 1/4"" grains)',
      'gravel (1/4"" - 2"" stones)',
      'cobbles (2"" - 10"" stones)',
      'boulders (> 10"" stones)',
      "trees",
      "shrubs",
      "grass",
      "bare soil",
      "rocks",
      "other"
    ]
  },
  {
    label: 'frogwatch',
    url: URLFROGS,
    headers: [ // in sort order
      "Observation Date",
      "Start Time",
      "End Time",
      "Species",
      "Call Intensity",
      "Air Temperature",
      "Characterize Land Use",
      "Observation Notes"
    ]
  },
  {
    label: 'journeynorth',
    url: URLJOURNEY,
    headers: [ // in sort order
      "Station Name",
      "Observation Date",
      "Latitude",
      "Longitude",
      "Reporting Category",
      "# Observed",
      "Comments"
    ]
  },  
  {
    label: 'waterinsights',
    url: URLWATERINSIGHTS,
    headers: [ // in sort order
      "Station Name",
      "Observation Date",
      "Latitude",
      "Longitude",
      "Water Type",
      "pH",
      "Nitrate",
      "Nitrite",
      "Hardness",
      "Chlorine",
      "Alkalinity",
      "Other Observations"
    ]
  },  
]


// CSV DATA LOADING
let alreadyLoaded = false;
let fieldsToShow = []; // in sort order
let fullDataset = [];

// LAYOUTS
const ROUND4 = 'Round 4';
const FILTERHISTORY = 'History below Filter';
const MAPHISTORY = 'Context Map below History';
const MAPTABLE = 'Context Map in Table';

export default function Explore() {
  // LAYOUT SELECTOR
  const [layout, setLayout] = useState();
  // CSV
  const [selectedDataset, setSelectedDataset] = useState(DATASETS[0]);
  const [tableData, updateTableData] = useImmer({count: 0, headers: [], data: []});

  // UI Handlers - - - - - - - - - - - - - - - - - 
  function handleDatasetSelect(e) {
    setSelectedDataset(DATASETS[e.target.value]);
    console.log('handle datsetselect', JSON.stringify(DATASETS[e.target.value]));
  }
  function handleSetLayout(layout) {
    // 1. Load CSV First
    //    a. set selected dataset
    console.warn('selected dataset', selectedDataset.url, selectedDataset.headers)
    csvFileUrl = selectedDataset.url;
    fieldsToShow = selectedDataset.headers;
    initFilters(selectedDataset.label);
    //    b. load 
    loadCSV();
    // 2. Then set layout
    setLayout(layout);
  }

  // CSV
  // const [data, setData] = useState([]);
  // const [headers, setHeaders] = useState([]);
  // -- Loader Function
  async function loadCSV() {
    if (alreadyLoaded) return console.log('...skipping');
    console.log('...loadCSV! csvFileUrl', csvFileUrl, fieldsToShow)
    await fetch(csvFileUrl)
      .then(r => r.text())
      .then(text => {
        console.log('......result', alreadyLoaded)
        alreadyLoaded = true;
        csv2json()
          .fromString(text)
          .then((json) => {
            if (json === undefined) return console.error('Could not load CSV!');
            // setHeaders( fieldsToShow );
            // const fieldData = json.map(row => {
            //   const items = [];
            //   fieldsToShow.forEach(k => items.push(row[k]));
            //   return items;
            // });
            // setData( json );
            const allData = {
              count: json.length,
              data: json,
              headers: fieldsToShow
            };
            fullDataset = allData;
            console.warn('......loadCSV apply filter allData is', allData)
            applyFilters(allData);
          });
      });
  }
  // NOW HANDLED BY handleSetLayout
  // // -- Init Load
  // useEffect(() => {
  //   console.error('useEffect!', alreadyLoaded)
  //   loadCSV();
  //   return
  // }, [data, headers]);


  // Exploration Data
  const [ e, updateE ] = useImmer({
    selectedFilterSetIndex: 0,
    selectedGraphIndex: 0,
    count: 5000,

    showHistory: true,

    title: 'March 10 2023 4:35p Exploration',
    filtersets: [
      // {
      //   title: undefined,
      //   source: selectedDataset.label,
      //   filters: [],
      //   graphs: [
      //     {
      //       title: undefined,
      //       description: undefined,
      //       type: 'map'
      //     }
      //   ]
      // },
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
  const initFilters = useCallback((selectedLabel) => {
    updateE(draft => {
      const filterset = {
        source: selectedLabel,
        filters: [],
        graphs: [
          {
            title: undefined,
            description: undefined,
            type: 'map'
          }
        ]        
      };
      draft.filtersets.push(filterset);
      draft.selectedFilterSetIndex = draft.filtersets.length-1; // select it
    });
  }, [updateE]);

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
    applyFilters(fullDataset, newFilters);
  }, [updateE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  const applyFilters = useCallback((allData, filters) => {
    console.log('applyFIlter caleld fullDataset is', allData)
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
              if (f.eq !== undefined && !String(d[f.field]).includes(String(f.eq))) passed=false;
              if (f.min !== undefined && d[f.field] <= f.min) passed=false;
              if (f.max !== undefined && d[f.field] >= f.max) passed=false;
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
      applyFilters(fullDataset, newFilters);
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
      newGraph.title = newGraph.title ? newGraph.title + " copy" : "untitled";
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
      selectedGraph.title = selectedGraph.title ? `${selectedGraph.title} ${type}` : type;
      selectedGraph.description = selectedGraph.description ? `${selectedGraph.description} ${type}` : type;
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


  const handleNotImplemented = () => {
    alert('Not implemented!');
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  let VIEW;

  switch (layout) {
    case ROUND4:
      VIEW = (<ExploreRound4
        e={e}
        tableData={tableData}
        handleTitleUpdate={handleTitleUpdate}
        handleFilterTitle={handleFilterTitle}
        handleFilterSource={handleFilterSource}
        handleAddFilter={handleAddFilter}
        handleShowHistory={handleShowHistory}
        handleShowSaved={handleShowSaved}
        handleGraphSelect={handleGraphSelect}
        handleAddGraph={handleAddGraph}
        handleGraphTitle={handleGraphTitle}
        handleGraphDescription={handleGraphDescription}
        handleGraphTypeSelect={handleGraphTypeSelect}
        handleGraphSave={handleGraphSave}
        handleGraphDelete={handleGraphDelete}
        handleNotImplemented={handleNotImplemented}
      />);
      break;
    case FILTERHISTORY:
      VIEW = (<ExploreFilterHistory
        e={e}
        tableData={tableData}
        handleTitleUpdate={handleTitleUpdate}
        handleFilterTitle={handleFilterTitle}
        handleFilterSource={handleFilterSource}
        handleAddFilter={handleAddFilter}
        handleShowHistory={handleShowHistory}
        handleShowSaved={handleShowSaved}
        handleGraphSelect={handleGraphSelect}
        handleAddGraph={handleAddGraph}
        handleGraphTitle={handleGraphTitle}
        handleGraphDescription={handleGraphDescription}
        handleGraphTypeSelect={handleGraphTypeSelect}
        handleGraphSave={handleGraphSave}
        handleGraphDelete={handleGraphDelete}
        handleNotImplemented={handleNotImplemented}
      />);
      break;
    case MAPHISTORY:
      VIEW = (<ExploreMapHistory
        e={e}
        tableData={tableData}
        handleTitleUpdate={handleTitleUpdate}
        handleFilterTitle={handleFilterTitle}
        handleFilterSource={handleFilterSource}
        handleAddFilter={handleAddFilter}
        handleShowHistory={handleShowHistory}
        handleShowSaved={handleShowSaved}
        handleGraphSelect={handleGraphSelect}
        handleAddGraph={handleAddGraph}
        handleGraphTitle={handleGraphTitle}
        handleGraphDescription={handleGraphDescription}
        handleGraphTypeSelect={handleGraphTypeSelect}
        handleGraphSave={handleGraphSave}
        handleGraphDelete={handleGraphDelete}
        handleNotImplemented={handleNotImplemented}
      />);
      break;
    case MAPTABLE:
      VIEW = (<ExploreMapTable
        e={e}
        tableData={tableData}
        handleTitleUpdate={handleTitleUpdate}
        handleFilterTitle={handleFilterTitle}
        handleFilterSource={handleFilterSource}
        handleAddFilter={handleAddFilter}
        handleShowHistory={handleShowHistory}
        handleShowSaved={handleShowSaved}
        handleGraphSelect={handleGraphSelect}
        handleAddGraph={handleAddGraph}
        handleGraphTitle={handleGraphTitle}
        handleGraphDescription={handleGraphDescription}
        handleGraphTypeSelect={handleGraphTypeSelect}
        handleGraphSave={handleGraphSave}
        handleGraphDelete={handleGraphDelete}
        handleNotImplemented={handleNotImplemented}
      />);
      break;
    default:
      VIEW = (<div>
        <div>
          1. Select a dataset:
          <select style={{color:'#000'}} onChange={handleDatasetSelect}>
            {DATASETS.map((d,i) =>
              <option value={i}>{d.label}</option>
            )}
          </select>
        </div>
        <div>
          2. Select a view:
          <ul>
            <li><button onClick={()=>handleSetLayout(ROUND4)}>{ROUND4}</button> -- "Filter" and "History" side by side -- needs screen > 700px tall</li>
            <li><button onClick={()=>handleSetLayout(FILTERHISTORY)}>{FILTERHISTORY}</button> -- "History" below "Filter", no map in Table -- needs screen > 700px tall</li>
            <li><button onClick={()=>handleSetLayout(MAPHISTORY)}>{MAPHISTORY}</button> -- "Context Map" below "Filter", "History" full height</li>
            <li><button onClick={()=>handleSetLayout(MAPTABLE)}>{MAPTABLE}</button></li>
          </ul>
        </div>
        Hit "Reload" to select a different dataset or layout.
      </div>);
      break;
  }


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  return (<>{VIEW}</>);
}
