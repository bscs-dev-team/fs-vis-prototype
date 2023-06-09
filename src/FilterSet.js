import { useState } from 'react';
import './Exploration.css';
import FilterEditor from './FilterEditor';

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

  return (
    <div className="FilterSet">
        <div style={{ display: "grid", gridTemplateColumns: "90px 2fr"}}>
          <label>Selection</label>
          <input value={data.title !== undefined ? data.title : 'No Filters'} onChange={handleFilterTitle} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "160px 2fr"}}>
          <label>SOURCE</label>
          <input value={data.source} onChange={handleFilterSource} />
          <label></label>
          <hr/>
          <label>FILTERS</label>
          {data.filters.length > 0 
            ? data.filters.map((d, i) => <>
                {i > 0 && <div></div>}
                <div className="filter" key={i}>{d.title}</div>
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
