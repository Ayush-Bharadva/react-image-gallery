import { useState } from "react";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { PropTypes } from "prop-types";
import "./Image.scss";
import { onDownloadImage } from "../../services/services";

function Image({ image, key }) {
	// const logInfo = info => {
	// onDownloadImage(info);
	// console.log(info);
	// };

	return (
		<li
			className="image-container"
			key={key}>
			<img
				src={image.src.medium}
				alt={image.alt}
			/>
			<div className="overlay">
				<div className="icons-group">
					<button className="bookmark-icon">
						<IoBookmarksOutline />
					</button>
					<button className="heart-icon">
						<FaRegHeart />
					</button>
				</div>
				<button
					className="download-icon"
					onClick={() => onDownloadImage(image.src.medium, image.alt)}>
					<FiDownload /> Download
				</button>
			</div>
		</li>
	);
}

Image.propTypes = {
	imgSrc: PropTypes.string,
	altText: PropTypes.string,
	key: PropTypes.string,
};

export default Image;
