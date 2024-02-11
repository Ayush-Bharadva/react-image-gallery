import { useCallback, useContext, useEffect } from "react";
import { PropTypes } from "prop-types";
import { MainContext } from "../../context/MainProvider";
import ImageModal from "../modal/ImageModal";
import "./ImageGallery.scss";
import RenderColumn from "../RenderColumn";
import useModal from "../../hooks/useModal";

function ImageGallery({ allImages, allFetchedImages, fetchImages, isVideo }) {
	const { column1, column2, column3 } = allImages;

	const { isShowing: showImageModal, toggle } = useModal();

	const { setModalImage } = useContext(MainContext);

	useEffect(() => {
		if (showImageModal) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showImageModal]);

	const onImageSelect = useCallback(
		(imageId) => {
			const selectedImage = allFetchedImages.find((image) => image.id === imageId);
			setModalImage(selectedImage);
			toggle();
		},
		[allFetchedImages, setModalImage, toggle]
	);

	const handleImageNavigation = useCallback(
		(currentId, dir) => {
			const currentImageIndex = allFetchedImages.findIndex((image) => image.id === currentId);
			const newImage = allFetchedImages.at(currentImageIndex + dir);
			if (newImage) {
				setModalImage(newImage);
			}
		},
		[setModalImage, allFetchedImages]
	);

	return (
		<>
			<div className="image-gallery-container">
				{column1 && (
					<RenderColumn
						column={1}
						allItems={allImages}
						onImageSelect={onImageSelect}
						fetchImages={fetchImages}
						isVideo={isVideo}
					/>
				)}
				{column2 && (
					<RenderColumn
						column={2}
						allItems={allImages}
						onImageSelect={onImageSelect}
						fetchImages={fetchImages}
						isVideo={isVideo}
					/>
				)}
				{column3 && (
					<RenderColumn
						column={3}
						allItems={allImages}
						onImageSelect={onImageSelect}
						fetchImages={fetchImages}
						isVideo={isVideo}
					/>
				)}
			</div>
			{showImageModal && (
				<ImageModal handleImageNavigate={handleImageNavigation} isShowing={showImageModal} hide={toggle} />
			)}
		</>
	);
}

ImageGallery.propTypes = {
	allImages: PropTypes.shape({
		column1: PropTypes.arrayOf(PropTypes.object),
		column2: PropTypes.arrayOf(PropTypes.object),
		column3: PropTypes.arrayOf(PropTypes.object),
	}),
	allFetchedImages: PropTypes.array,
	fetchImages: PropTypes.func,
	isVideo: PropTypes.bool,
};

export default ImageGallery;
