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
	const { showModal, modalImageObj, onShowModal, onCloseModal, onImageClick } = useContext(SearchContext);

	const onSelectImage = () => {
		onShowModal(true);
		onImageClick(image);
	};

	return (
		<>
			<li
				onClick={onSelectImage}
				className="image-container"
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
					onClick={() => onDownloadImage(image.src.large, image.alt)}>
					<FiDownload /> Download
				</button>
			</li>
			<ImagePortal
				// imgObj={modalImageObj}
				// isOpen={showModal}
				onClose={() => onCloseModal(false)}
			/>
		</>
	);
}

Image.propTypes = {
	image: PropTypes.object,
};

export default Image;
