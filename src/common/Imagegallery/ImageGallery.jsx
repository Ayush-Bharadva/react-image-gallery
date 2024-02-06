import { useCallback, useContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { ImageContext } from "../../context/ImageProvider";
// import ImageCard from "../../components/ImageCard/ImageCard";
import ImageModal from "../modal/ImageModal";
import "./ImageGallery.scss";
import RenderColumn from "../RenderColumn";

function ImageGallery({ allImages, isVideo }) {
	const [showModal, setShowModal] = useState(false);
	const { column1, column2, column3 } = allImages;

	const {
		modalImageInfo: { index, column },
		setModalImageInfo
	} = useContext(ImageContext);

	useEffect(() => {
		if (showModal) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showModal]);

	const onImageSelect = useCallback(
		(image, index, column) => {
			setModalImageInfo({ image, index, column });
			setShowModal(true);
		},
		[setModalImageInfo]
	);

	// refactor this function
	const navigateImage = direction => {
		const newIndex = index + direction;
		let newImage = null;

		if (column === 1 && newIndex >= 0 && newIndex < column1.length) {
			newImage = column1[newIndex];
		} else if (column === 2 && newIndex >= 0 && newIndex < column2.length) {
			newImage = column2[newIndex];
		} else if (column === 3 && newIndex >= 0 && newIndex < column3.length) {
			newImage = column3[newIndex];
		}

		if (newImage !== null) {
			setModalImageInfo({ image: newImage, index: newIndex, column });
		}
	};

	// const renderColumn = column => (
	// 	<div className={`col-${column}`}>
	// 		{allImages[`column${column}`].map((image, index) => (
	// 			<ImageCard
	// 				key={image.id}
	// 				image={image}
	// 				index={index}
	// 				column={column}
	// 				onImageClick={onImageSelect}
	// 			/>
	// 		))}
	// 	</div>
	// );

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
						isVideo={false}
					/>
				)}
			</div>
			{showModal ? (
				<ImageModal
					onImageNavigate={navigateImage}
					onClose={() => setShowModal(false)}
				/>
			) : null}
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
