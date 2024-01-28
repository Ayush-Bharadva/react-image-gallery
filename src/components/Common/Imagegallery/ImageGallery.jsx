import { useContext, useState } from "react";
import { PropTypes } from "prop-types";
import { ImageContext } from "../../../context/SearchProvider";
import Image from "../Image/Image";
import ImageModal from "../ImageModal/ImageModal";
import "./ImageGallery.scss";
// import { useNavigate } from "react-router-dom";

function ImageGallery({ allImages }) {
	const { column1, column2, column3 } = allImages;

	// const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const { setModalImageInfo } = useContext(ImageContext);

	const onImageClick = (image) => {
		setShowModal(true);
		console.log(image);
		setModalImageInfo(image);
		// const { alt } = image;
		// const newAlt = alt.replace(/\s/g, "-");
		// navigate(`/photo/${newAlt}`);
	};

	const onCloseModal = () => {
		setShowModal(false);
	};

	const getPreviousImage = () => {
		setModalImageInfo({
			id: 19855379,
			width: 2283,
			height: 3354,
			url: "https://www.pexels.com/photo/yellow-fiat-500-on-street-in-switzerland-19855379/",
			photographer: "Tubanur Dogan",
			photographer_url: "https://www.pexels.com/@tubiderler",
			photographer_id: 774847708,
			avg_color: "#A99795",
			src: {
				original:
					"https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg",
				large2x:
					"https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
				large: "https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				medium: "https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg?auto=compress&cs=tinysrgb&h=350",
				small: "https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg?auto=compress&cs=tinysrgb&h=130",
				portrait:
					"https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
				landscape:
					"https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
				tiny: "https://images.pexels.com/photos/19855379/pexels-photo-19855379.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
			},
			liked: false,
			alt: "Free stock photo of car, peach, result",
		});
	};

	const getNextImage = () => {
		setModalImageInfo({
			id: 19869392,
			width: 11398,
			height: 7599,
			url: "https://www.pexels.com/photo/church-in-mountain-valley-19869392/",
			photographer: "Julien Riedel",
			photographer_url: "https://www.pexels.com/@julien-riedel-907961520",
			photographer_id: 907961520,
			avg_color: "#575755",
			src: {
				original:
					"https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg",
				large2x:
					"https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
				large: "https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				medium: "https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg?auto=compress&cs=tinysrgb&h=350",
				small: "https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg?auto=compress&cs=tinysrgb&h=130",
				portrait:
					"https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
				landscape:
					"https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
				tiny: "https://images.pexels.com/photos/19869392/pexels-photo-19869392.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
			},
			liked: false,
			alt: "Dolomiti",
		});
	};

	const renderColumn = (column) => (
		<div key={crypto.randomUUID()} className={`col-${column}`}>
			{allImages[`column${column}`].map((image) => (
				<Image
					key={image.id}
					image={image}
					onImageClick={onImageClick}
				/>
			))}
		</div>
	);

	return (
		<>
			<div className="image-gallery-container" key={crypto.randomUUID()}>
				{column1 && renderColumn(1)}
				{column2 && renderColumn(2)}
				{column3 && renderColumn(3)}
			</div>
			{showModal && (
				<ImageModal
					onClose={onCloseModal}
					showModal={setShowModal}
					getPreviousImage={getPreviousImage}
					getNextImage={getNextImage}
				/>
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
};

export default ImageGallery;
