import React, { useState } from "react";
import './Exploration.css';
import DataTable from './DataTable';
import Help, { showhelpStyle } from './Help';

export default function MapTable({tableData}) {

  const [showhelp, setShowhelp] = useState(false);  
  const helptext = `This table shows all of the observations that have been collected.  Use Filters (left) to filter out unwanted data.  Hover over a heading or table cell to see its values.`

  return (
    <div>
      <Help helptext={helptext} left="30px" showhelp={showhelp}/>
      <div className="MapTable" style={{ display: 'flex', flexDirection: 'column', ...showhelpStyle}} onMouseEnter={()=>setShowhelp(true)} onMouseLeave={()=>setShowhelp(false)}>
        <div style={{ display: "flex" }}>
          <div className="stats" style={{ flexGrow: 1 }}>
            { tableData.count > 0
              ? <>Observations Found: {tableData.count}</>
              : <>Loading data...</>
            }
          </div>
          {/* <button>Table/Map</button> */}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "100%", height: "100%", overflow: "hidden"}}>
            <DataTable tableData={tableData} />
        </div>
      </div>
    </div>
  );
}
