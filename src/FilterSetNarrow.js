import { useState } from 'react';
import './Exploration.css';
import FilterEditor from './FilterEditor';
import Help, { HelpFader, showhelpStyle } from './Help';

export default function FilterSet({data, filters, handleFilterTitle, handleFilterSource, handleAddFilter}) {

  const [editorIsOpen, setEditorIsOpen] = useState(false);

  function handleAddFilterClick() {
    setEditorIsOpen(true);
  }

  function handleFilterAdded(filter) {
    setEditorIsOpen(false);
    const title = data.title !== undefined ? data.title + ', ' + filter.title : filter.title;
    handleAddFilter(filter);
  }

  function handleClose() { setEditorIsOpen(false); }

  const [showhelp, setShowhelp] = useState(false);  
  const helptext = `Filters allow you to "search" the data for specific criteria.
      Add filters to show only data that match the criteria. 
      e.g. a filter for "Temperature" with a "MinimuM" of 32 will show only observations
      that have a "Temperature" above 32.  The "Equals" criteria can be used to match substrings.
      The matches are case sensitive, so "Equals Spring" will match "Spring Peeper" but not "spring peeper".`

  return (
    <>
      {editorIsOpen && <FilterEditor data={data} filters={filters} 
        handleAddFilter={handleFilterAdded} 
        handleClose={handleClose}/>}
      <Help helptext={helptext} left="350px" showhelp={showhelp}/>
      <div className="FilterSet" style={showhelp ? showhelpStyle : {}} onMouseEnter={()=>setShowhelp(true)} onMouseLeave={()=>setShowhelp(false)}>
          <div style={{ display: "flex", flexDirection: 'column', padding: '3px'}}>
            <input value={data.title !== undefined ? data.title : 'No Filters'} onChange={handleFilterTitle} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "80px 2fr"}}>
            <label>SOURCE</label>
            <select>
              <option selected value={data.source} onChange={handleFilterSource}>{data.source}</option>
            </select>
            <label>FILTERS</label>
            {data.filters.length > 0 
              ? data.filters.map((d, i) => <>
                  {i > 0 && <div></div>}
                  <div className="filter" key={i}>{d.title}</div>
              </>)
              : <div></div>
            }
            <label></label>
            <button className="primary small" onClick={handleAddFilterClick} style={{ marginTop: '3px'}}>+ FILTER</button>
        </div>
      </div>
    </>
  );
}
