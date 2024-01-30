import { useCallback } from "react";
import { onDownloadImage } from "../../helper/utils.js";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { PropTypes } from "prop-types";
import "./ImageCard.scss";

function ImageCard({ image, index, column, onImageClick }) {
	const onDownload = useCallback(
		(e) => {
			e.preventDefault();
			onDownloadImage(image.src.large, image.alt);
			e.stopPropagation();
		},
		[image]
	);

	const handleButtonClick = (e) => {
		const action = e.currentTarget.getAttribute("data-action");
		switch (action) {
			case "bookmark":
				// Handle bookmark action
				break;
			case "heart":
				// Handle heart action
				break;
			default:
				break;
		}
	};

	return (
		<li
			onClick={() => {
				onImageClick(image, index, column);
			}}
			className="main-image-container"
			key={image.id}
		>
			<img src={image.src.large} alt={image.alt} />
			<div className="icons-group">
				<button className="bookmark-icon">
					<IoBookmarksOutline />
				</button>
				<button className="heart-icon">
					<FaRegHeart />
				</button>
			</div>
			<button className="download-icon" onClick={onDownload}>
				<FiDownload /> Download
			</button>
		</li>
	);
}

ImageCard.propTypes = {
	image: PropTypes.object,
	index: PropTypes.number,
	column: PropTypes.number,
	onImageClick: PropTypes.func,
};

export default ImageCard;
