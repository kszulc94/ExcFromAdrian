import React, { useState } from "react";
import "./lightbox.scss";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

function LightBoxHandlerComponent(props) {
  let scrollStep = 140; //Defined thumbnail width + padding

  // States/parameters for Lightbox library - yet-another-react-lightbox
  const [open, setOpen] = useState(false);

  const thumbnailsRef = React.useRef(null);

  const [currIndex, setIndex] = useState(null);

  // ************States/Triggers section**************
  const [loaded, setLoaded] = useState(false);

  const [leftDisabled, setLeftDisabled] = useState(true);

  const [rightDisabled, setRightDisabled] = useState(false);
  // ************End of States/Triggers section**************

  // ************Hooks to DOM elements**************
  const thumbnailContainer = document.querySelector(".thumbnail-carousel");

  const prevButton = document.getElementById("prevBtn");

  const nextButton = document.getElementById("nextBtn");

  const replaceImg = document.getElementById("main-pic");
  // ************End of Hooks to DOM elements**************

  // ************Functions**************
  const disableLeftButton = () => {
    setLeftDisabled(true);
    prevButton.classList.add("btn-disabled");
  };

  const enableLeftButton = () => {
    setLeftDisabled(false);
    prevButton.classList.remove("btn-disabled");
  };

  const disableRightButton = () => {
    setRightDisabled(true);
    nextButton.classList.add("btn-disabled");
  };

  const enableRightButton = () => {
    setRightDisabled(false);
    nextButton.classList.remove("btn-disabled");
  };

  const scrollLeft = () => {
    thumbnailContainer.scrollLeft -= scrollStep;

    if (rightDisabled) {
      enableRightButton();
    }
    if (thumbnailContainer.scrollLeft <= scrollStep) {
      disableLeftButton();

      setTimeout(() => {
        thumbnailContainer.scrollLeft -= scrollStep;
      }, 0);
    }
  };

  const scrollRight = () => {
    thumbnailContainer.scrollLeft += scrollStep;
    if (leftDisabled) {
      enableLeftButton();
    }
    if (
      thumbnailContainer.scrollLeft + thumbnailContainer.offsetWidth >=
      thumbnailContainer.scrollWidth - scrollStep
    ) {
      disableRightButton();
      setTimeout(() => {
        thumbnailContainer.scrollLeft += scrollStep;
      }, 0);
    }
  };

  const hideButtons = () => {
    nextButton?.classList.add("btn-hidden");
    prevButton?.classList.add("btn-hidden");
  };

  const thumbHandler = (item, index) => {
    setIndex(index);
    replaceImg.src = item;

    for (let i = 0; i < props.content.length; i++) {
      let currentImage = document.getElementById("thumbnail" + index);

      currentImage.classList.add("active-pic");

      if (i !== index) {
        document.getElementById("thumbnail" + i).classList.remove("active-pic");
      }
    }

    thumbnailContainer.scrollLeft = scrollStep * (index - 1);

    if (index > 1) {
      enableLeftButton();
    }

    if (index <= 1) {
      disableLeftButton();
    }

    if (index === props.content.length - 1) {
      disableRightButton();
    } else if (
      thumbnailContainer.scrollLeft + thumbnailContainer.offsetWidth <=
      thumbnailContainer.scrollWidth
    ) {
      enableRightButton();
    }
  };

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
              className="btn-disabled"
              onClick={() => {
                scrollLeft();
              }}
              disabled={leftDisabled}
            >
              <div className="arrow-left"></div>
            </button>
          </div>
          <div className="next-btn">
            <button
              id="nextBtn"
              onClick={() => {
                scrollRight();
              }}
              disabled={rightDisabled}
            >
              <div className="arrow-right"></div>
            </button>
            {props.content.length > 3 ? undefined : hideButtons()}
          </div>
          <div className="thumbnails-content">
            {props.content?.map((item, index) => (
              <img
                id={"thumbnail" + index}
                className={
                  index === 0
                    ? props.thumbnailStyle + " active-pic"
                    : props.thumbnailStyle
                }
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
