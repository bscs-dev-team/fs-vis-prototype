import { useState } from 'react';
import './Exploration.css';
import FilterEditor from './FilterEditor';

export default function FilterSet({data, handleFilterTitle, handleFilterSource, handleAddFilter}) {

  const [editorIsOpen, setEditorIsOpen] = useState(false);

  function handleAddFilterClick() {
    setEditorIsOpen(true);
  }

  function handleFilterAdded(text) {
    setEditorIsOpen(false);
    const title = data.title !== undefined ? data.title + ', ' + text : text;
    handleAddFilter(text, title);
  }

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
            {data.filters.map((d, i) => <>
                {i > 0 && <div></div>}
                <div className="filter">{d}</div>
            </>)}
            <label></label>
            <button className="primary" onClick={handleAddFilterClick} style={{ marginTop: '10px'}}>+ FILTER</button>
        </div>
        {editorIsOpen && <FilterEditor data={data} handleAddFilter={handleFilterAdded}/>}
    </div>
  );
}