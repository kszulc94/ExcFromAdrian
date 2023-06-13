import React, { useState, useEffect } from "react";
import Modal from "./Modal.js";
import "./lightbox.scss";

function LightBoxHandlerComponent(props) {
  //   States for lightbox
  const [image, setImage] = useState(null);

  // Image index states
  const [currIndex, setIndex] = useState(null);

  //   Gallery array
  const [gallery, setGallery] = useState([]);

  const getData = () => {
    fetch(props.boxContent)
      .then((res) => res.json())
      .then((out) => {
        const tempGallery = [];
        tempGallery.push(out.main);
        for (let i = 0; i < out.images.length; i++) {
          tempGallery.push(out.images[i]);
        }
        setGallery(tempGallery);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handler = (item, index) => {
    setIndex(index);
    setImage(item);
  };

  const thumbHandler = (item, index) => {
    setIndex(index);
    replaceImg.src = item;
  };

  const nextPicture = () => {
    const galleryLength = gallery.length;
    if (currIndex + 1 >= galleryLength) {
      setIndex(0);
      const mainPicture = gallery[0];
      setImage(mainPicture);
      return;
    }

    const nextPictureIndex = currIndex + 1;
    const newPicture = gallery.filter((item) => {
      return gallery.indexOf(item) === nextPictureIndex;
    });
    const newItem = newPicture[0];
    setImage(newItem);
    setIndex(nextPictureIndex);
  };

  const previousPicture = () => {
    const galleryLength = gallery.length;
    if (currIndex === 0) {
      setIndex(galleryLength - 1);
      const newPicture = gallery[galleryLength - 1];
      setImage(newPicture);
      return;
    }

    const previousPictureIndex = currIndex - 1;
    const newPicture = gallery.filter((item) => {
      return gallery.indexOf(item) === previousPictureIndex;
    });
    const newItem = newPicture[0];
    setImage(newItem);
    setIndex(previousPictureIndex);
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
          onClick={() => replaceImg.src && handler(replaceImg.src, currIndex)}
          alt="main-pic"
        />
      </div>

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
                className={props.thumbnailStyle}
                src={item}
                onClick={() => thumbHandler(item, index)}
                alt="THUMB"
                key={index}
              />
            ))}
          </div>
        </div>

        <div>
          {image && (
            <Modal
              clickedImg={image}
              handelRotationRight={nextPicture}
              setClickedImg={setImage}
              handelRotationLeft={previousPicture}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default LightBoxHandlerComponent;
