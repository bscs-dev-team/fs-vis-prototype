import './Exploration.css';

export default function ExplorationTitle({title, handleTitleUpdate}) {
  return (
    <div className="ExplorationTitle">
      <label>EXPLORE</label>
      <input value={title} onChange={handleTitleUpdate} />
    </div>
  );
}
