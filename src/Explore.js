import React, { useState, useEffect, useCallback } from "react";
import { useImmer } from "use-immer";

import './Explore.css';
import ExplorationTitle from './ExplorationTitle';
import History from './History';
import FilterSet from './FilterSet';
import MapTable from './MapTable';
import GraphArea from './GraphArea';

const csv2json = require('csvtojson');
import csvFileUrl from 'url:./data/frogs.csv';

// CSV DATA LOADING
let alreadyLoaded = false;
const fieldsToShow = [
  "Observation Date",
  "Start Time",
  "End Time",
  "Species",
  "Call Intensity",
  "Air Temperature",
  "Characterize Land Use",
  "Observation Notes"
]


export default function Explore() {
  // CSV
  const [tableData, setTableData] = useState({});
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
            // setHeaders( Object.keys(json[0]).filter( h => fieldsToShow.includes(h) ) );
            setHeaders( fieldsToShow );
            setData( () => {
              const fieldData = json.map(row => {
                const items = [];
                fieldsToShow.forEach(k => items.push(row[k]));
                return items;
              });
              console.log('fieldData', fieldData)
              return fieldData;
            });
          });
      });
  }
  // -- Init Load
  useEffect(() => {
    console.error('useEffect!', alreadyLoaded)
    loadCSV();
    setTableData({
      count: data.length,
      data: data,
      headers: headers
    })
    return
  }, [data, headers]);


  // Exploration Data
  const [ e, setE ] = useImmer({
    selectedFilterSetIndex: 0,
    selectedGraphIndex: 0,
    count: 5000,

    showHistory: true,

    title: 'March 10 2023 4:35p Exploration',
    filtersets: [
      {
        title: undefined,
        source: 'Water Insights',
        filters: [],
        graphs: [
          {
            title: 'No filter',
            description: 'Default graph',
            type: 'map'
          }
        ]
      },
      // {
      //   title: 'Chlorine > 1',
      //   source: 'Water Insights',
      //   filters: [
      //     "Chlorine > 0.1ppm"
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


  const handleTitleUpdate = useCallback(event => {
    setE(draft => draft.title = event.target.value);
  }, [setE]);


  const handleAddFilter = useCallback((filterLabel, filterTitle) => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];

      // Clone filterset
      const newFilterset = Object.assign({}, filterset);
      newFilterset.title = filterTitle;

      // Clone only the currently selected graph
      const selectedGraph = Object.assign({}, filterset.graphs[e.selectedGraphIndex]);
      selectedGraph.saved = undefined;
      newFilterset.graphs = [selectedGraph];
      draft.selectedGraphIndex = 0;

      // Clone Filter
      const newFilters = [...filterset.filters]; // clone
      newFilters.push(filterLabel);
      newFilterset.filters = newFilters;

      draft.filtersets.push(newFilterset);
      draft.selectedFilterSetIndex = draft.filtersets.length-1; // select it
    });
  }, [setE, e.selectedFilterSetIndex, e.selectedGraphIndex]);


  const handleShowHistory = useCallback(() => {
    setE(draft => {draft.showHistory = true});
  }, [setE]);
  const handleShowSaved = useCallback(() => {
    setE(draft => {draft.showHistory = false});
  }, [setE]);

  const handleGraphSelect = useCallback((filterIndex, graphIndex) => {
    setE(draft => {
      draft.selectedFilterSetIndex = filterIndex;
      draft.selectedGraphIndex = graphIndex;
    })
  }, [setE]);


  const handleAddGraph = useCallback(() => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      const newGraph = Object.assign({},selectedGraph);
      newGraph.title = newGraph.title + " copy";
      newGraph.saved = undefined;
      filterset.graphs.push(newGraph);
      draft.selectedGraphIndex = filterset.graphs.length - 1; // select it
    })
  }, [setE, e.selectedFilterSetIndex, e.selectedGraphIndex]);


  const handleFilterTitle = useCallback(event => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      filterset.title = event.target.value;
    });
  }, [setE, e.selectedFilterSetIndex]);
  const handleFilterSource = useCallback(event => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      filterset.source = event.target.value;
    });
  }, [setE, e.selectedFilterSetIndex]);


  const handleGraphTitle = useCallback(event => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.title = event.target.value;
    });
  }, [setE, e.selectedFilterSetIndex, e.selectedGraphIndex]);
  const handleGraphDescription = useCallback(event => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.description = event.target.value;
    });
  }, [setE, e.selectedFilterSetIndex, e.selectedGraphIndex]);
  const handleGraphTypeSelect = useCallback(type => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.type = type;
      selectedGraph.description += ` ${type}`;
    });
  }, [setE, e.selectedFilterSetIndex, e.selectedGraphIndex]);
  const handleGraphSave = useCallback(event => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      const selectedGraph = filterset.graphs[e.selectedGraphIndex];
      selectedGraph.saved = true;
    });
  }, [setE, e.selectedFilterSetIndex, e.selectedGraphIndex]);
  const handleGraphDelete = useCallback(event => {
    setE(draft => {
      const filterset = draft.filtersets[e.selectedFilterSetIndex];
      filterset.graphs.splice(e.selectedGraphIndex);
      draft.selectedGraphIndex = filterset.graphs.length > 0
        ? draft.selectedGraphIndex - 1
        : -1;
    });
  }, [setE, e.selectedFilterSetIndex, e.selectedGraphIndex]);

  return (
    <div className="Explore" style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'column', maxHeight: '25%', padding: "10px"}}>
        <ExplorationTitle title={e.title} handleTitleUpdate={handleTitleUpdate} />
        <div style={{display: "grid", gridTemplateColumns: '1fr 1fr', columnGap: '10px', height: '90%' }}>
          <FilterSet data={e.filtersets[e.selectedFilterSetIndex]} 
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
