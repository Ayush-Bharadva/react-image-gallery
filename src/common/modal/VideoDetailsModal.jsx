import { PropTypes } from "prop-types";
import Modal from "./Modal";
import { videoDetails } from "../../constants/constants";
import { RxCross1 } from "react-icons/rx";

function VideoDetailsModal({ isShowing, hide, videoImageUrl }) {
	const {
		title,
		statistics: { views, likes, downloads },
		relatedInfo: { dimensions, aspectRatio, duration, fps }
	} = videoDetails;

	return (
		<Modal isShowing={isShowing}>
			<div className="video-details-modal-container">
				<div className="top-container">
					<div className="top-container-header flex-row-center">
						<div className="image-container">
							<img
								src={videoImageUrl}
								alt=""
							/>
						</div>
						<div className="top-heading">
							<h1>Video details</h1>
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
						<p title="Camera">Duration</p>
						<p title={duration}>{duration}</p>
					</div>
					<div className="stat-info">
						<p title="Focal">FPS</p>
						<p title={fps}>{fps}</p>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default VideoDetailsModal;

VideoDetailsModal.propTypes = {
	isShowing: PropTypes.bool,
	hide: PropTypes.func.isRequired,
	videoImageUrl: PropTypes.string.isRequired
};
