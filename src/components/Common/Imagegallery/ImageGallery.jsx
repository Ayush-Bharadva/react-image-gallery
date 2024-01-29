import { useContext, useState } from "react";
import { PropTypes } from "prop-types";
import { ImageContext } from "../../../context/ImageProvider";
import Image from "../Image/Image";
import ImageModal from "../ImageModal/ImageModal";
import "./ImageGallery.scss";

function ImageGallery({ allImages }) {
	const [showModal, setShowModal] = useState(false);
	const { column1, column2, column3 } = allImages;

	const {
		modalImageInfo: { index, column },
		setModalImageInfo,
	} = useContext(ImageContext);

	const onImageSelect = (image, index, column) => {
		setModalImageInfo({ image, index, column });
		setShowModal(true);

		// const { alt, photographer } = image;
		// const queryPlaceholder = alt || photographer;
		// const newQueryPlaceholder = queryPlaceholder.replace(/\s/g, "-");
		// navigate(`/photo/${newQueryPlaceholder}`);
	};

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

	const renderColumn = column => (
		<div className={`col-${column}`}>
			{allImages[`column${column}`].map((image, index) => (
				<Image
					key={image.id}
					image={image}
					index={index}
					column={column}
					onImageClick={onImageSelect}
				/>
			))}
		</div>
	);

	// console.log("showModal, ", showModal);

	return (
		<>
			<div
				className="image-gallery-container"
				key={crypto.randomUUID()}>
				{column1 && renderColumn(1)}
				{column2 && renderColumn(2)}
				{column3 && renderColumn(3)}
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
		column3: PropTypes.arrayOf(PropTypes.object),
	}),
};

export default ImageGallery;
