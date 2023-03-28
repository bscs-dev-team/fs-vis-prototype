import { useState } from 'react';
import './Exploration.css';

export default function FilterEditor({data, handleAddFilter}) {

  const options = ['pH', 'Nitrate', 'Nitrite', 'Hardness', 'Chlorine', 'Alkalinity'];

  const [parameter, setParameter] = useState('');
  const [minval, setMinval] = useState();
  const [maxval, setMaxval] = useState();

  function handleSelect(e) {
    console.log('selected', e);
    setParameter(e.target.value);
  }
  function handleSave() {
    let s = '';
    if (minval !== undefined && maxval !==undefined) {
      s += minval + ' < ';
      s += parameter;
      s += ' < ' + maxval;
    } else {
      s += parameter;
      s += minval !== undefined ? ` > ${minval}` : '';
      s += maxval !== undefined ? ` < ${maxval}` : '';
    }
    handleAddFilter(s);
  }

  return (
    <div className="FilterEditor dialog">
        <label><b>ADD FILTER</b></label>
        <p></p>
        <div style={{ display: "grid", gridTemplateColumns: "120px 2fr"}}>
            <label>Parameter</label>
            <select onChange={handleSelect}>
              <option value="">--Select a parameter--</option>
              {options.map(o => <option value={o}>{o}</option>)}
            </select>
            <label>Minimum</label>
            <input value={data.min} onChange={e => setMinval(e.target.value)} />
            <label>Maximum</label>
            <input value={data.max} onChange={e => setMaxval(e.target.value)} />
            <p></p><p></p>
            <label></label>
            <button className="primary" onClick={()=>handleSave()}>SAVE</button>
        </div>
    </div>
  );
}
