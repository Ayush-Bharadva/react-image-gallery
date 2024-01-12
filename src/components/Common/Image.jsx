import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { PropTypes } from "prop-types";
import "./Image.scss";
import { onDownloadImage } from "../../services/services";

function Image({ image }) {
	return (
		<li className="image-container">
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
					onClick={() => onDownloadImage(image.src.large, image.alt)}>
					<FiDownload /> Download
				</button>
			</div>
		</li>
	);
}

Image.propTypes = {
	image: PropTypes.object,
};

export default Image;
