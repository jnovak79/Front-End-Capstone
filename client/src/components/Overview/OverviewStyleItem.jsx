import react,  {useState, useEffect, useRef, useLayoutEffect,  useContext}from 'react';
import OverviewCheckMark from './../icons/OverviewCheckMark.jsx'
import {InteractionAPIContext} from './../InteractionAPI.jsx';
export default function({style, currentStyle, setCurrentStyle}){
  const interactionAPI = useContext(InteractionAPIContext);
  const styleRef = useRef();
  const checkRef = useRef();

  useEffect(()=> {
    if(checkRef.current !== undefined){
      if (style.style_id === currentStyle.style_id) {
        checkRef.current.style.visibility = 'visible';
      } else {
        checkRef.current.style.visibility = 'hidden';
      }
    }
  },[checkRef, currentStyle, style]);

  const styleOnClick = (e) => {
    interactionAPI('overview style thumbnail', 'overview')
    if (style.style_id !== currentStyle.style_id) {
      setCurrentStyle(style);
    }
  }

  return(
    <div className="overviewStyleDiv" onClick={styleOnClick}ref={styleRef}>
      <div className="overViewCheckMarkDiv" ref={checkRef}>
          <OverviewCheckMark />
        </div>
      <div className="overviewStyleThumbnailsDiv  hoverPointer">
        <img className="overviewStyleThumbnails" src={style.photos[0].thumbnail_url}></img>
      </div>
    </div>
  )
}