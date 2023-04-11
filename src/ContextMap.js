import React, { useState } from "react";
import imgmapurl from './img/context-map.png';
import Help, { showhelpStyle } from './Help';

export default function ContextMap() {
    
    const [showhelp, setShowhelp] = useState(false);  
    const helptext = `This map shows the location of the observations in the table.`

    return (
        <div style={{width: '100%', textAlign: 'center'}}>
            <Help helptext={helptext} left="350px" showhelp={showhelp}/>
            <img src={imgmapurl} alt="Context Map" style={{maxHeight: '100px'}} onMouseEnter={()=>setShowhelp(true)} onMouseLeave={()=>setShowhelp(false)}/>
        </div>
    );
  }
  