import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { MainContext } from "../../../context/MainProvider";
import ImageModal from "../modal/ImageModal";
import "./ImageGallery.scss";
import RenderColumn from "../RenderColumn";
import useModal from "../../../hooks/useModal";
import {
	calculateColumns,
	computeColumnLayout,
	computeColumnsFromWidth,
	// computeColumnsFromWidth
} from "../../../helper/helper";

function ImageGallery({ allFetchedImages, fetchImages }) {
	const [containerWidth, setContainerWidth] = useState(0);
	// console.log("containerWidth :", containerWidth);
	const [columnCount, setColumnCount] = useState(1);

	const { isShowing: showImageModal, toggle } = useModal();
	const { setModalImage } = useContext(MainContext);

	const galleryEle = useRef();

	const computeColumns = useCallback(() => {
		const columnsCount = calculateColumns(containerWidth);
		// console.log('columnsCount :', columnsCount)
		setColumnCount(columnsCount);
	}, [containerWidth]);

	// const { column1, column2, column3 } = extractedImageColumns;

	useEffect(() => {
		let animationFrameId = null;

		const observer = new ResizeObserver(entries => {
			// console.log("entries :", entries);
			const newWidth = entries[0].contentRect.width;
			if (containerWidth !== newWidth) {
				// console.log('containerWidth :', containerWidth)
				animationFrameId = window.requestAnimationFrame(() => {
					setContainerWidth(Math.floor(newWidth));

				});
			}
		});
		observer.observe(galleryEle.current);

		return () => {
			observer.disconnect();
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [containerWidth]);

	useEffect(() => {
		computeColumns();

	}, [containerWidth, computeColumns]);

	useEffect(() => {
		if (showImageModal) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showImageModal]);

	// const { column1, column2, column3 } = computeColumnsFromWidth(allFetchedImages, columnCount);
	const [column1, column2, column3] = computeColumnLayout(containerWidth, columnCount, allFetchedImages);

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

	return (
		<>
			<div
				ref={galleryEle}
				className="image-gallery-container">
				{column1 && (
					<RenderColumn
						column={1}
						allMediaItems={column1}
						onImageSelect={onSelectImage}
						fetchImages={fetchImages}
					/>
				)}
				{column2 && (
					<RenderColumn
						column={2}
						allMediaItems={column2}
						onImageSelect={onSelectImage}
						fetchImages={fetchImages}
					/>
				)}
				{column3 && (
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
