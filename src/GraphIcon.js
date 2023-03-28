import './Exploration.css';
import histogram from './img/vis-widget-card-histogram.png';
import numeric from './img/vis-widget-card-numeric.png';
import scatterplot from './img/vis-widget-card-scatterplot.png';
import timeseries from './img/vis-widget-card-timeseries.png';
import rangeplot from './img/vis-widget-card-range-plot.png';
import map from './img/vis-widget-card-map.png';

/**
 * A generic GraphIcon display that shows a square image of a map, or graph based on type
 * @param {*} param0 
 * @returns 
 */
export default function GraphIcon({type, size, selected, saved, handleClick}) {

  let imgurl;
  switch (type) {
    case 'histogram':
      imgurl = histogram;
      break;
    case 'numeric':
      imgurl = numeric;
      break;
    case 'scatterplot':
      imgurl = scatterplot;
      break;
    case 'timeseries':
      imgurl = timeseries;
      break;
    case 'whisker':
      imgurl = rangeplot; 
      break;
    default:
    case 'map':
      imgurl = map;
      break;
  }

  const sizeClass = size ? size : '';
  const selectedClass = selected ? 'selected' : '';
  const notsavedClass = !saved ? 'notsaved' : '';
  const css = ['GraphIcon', sizeClass, selectedClass, notsavedClass].join(' ');

  return (
    <div className={css} onClick={handleClick}>
      {saved && <span className="saved">&#x2713;</span>}
      {/* <img src={`static/${imgurl}`} alt={type}/> */}
      <img src={imgurl} alt={type}/>
    </div>
  );
}
