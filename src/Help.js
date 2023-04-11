/* To Use

    1. Import Help 
        import Help, { HelpFader, showhelpStyle } from './Help';
    
    2. Set up local `showhelp` state
        const [showhelp, setShowhelp] = useState(false);

    3. Insert help at top of component
        <Help helptext={helptext} showhelp={showhelp}/>

    4. Add showhelpStyle and hover to to component
         <div className="FilterSet" style={showhelp ? showhelpStyle : {}} onMouseEnter={()=>setShowhelp(true)} onMouseLeave={()=>setShowhelp(false)}>
    
    5. Insert fader below compoennt
        <HelpFader  showhelp={showhelp}/>

*/

export default function Help({helptext, showhelp, left, right}) {
    const posleft = left ? left : '';
    const posright = right ? right : '';
if (showhelp) return (
        <div style={{ zIndex: 100, color: '#333', backgroundColor: '#ff8', position: 'absolute', width: '300px', left: left, right: right, padding: '10px', textAlign: 'left' }}>
          {helptext}
        </div>
    )
    return;
}

export function HelpFader({showhelp}) {
    if (showhelp) return (<div style={{ zIndex: 1, position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: '#0005' }}>&nbsp;</div>);
    return;
}

export const showhelpStyle = { zIndex: 5, position: 'relative' };