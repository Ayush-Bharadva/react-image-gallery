import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { MainContext } from "../../../context/MainProvider";
import ImageModal from "../modal/ImageModal";
import "./ImageGallery.scss";
import RenderColumn from "../RenderColumn";
import useModal from "../../../hooks/useModal";
import {
  calculateColumns,
  arrangeImagesIntoColumns,
} from "../../../utils/helper";

function ImageGallery({ allFetchedImages, fetchImages }) {
  // console.log('rerendering..')
  const [containerWidth, setContainerWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(1);
  const [allColumns, setAllColumns] = useState({
    column1: [],
    column2: [],
    column3: [],
  })

  const { column1, column2, column3 } = allColumns;

  const { isShowing: showImageModal, toggle } = useModal();
  const { setModalImage } = useContext(MainContext);

  const galleryElement = useRef();

  useLayoutEffect(() => {
    let animationFrameId = null;

    const observer = new ResizeObserver(entries => {
      const newWidth = Math.floor(entries[0].contentRect.width);
      const newColumnCount = calculateColumns(newWidth);
      setColumnCount(prev => {
        if (newColumnCount !== prev) {
          setContainerWidth((prevContainerWidth) => {
            if (prevContainerWidth !== newWidth) {
              animationFrameId = window.requestAnimationFrame(() => {

              });
              return newWidth;
            }
            return prevContainerWidth;
          });
          return newColumnCount;
        }
        return prev;
      });
    });
    observer.observe(galleryElement.current);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (showImageModal) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showImageModal]);


  useEffect(() => {
    console.log('column count changed..')
    const [col1, col2, col3] = arrangeImagesIntoColumns(containerWidth, columnCount, allFetchedImages);
    setAllColumns(prev => ({ ...prev, column1: [...col1], column2: [...col2], column3: [...col3] }));
  }, [allFetchedImages, columnCount, containerWidth])

  const onSelectImage = useCallback(
    imageId => {
      const selectedImage = allFetchedImages.find(image => image.id === imageId);
      setModalImage(selectedImage);
      toggle();
    },
    [allFetchedImages, setModalImage, toggle]
  );

  const handleImageNavigation = useCallback(
    (currentId, dir) => {
      const currentImageIndex = allFetchedImages.findIndex(image => image.id === currentId);
      const newImage = allFetchedImages.at(currentImageIndex + dir);
      if (newImage) {
        setModalImage(newImage);
      }
    },
    [setModalImage, allFetchedImages]
  );
  console.log(column1, column2, column3);
  return (
    <>
      <div
        ref={galleryElement}
        className="image-gallery-container">
        {!!column1.length && (
          <RenderColumn
            column={1}
            allMediaItems={column1}
            onImageSelect={onSelectImage}
            fetchImages={fetchImages}
          />
        )}
        {!!column2.length && (
          <RenderColumn
            column={2}
            allMediaItems={column2}
            onImageSelect={onSelectImage}
            fetchImages={fetchImages}
          />
        )}
        {!!column3.length && (
          <RenderColumn
            column={3}
            allMediaItems={column3}
            onImageSelect={onSelectImage}
            fetchImages={fetchImages}
          />
        )}

      </div>
      {showImageModal && (
        <ImageModal
          handleImageNavigate={handleImageNavigation}
          isShowing={showImageModal}
          hide={toggle}
        />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  allFetchedImages: PropTypes.array,
  fetchImages: PropTypes.func
};

export default ImageGallery;
