import React, { useState, useEffect } from "react";
import "./lightbox.scss";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
function LightBoxHandlerComponent(props) {
  // Pictures array
  const [gallery, setGallery] = useState([]);

  // States/parameters for Lightbox library - yet-another-react-lightbox

  const [open, setOpen] = useState(false);

  const thumbnailsRef = React.useRef(null);

  const [currIndex, setIndex] = useState(null);
  const getData = () => {
    fetch(props.boxContent)
      .then((res) => res.json())
      .then((out) => {
        setGallery(out.images);
        // Push main picture to the array
        setGallery((current) => [out.main, ...current]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const thumbHandler = (item, index) => {
    setIndex(index);
    replaceImg.src = item;
  };

  let thumbnailContainer = document.querySelector(".thumbnail-carousel");

  let replaceImg = document.getElementById("main-pic");

  return (
    <div className="lightbox-container">
      <div className="main-wrapper">
        <img
          id="main-pic"
          className={props.mainPictureStyle}
          src={gallery[0]}
          onClick={() => setOpen(true)}
          alt="main-pic"
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
          slides={gallery?.map((item, index) => ({ src: item }))}
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
            {gallery?.map((item, index) => (
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
