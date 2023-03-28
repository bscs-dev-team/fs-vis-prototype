import './Exploration.css';

export default function ExplorationTitle({title, handleTitleUpdate}) {
  return (
    <div className="ExplorationTitle">
      <label>EXPLORATION</label>
      <input value={title} onChange={handleTitleUpdate} />
    </div>
  );
}
