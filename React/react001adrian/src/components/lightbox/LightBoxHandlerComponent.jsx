import React, { useState } from "react";
import "./lightbox.scss";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
function LightBoxHandlerComponent(props) {
  // States/parameters for Lightbox library - yet-another-react-lightbox

  const [open, setOpen] = useState(false);

  const thumbnailsRef = React.useRef(null);

  const [currIndex, setIndex] = useState(null);

  // Loaded states - show lightbox div / section only when main image finished loading
  const [loaded, setLoaded] = useState(false);

  const thumbHandler = (item, index) => {
    setIndex(index);
    replaceImg.src = item;
  };

  let thumbnailContainer = document.querySelector(".thumbnail-carousel");

  let replaceImg = document.getElementById("main-pic");

  return (
    <div className={loaded ? "lightbox-container" : "hide-lightbox-container"}>
      <div className="main-wrapper">
        <img
          id="main-pic"
          className={props.mainPictureStyle}
          src={props.content[0]}
          onClick={() => setOpen(true)}
          alt="main-pic"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <>
        <Lightbox
          plugins={[Thumbnails, Counter]}
          thumbnails={{ ref: thumbnailsRef, position: "bottom" }}
          counter={{ container: { style: { top: 0 } } }}
          open={open}
          index={currIndex}
          close={() => setOpen(false)}
          slides={props.content?.map((item, index) => ({ src: item }))}
          on={{
            click: () => {
              (thumbnailsRef.current?.visible
                ? thumbnailsRef.current?.hide
                : thumbnailsRef.current?.show)?.();
            },
          }}
        />
      </>

      <div className="thumbnail-wrapper">
        <div className="thumbnail-carousel">
          <div className="previous-btn ">
            <button
              id="prevBtn"
              onClick={() => {
                thumbnailContainer.scrollLeft -= 132;
              }}
            >
              <div className="arrow-left"></div>
            </button>
          </div>
          <div className="next-btn">
            <button
              id="nextBtn"
              onClick={() => {
                thumbnailContainer.scrollLeft += 132;
              }}
            >
              <div className="arrow-right"></div>
            </button>
          </div>
          <div className="thumbnails-content">
            {props.content?.map((item, index) => (
              <img
                id={"thumbnail" + index}
                className={props.thumbnailStyle}
                src={item}
                onClick={() => thumbHandler(item, index)}
                alt="THUMB"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LightBoxHandlerComponent;
