import { useState } from 'react';
import Explore from './Explore3';


export default function Home() {
  const [count, setSCount] = useState(0);
  const [exploreIsActive, setExploreIsActive] = useState(true);
  
  function showExplore() {
    setExploreIsActive(!exploreIsActive);
  }

  return (
    <div className="Home">
      {!exploreIsActive 
      ? <> 
          FieldScope
          <button onClick={() => setSCount(count + 1)}>+ Data {count}</button>
          <button onClick={showExplore}>+ Exploration</button>
        </>
      : <Explore />}
    </div>
  );
}

