import { useCallback } from "react";
import { onDownloadImage } from "../../helper/utils.js";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { PropTypes } from "prop-types";
import "./ImageCard.scss";

function ImageCard({ image, onImageClick }) {
	const onDownload = useCallback(
		(event) => {
			event.preventDefault();
			onDownloadImage(image.src.large, image.alt);
			event.stopPropagation();
		},
		[image]
	);

	return (
		<li
			onClick={() => {
				onImageClick(image.id);
			}}
			className="main-image-container"
			key={image.id}>
			<img src={image.src.large} alt={image.alt} />
			<div className="icons-group">
				<button className="bookmark-icon">
					<IoBookmarksOutline />
				</button>
				<button className="heart-icon">
					<FaRegHeart />
				</button>
			</div>
			<button type="button" className="download-icon" onClick={onDownload}>
				<FiDownload /> Download
			</button>
		</li>
	);
}

ImageCard.propTypes = {
	image: PropTypes.object,
	onImageClick: PropTypes.func,
};

export default ImageCard;
