import React, { useState, useEffect, useRef } from "react";
import "./lightbox.scss";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

function LightBoxHandlerComponent(props) {
  // States/parameters for on-page gallery and Lightbox library - yet-another-react-lightbox

  const [scrollStep, setScrollStep] = useState(0);

  const [open, setOpen] = useState(false);

  const [currIndex, setIndex] = useState(null);

  // ************States/Triggers section**************
  const [loaded, setLoaded] = useState(false);

  const [leftDisabled, setLeftDisabled] = useState(true);

  const [rightDisabled, setRightDisabled] = useState(false);
  // ************End of States/Triggers section**************

  // ************Hooks/References to DOM elements**************
  const mainPicRef = useRef(null);

  const prevButtonRef = useRef(null);

  const nextButtonRef = useRef(null);

  const galleryThumbnailsRef = useRef(null);

  const thumbnailsRef = React.useRef(null);
  // ************End of Hooks/References to DOM elements**************

  useEffect(() => {
    scrollStepFunction();
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // ************Functions**************

  const disableLeftButton = () => {
    setLeftDisabled(true);
    prevButtonRef.current.classList.add("btn-disabled");
  };

  const scrollStepFunction = () => {
    if (loaded) {
      const imagesNode = galleryThumbnailsRef.current;

      const thumbnail = imagesNode.querySelectorAll("img");
      setScrollStep(
        thumbnail[thumbnail.length - 1].clientWidth +
          parseInt(
            window
              .getComputedStyle(thumbnail[thumbnail.length - 1])
              .marginLeft.substring(0, 2)
          ) +
          parseInt(
            window
              .getComputedStyle(thumbnail[thumbnail.length - 1])
              .marginRight.substring(0, 2)
          )
      );
    }
  };

  const enableLeftButton = () => {
    setLeftDisabled(false);
    prevButtonRef.current.classList.remove("btn-disabled");
  };

  const disableRightButton = () => {
    setRightDisabled(true);
    nextButtonRef.current.classList.add("btn-disabled");
  };

  const enableRightButton = () => {
    setRightDisabled(false);
    nextButtonRef.current.classList.remove("btn-disabled");
  };

  const scrollLeft = () => {
    galleryThumbnailsRef.current.scrollLeft -= scrollStep;

    if (rightDisabled) {
      enableRightButton();
    }
    if (galleryThumbnailsRef.current.scrollLeft <= scrollStep) {
      disableLeftButton();

      setTimeout(() => {
        galleryThumbnailsRef.current.scrollLeft -= scrollStep;
      }, 0);
    }
  };

  const scrollRight = () => {
    galleryThumbnailsRef.current.scrollLeft += scrollStep;
    if (leftDisabled) {
      enableLeftButton();
    }
    if (
      galleryThumbnailsRef.current.scrollLeft +
        galleryThumbnailsRef.current.offsetWidth >=
      galleryThumbnailsRef.current.scrollWidth - scrollStep
    ) {
      disableRightButton();
      setTimeout(() => {
        galleryThumbnailsRef.current.scrollLeft += scrollStep;
      }, 0);
    }
  };

  const hideButtons = () => {
    if (loaded) {
      nextButtonRef.current.classList.add("btn-hidden");
      prevButtonRef.current.classList.add("btn-hidden");
    }
  };

  const thumbnailsHandler = (index) => {
    setIndex(index);
    const thumbnailsNode = galleryThumbnailsRef.current;

    const mainPicNode = mainPicRef.current;

    const mainImg = mainPicNode.querySelectorAll("img")[0];

    const currentThumbnail = thumbnailsNode.querySelectorAll("img")[index];

    currentThumbnail.classList.add("active-pic");

    mainImg.src = currentThumbnail.src;

    for (let i = 0; i < props.content.length; i++) {
      let removeActive = thumbnailsNode.querySelectorAll("img")[i];
      if (i !== index) {
        removeActive.classList.remove("active-pic");
      }
    }
    currentThumbnail.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    if (thumbnailsNode.clientWidth < scrollStep * 3 * index || index > 1) {
      enableLeftButton();
    } else {
      disableLeftButton();
    }

    // Compensation set to 20 as below, as it impacts {only} one window size. Equal value is 11 (1 px + no margin [10px] from right side in the last thumbnail), but gave some additional px.
    if (
      scrollStep * (index - 1) + 20 >=
        thumbnailsNode.scrollWidth - thumbnailsNode.clientWidth ||
      index === props.content.length - 1
    ) {
      disableRightButton();
    } else {
      enableRightButton();
    }
  };

  const setCompleteLoadState = () => {
    setTimeout(() => {
      props.onLoadingChange(false);
      setLoaded(true);
    }, 800);
  };

  return (
    // <div className={loaded ? "lightbox-container" : "hide-lightbox-container"}>
    <div className="lightbox-container">
      <div className="main-wrapper" ref={mainPicRef}>
        <img
          id="main-pic"
          className={props.mainPictureStyle}
          src={props.content[0]}
          onClick={() => setOpen(true)}
          alt="main-pic"
        />
      </div>

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

      <div className="thumbnail-wrapper">
        <div className="thumbnail-carousel" ref={galleryThumbnailsRef}>
          <div className="previous-btn ">
            <button
              id="prevBtn"
              className="btn-disabled"
              onClick={() => {
                scrollLeft();
              }}
              disabled={leftDisabled}
              ref={prevButtonRef}
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
              ref={nextButtonRef}
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
                onClick={() => thumbnailsHandler(index)}
                onLoad={() =>
                  index === props.content.length - 1
                    ? setCompleteLoadState()
                    : undefined
                }
                //Workaround for Firefox - was firing useEffect before it could get thumbnail element, Chrome/Edge was fine
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
