import { useCallback, useContext, useEffect } from "react";
import { PropTypes } from "prop-types";
import { ImageContext } from "../../context/ImageProvider";
import ImageModal from "../modal/ImageModal";
import "./ImageGallery.scss";
import RenderColumn from "../RenderColumn";
import useModal from "../../hooks/useModal";

function ImageGallery({ allImages, isVideo }) {
	const { column1, column2, column3 } = allImages;

	const { isShowing, toggle } = useModal();

	const {
		modalImageInfo: { index, column },
		setModalImageInfo
	} = useContext(ImageContext);

	useEffect(() => {
		if (isShowing) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isShowing]);

	const onImageSelect = useCallback(
		(image, index, column) => {
			setModalImageInfo({ image, index, column });
			toggle();
		},
		[setModalImageInfo, toggle]
	);

	const navigateImage = direction => {
		const newColumn = [column1, column2, column3][column - 1];
		const newIndex = index + direction;

		if (newIndex >= 0 && newIndex < newColumn.length) {
			setModalImageInfo({ image: newColumn[newIndex], index: newIndex, column });
		}
	};

	return (
		<>
			<div className="image-gallery-container">
				{column1 && (
					<RenderColumn
						column={1}
						allItems={allImages}
						onImageSelect={onImageSelect}
						isVideo={isVideo}
					/>
				)}
				{column2 && (
					<RenderColumn
						column={2}
						allItems={allImages}
						onImageSelect={onImageSelect}
						isVideo={isVideo}
					/>
				)}
				{column3 && (
					<RenderColumn
						column={3}
						allItems={allImages}
						onImageSelect={onImageSelect}
						isVideo={isVideo}
					/>
				)}
			</div>
			{isShowing && (
				<ImageModal
					onImageNavigate={navigateImage}
					isShowing={isShowing}
					hide={toggle}
				/>
			)}
		</>
	);
}

ImageGallery.propTypes = {
	allImages: PropTypes.shape({
		column1: PropTypes.arrayOf(PropTypes.object),
		column2: PropTypes.arrayOf(PropTypes.object),
		column3: PropTypes.arrayOf(PropTypes.object)
	}),
	isVideo: PropTypes.bool
};

export default ImageGallery;
