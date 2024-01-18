import { onDownloadImage } from "../../services/services";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { PropTypes } from "prop-types";
import "./Image.scss";

function Image({ image, onImageClick }) {
	// const { setModalImageInfo } = useContext(SearchContext);

	// const modal = useRef(null);

	// const onImageClick = () => {
	// 	console.log("click occur", modal.current);
	// 	setModalImageInfo(image);
	// 	modal.current.open();
	// };

	const onDownload = e => {
		// e.preventDefault();
		onDownloadImage(image.src.large, image.alt);
		e.stopPropagation();
	};

	return (
		<li
			onClick={() => {
				onImageClick(image);
			}}
			className="main-image-container"
			key={image.id}>
			<img
				src={image.src.large}
				alt={image.alt}
			/>
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
				onClick={onDownload}>
				<FiDownload /> Download
			</button>
		</li>
	);
}

Image.propTypes = {
	image: PropTypes.object,
	onImageClick: PropTypes.func,
};

export default Image;
