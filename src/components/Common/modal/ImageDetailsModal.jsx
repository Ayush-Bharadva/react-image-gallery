import { PropTypes } from "prop-types";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import testImage from "../../../assets/images/forest-img.jpeg";

function ImageDetailsModal({ onCloseModal }) {
	return (
		<Modal>
			<div className="image-details-modal-container">
				<div className="top-container">
					<div className="top-container-header flex-row-center">
						<div className="image-container">
							<img
								src={testImage}
								alt=""
							/>
						</div>
						<div className="top-heading">
							<h1>Photo details</h1>
							<p>Uploaded on December 16th, 2023</p>
						</div>
					</div>
					<div className="statistics flex-row-center">
						<div>
							<p>Views</p>
							<p>4.8K</p>
						</div>
						<div>
							<p>Likes</p>
							<p>258</p>
						</div>
						<div>
							<p>Downloads</p>
							<p>2.4K</p>
						</div>
					</div>
				</div>
				<div className="bottom-container">
					<button
						className="close-btn"
						onClick={onCloseModal}>
						<RxCross1 />
					</button>
					<div className="stat-info">
						<p>Dimensions</p>
						<p>3718 x 5577</p>
					</div>
					<div className="stat-info">
						<p>Aspect Ratio</p>
						<p>2:3</p>
					</div>
					<div className="stat-info">
						<p>Camera</p>
						<p>ILCE-7C</p>
					</div>
					<div className="stat-info">
						<p>Focal</p>
						<p>35.0mm</p>
					</div>
					<div className="stat-info">
						<p>Aperture</p>
						<p>f/4.0</p>
					</div>
					<div className="stat-info">
						<p>ISO</p>
						<p>100</p>
					</div>
					<div className="stat-info">
						<p>Shutter Speed</p>
						<p>0.002s</p>
					</div>
					<div className="stat-info">
						<p>Taken At</p>
						<p>Aug 13, 2023</p>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default ImageDetailsModal;

ImageDetailsModal.propTypes = {
	onCloseModal: PropTypes.func.isRequired,
};
