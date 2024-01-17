import { useContext } from "react";
import { SearchContext } from "../../context/SearchProvider";
import { onDownloadImage } from "../../services/services";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { PropTypes } from "prop-types";
import ImagePortal from "./ImagePortal";
import "./Image.scss";

function Image({ image }) {
	const { showModal, setShowModal, setModalImageInfo } =
		useContext(SearchContext);

	return (
		<>
			<li
				onClick={() => setModalImageInfo(image)}
				className="image-container"
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
				<button
					className="download-icon"
					onClick={() => onDownloadImage(image.src.large, image.alt)}
				>
					<FiDownload /> Download
				</button>
			</li>
			{showModal && <ImagePortal onClose={() => setShowModal(false)} />}
		</>
	);
}

Image.propTypes = {
	image: PropTypes.object,
};

export default Image;
