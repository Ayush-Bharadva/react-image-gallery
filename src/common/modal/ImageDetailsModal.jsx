import { PropTypes } from "prop-types";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import { imageDetails } from "../../constants/constants";

function ImageDetailsModal({ modalImage, isShowing, hide }) {
	const {
		title,
		statistics: { views, likes, downloads },
		relatedInfo: { dimensions, aspectRatio, camera, focal, aperture, iso, shutterSpeed, takenAt }
	} = imageDetails;

	return (
		<Modal isShowing={isShowing}>
			<div className="image-details-modal-container">
				<div className="top-container">
					<div className="top-container-header flex-row-center">
						<div className="image-container">
							<img
								src={modalImage}
								alt=""
							/>
						</div>
						<div className="top-heading">
							<h1>Photo details</h1>
							<p>{title}</p>
						</div>
					</div>
					<div className="statistics">
						<div>
							<p>Views</p>
							<p>{views}</p>
						</div>
						<div>
							<p>Likes</p>
							<p>{likes}</p>
						</div>
						<div>
							<p>Downloads</p>
							<p>{downloads}</p>
						</div>
					</div>
				</div>
				<div className="bottom-container">
					<button
						className="close-btn"
						onClick={hide}>
						<RxCross1 />
					</button>
					<div className="stat-info">
						<p title="Dimensions">Dimensions</p>
						<p title={dimensions}>{dimensions}</p>
					</div>
					<div className="stat-info">
						<p title="Aspect Ratio">Aspect Ratio</p>
						<p title={aspectRatio}>{aspectRatio}</p>
					</div>
					<div className="stat-info">
						<p title="Camera">Camera</p>
						<p title={camera}>{camera}</p>
					</div>
					<div className="stat-info">
						<p title="Focal">Focal</p>
						<p title={focal}>{focal}</p>
					</div>
					<div className="stat-info">
						<p title="Aperture">Aperture</p>
						<p title={aperture}>{aperture}</p>
					</div>
					<div className="stat-info">
						<p title="ISO">ISO</p>
						<p title={iso}>{iso}</p>
					</div>
					<div className="stat-info">
						<p title="Shutter Speed">Shutter Speed</p>
						<p title={shutterSpeed}>{shutterSpeed}</p>
					</div>
					<div className="stat-info">
						<p title="Taken At">Taken At</p>
						<p title={takenAt}>{takenAt}</p>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default ImageDetailsModal;

ImageDetailsModal.propTypes = {
	hide: PropTypes.func.isRequired,
	modalImage: PropTypes.string.isRequired,
	isShowing: PropTypes.bool
};
