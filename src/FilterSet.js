import { useState } from 'react';
import './Exploration.css';
import FilterEditor from './FilterEditor';

export default function FilterSet({data, filters, handleFilterTitle, handleFilterSource, handleAddFilter}) {

  const [editorIsOpen, setEditorIsOpen] = useState(false);

  function handleAddFilterClick() {
    setEditorIsOpen(true);
  }

  function handleFilterAdded(text) {
    setEditorIsOpen(false);
    const title = data.title !== undefined ? data.title + ', ' + text : text;
    handleAddFilter(text, title);
  }

  function handleClose() { setEditorIsOpen(false); }

  return (
    <div className="FilterSet">
        <div style={{ display: "grid", gridTemplateColumns: "120px 2fr"}}>
            <label><b>FILTER SET</b></label>
            <input value={data.title !== undefined ? data.title : 'No Filters'} onChange={handleFilterTitle} />
            <label>SOURCE</label>
            <input value={data.source} onChange={handleFilterSource} />
            <label></label>
            <hr/>
            <label>FILTERS</label>
            {data.filters.length > 0 
              ? data.filters.map((d, i) => <>
                  {i > 0 && <div></div>}
                  <div className="filter" key={i}>{d}</div>
              </>)
              : <div></div>
            }
            <label></label>
            <button className="primary" onClick={handleAddFilterClick} style={{ marginTop: '10px'}}>+ FILTER</button>
        </div>
        {editorIsOpen && <FilterEditor data={data} filters={filters} 
          handleAddFilter={handleFilterAdded} 
          handleClose={handleClose}/>}
    </div>
  );
}
