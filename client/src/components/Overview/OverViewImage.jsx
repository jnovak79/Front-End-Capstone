import react,  {useState, useEffect, useRef}from 'react';
import {ChevronRightArrow, ChevronLeftArrow, ChevronUpArrow, ChevronDownArrow} from './../icons/OverviewArrowsSVG.jsx';
import OverviewImageThumbnails from './OverviewImageThumbnails.jsx';
import OverviewImages from './OverviewImages.jsx';
import OverviewExpandSVG from './../icons/OverviewExpandSVG.jsx'
export default function OverViewImage({currentStyle}){

  const [currentImage, setCurrentImage] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productImageThumbnails, setProductImageThumbnails] = useState([]);
  const productImageThumbnailsDivRef = useRef();
  const productImageThumbnailsRef = useRef();
  const productImagesDivRef = useRef();
  const productImagesRef = useRef();
  const [imageIndex, setImageIndex] = useState(0);
  const [upButtonDisplay, setUpButtonDisplay] = useState({"display":"inherit"});
  const [downButtonDisplay, setDownButtonDisplay] = useState({"display":"inherit"});

  const [productImageThumbnailsYIndex, setProductImageThumbnailsYIndex] = useState(0);
    //0: both not display
    //1: only dislpay up
    //2: only display down
    //3: both display
  const [productImageThumbnailsButtonDisplay, setProductImageThumbnailsButtonDisplay] = useState(1);

  useEffect(()=> {

    if (productImageThumbnailsButtonDisplay === 0){
      setUpButtonDisplay({"display":"none"});
      setDownButtonDisplay({"display":"none"});
    } else if (productImageThumbnailsButtonDisplay === 1) {
      setUpButtonDisplay({"display":"none"});
      setDownButtonDisplay({"display":"inherit"});
    } else if (productImageThumbnailsButtonDisplay === 2) {
      setUpButtonDisplay({"display":"inherit"});
      setDownButtonDisplay({"display":"none"});
    } else {
      setUpButtonDisplay({"display":"inherit"});
      setDownButtonDisplay({"display":"inherit"});
    }

  }, [productImageThumbnailsButtonDisplay]);


  const upButtonOnClick =(e)=> {
      setProductImageThumbnailsYIndex(productImageThumbnailsYIndex+111);

  }

  const downButtonOnClick =(e)=> {
    setProductImageThumbnailsYIndex(productImageThumbnailsYIndex-111);

  }

  useEffect(()=> {

    if (productImageThumbnailsYIndex >= 0) {
      setProductImageThumbnailsButtonDisplay(1);
      setProductImageThumbnailsYIndex(0);

      productImageThumbnailsRef.current.style.transform = `translateY(${productImageThumbnailsYIndex}px)`

    } else if(productImageThumbnailsYIndex <= (productImageThumbnailsDivRef.current.offsetHeight - productImageThumbnailsRef.current.offsetHeight)){

      setProductImageThumbnailsYIndex((productImageThumbnailsDivRef.current.offsetHeight - productImageThumbnailsRef.current.offsetHeight ));
      setProductImageThumbnailsButtonDisplay(2);
      productImageThumbnailsRef.current.style.transform = `translateY(${productImageThumbnailsYIndex}px)`
    } else {

      setProductImageThumbnailsButtonDisplay(3);
      productImageThumbnailsRef.current.style.transform = `translateY(${productImageThumbnailsYIndex}px)`
    }


  }, [productImageThumbnailsYIndex])

  useEffect(()=> {

    if(currentStyle.style_id !== undefined){
      setProductImages([]);
      setProductImageThumbnails([]);
      currentStyle.photos.map(e => {
        setProductImages(productImages => [...productImages, e.url]);
      })
      currentStyle.photos.map(e => {
        setProductImageThumbnails(productImageThumbnails => [...productImageThumbnails, e.thumbnail_url]);
      })

      setCurrentImage(currentStyle.photos[0].url);

    }

  }, [currentStyle]);

  const [rightButtonDisplay, setRightButtonDisplay] = useState({"display":"inherit"});
  const [leftButtonDisplay, setLeftButtonDisplay] = useState({"display":"inherit"});


  const leftButtonOnClick = (e) => {
    if (imageIndex >=1) {
      setImageIndex(imageIndex-1);
    }
  }

  const rightButtonOnClick = (e) => {
    if (imageIndex < productImages.length -1) {
      setImageIndex(imageIndex+1);
    }
  }

  useEffect(()=>{

    if (imageIndex === 0) {
      setProductImagesButtonDisplay(2);
    } else if(imageIndex === productImages.length -1) {
      setProductImagesButtonDisplay(1);
    } else if(productImagesButtonDisplay !== 3){
      setProductImagesButtonDisplay(3);

    }
    let temp = -564 * imageIndex;
    productImagesRef.current.style.transform = `translateY(${temp}px)`



  },
[imageIndex])


  const [productImagesButtonDisplay, setProductImagesButtonDisplay] = useState(2);
  useEffect(()=>{
    if (productImagesButtonDisplay === 0){
      setLeftButtonDisplay({"display":"none"});
      setRightButtonDisplay({"display":"none"});
    } else if (productImagesButtonDisplay === 1) {
      setLeftButtonDisplay({"display":"inherit"});
      setRightButtonDisplay({"display":"none"});
    } else if (productImagesButtonDisplay === 2) {
      setLeftButtonDisplay({"display":"none"});
      setRightButtonDisplay({"display":"inherit"});
    } else {
      setLeftButtonDisplay({"display":"inherit"});
      setRightButtonDisplay({"display":"inherit"});
    }


  },[productImagesButtonDisplay])

  const expandOnClick = (e) => {
    setExpandViewDisplay({"display":"inline"})
  }
  const [expandViewDisplay, setExpandViewDisplay] =useState({"display":"none"});



  if(currentImage  !== undefined){
    return (<>
<div className="expandViewModal" style={expandViewDisplay}>
  <div>

  </div>
</div>
      <div className="currentImageThumbnailsCarouselDiv" ref={productImageThumbnailsDivRef}>

      <div className="overviewUpButtonDiv" onClick={upButtonOnClick} style={upButtonDisplay}><ChevronUpArrow/></div>

        <div className="currentImageThumbnailsCarousel" ref={productImageThumbnailsRef}>
          {productImageThumbnails.map((e,index) => {
            return (
              <OverviewImageThumbnails e={e} key={index} index={index} setImageIndex={setImageIndex}/>
            )
          })}
        </div>

        <div className="overviewDownButtonDiv" onClick={downButtonOnClick} style={downButtonDisplay}><ChevronDownArrow/></div>

      </div>

      <div className="currentImagesCarouselDiv" ref={productImagesDivRef}>
        <div className="expandViewIconDiv" onClick={expandOnClick} ><OverviewExpandSVG /></div>
        <div className="overviewLeftButtonDiv" onClick={leftButtonOnClick} style={leftButtonDisplay}><ChevronLeftArrow/></div>
        <div className="overviewRightButtonDiv" onClick={rightButtonOnClick} style={rightButtonDisplay}><ChevronRightArrow/></div>
        <div className="currentImagesCarousel" ref={productImagesRef}>

          {productImages.map((e, index) => {
              return (

                <OverviewImages e={e} key={index} index={index} setImageIndex={setImageIndex}/>
              )
            })}
        </div>

      </div>

    </>)
  }



  return (
    <progress></progress>
  )
}