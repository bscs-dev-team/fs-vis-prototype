import { useState } from 'react';
import './Exploration.css';

export default function FilterEditor({data, filters, handleAddFilter, handleClose}) {

  //const options = ['pH', 'Nitrate', 'Nitrite', 'Hardness', 'Chlorine', 'Alkalinity'];
  const options = filters;

  const [parameter, setParameter] = useState('');
  const [eqval, setEqval] = useState();
  const [minval, setMinval] = useState();
  const [maxval, setMaxval] = useState();

  function handleSelect(e) {
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
    const filter = {
      title: s,
      field: parameter,
      eq: eqval,
      min: minval,
      max: maxval
    }
    handleAddFilter(filter);
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
            <label>Equals</label>
            <input value={data.eq} onChange={e => setEqval(e.target.value)} />
            <label>Minimum</label>
            <input value={data.min} onChange={e => setMinval(e.target.value)} />
            <label>Maximum</label>
            <input value={data.max} onChange={e => setMaxval(e.target.value)} />
            <p></p><p></p>
            <button onClick={handleClose}>CANCEL</button>
            <button className="primary" onClick={()=>handleSave()}>SAVE</button>
        </div>
    </div>
  );
}
