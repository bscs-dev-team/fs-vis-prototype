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
      {editorIsOpen && <FilterEditor data={data} filters={filters} 
        handleAddFilter={handleFilterAdded} 
        handleClose={handleClose}/>}
    </div>
  );
}
