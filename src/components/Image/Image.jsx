import { useState } from "react";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { PropTypes } from "prop-types";
import "./Image.scss";

function Image({ imgSrc, altText, key }) {
	// const [style, setStyle] = useState({ display: "none" });
	const [isHovered, setIsHovered] = useState(false);

	const onMouseEnter = () => {
		// setStyle({ display: "block" });
		setIsHovered(true);
	};
	const onMouseLeave = () => {
		// setStyle({ display: "none" });
		setIsHovered(false);
	};

	const imageOverlay = (
		<div
			style={{ display: isHovered ? "block" : "none" }}
			className="image-overlay"
		>
			<div className="icon-group">
				<button className="bookmark-icon">
					<IoBookmarksOutline />
				</button>
				<button className="heart-icon">
					<FaRegHeart />
				</button>
			</div>
			<div className="image-action">
				<button className="download-icon">
					<FiDownload /> Download
				</button>
			</div>
		</div>
	);

	return (
		<li
			className="image-container"
			key={key}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{/* {isHovered && imageOverlay} */}
			<img src={imgSrc} alt={altText} />
			<div className="overlay">
				<div>
					<button className="bookmark-icon">
						<IoBookmarksOutline />
					</button>
					<button className="heart-icon">
						<FaRegHeart />
					</button>
				</div>
				<button className="download-icon">
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
