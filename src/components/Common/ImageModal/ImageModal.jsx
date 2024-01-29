import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./ImageModal.scss";
import { createPortal } from "react-dom";
import Button from "../../../UI/button/Button";
import { ImageContext } from "../../../context/ImageProvider";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { SiCanva } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";
import { onDownloadImage } from "../../../helper/utils";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/images/profile-avatar.jpg";
import SocialShareModal from "../modal/SocialShareModal";
import ImageDetailsModal from "../modal/ImageDetailsModal";

function ImageModal({ onImageNavigate, onClose }) {
	// const navigate = useNavigate();

	const {
		modalImageInfo: { image },
	} = useContext(ImageContext);

	const [showShareModal, setShowShareModal] = useState(false);
	const [showStatModal, setShowStatModal] = useState(false);

	const {
		photographer,
		src: { large: imageUrl },
		alt,
	} = image;

	const handleDownload = () => {
		onDownloadImage(imageUrl, alt);
	};

	const onShowMoreInfo = () => {
		setShowShareModal(true);
	};

	const onCloseMoreInfo = () => {
		setShowShareModal(false);
	};

	const onCopyToClipBoard = value => {
		navigator.clipboard.writeText(value);
	};

	return createPortal(
		<div className="modal-wrapper">
			<button
				className="modal-btn modal-close-btn"
				onClick={onClose}>
				<RxCross1 />
			</button>
			<button
				onClick={() => onImageNavigate(-1)}
				className="modal-btn previous-image-btn">
				<FaAngleLeft />
			</button>
			<button
				onClick={() => onImageNavigate(1)}
				className="modal-btn next-image-btn">
				<FaAngleRight />
			</button>
			<div className="modal-container">
				<div className="modal-info-container">
					<div className="image-info">
						<div className="profile">
							<div className="profile-img">
								<img
									src={avatar}
									alt="profile-avatar"
								/>
							</div>
							<div className="profile-name">
								<p>{photographer}</p>
								<p>Follow | Donate</p>
							</div>
						</div>
						<div className="actions">
							<Button>
								<IoBookmarksOutline className="icon" />
								<span>Collect</span>
							</Button>
							<Button>
								<IoHeartOutline className="icon" />
								<span>Like</span>
							</Button>
							<Button>
								<SiCanva className="icon" />
								<span>Edit in Canva</span>
							</Button>
							<Button
								className="download-btn-bg text-white"
								onClick={handleDownload}>
								<span className="download-text">Free Download</span> <FiDownload className="icon" />
							</Button>
						</div>
					</div>
					<div className="image-container">
						<img
							src={imageUrl}
							alt={alt}
						/>
					</div>
					<div className="more-info">
						<p className="more-image-info flex-row gap-12">
							<span className="text-center-v">
								<AiTwotoneCheckCircle />
								Free to use
							</span>
							<span className="text-center-v">
								<GrLocation /> NewZealand
							</span>
						</p>
						<div className="buttons">
							<Button onClick={() => setShowStatModal(true)}>
								<BsInfoCircle className="icon" /> <span>More Info</span>
							</Button>
							<Button onClick={onShowMoreInfo}>
								<CiShare1 className="icon" /> <span>Share</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
			{showShareModal && (
				<SocialShareModal
					onClose={onCloseMoreInfo}
					onCopy={onCopyToClipBoard}
				/>
			)}
			{showStatModal && <ImageDetailsModal onCloseModal={() => setShowStatModal(false)} />}
		</div>,
		document.getElementById("image-portal")
	);
}

ImageModal.propTypes = {
	onImageNavigate: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};
export default ImageModal;
