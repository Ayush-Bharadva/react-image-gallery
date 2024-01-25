import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./ImageModal.scss";
import { createPortal } from "react-dom";
import Button from "../../../UI/button/Button";
import { ImageContext } from "../../../context/SearchProvider";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GrLocation, GrTumblr } from "react-icons/gr";
import { SiCanva } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";
import { onDownloadImage } from "../../../helper/utils";
import { FaAngleLeft, FaAngleRight, FaLinkedinIn, FaPinterest, FaTwitter } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Modal from "../modal/Modal";
import { ImFacebook2 } from "react-icons/im";
import { MdOutlineContentCopy } from "react-icons/md";

function ImageModal({ onClose, getPreviousImage, getNextImage, showModal, ...props }) {
	const { modalImageInfo } = useContext(ImageContext);
	const [showInfoModal, setShowInfoModal] = useState(false);

	const handleDownload = () => {
		onDownloadImage(modalImageInfo.src.large, modalImageInfo.alt);
	};

	const onShowMoreInfo = () => {
		setShowInfoModal(true);
	};

	const onCloseMoreInfo = () => {
		setShowInfoModal(false);
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
				className="modal-btn previous-image-btn"
				onClick={getPreviousImage}>
				<FaAngleLeft />
			</button>
			<button
				className="modal-btn next-image-btn"
				onClick={getNextImage}>
				<FaAngleRight />
			</button>
			<div
				{...props}
				className="modal-container">
				{showModal && modalImageInfo ? (
					<div className="modal-info-container">
						<div className="image-info">
							<div className="profile">
								<div className="profile-img"></div>
								<div className="profile-name">
									<p>John Doe</p>
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
								src={modalImageInfo.src.large}
								alt={modalImageInfo.alt}
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
								<Button onClick={onShowMoreInfo}>
									<BsInfoCircle className="icon" /> <span>More Info</span>
								</Button>
								<Button>
									<CiShare1 className="icon" /> <span>Share</span>
								</Button>
							</div>
						</div>
					</div>
				) : null}
			</div>
			{showInfoModal && (
				<Modal>
					<div className="social-share-modal flex-column-center">
						<button onClick={onCloseMoreInfo}>Close</button>
						<h1 className="modal-title">Share this with Your Community</h1>
						<div className="social-icons-container">
							<menu>
								<li className="social-icon pinterest-icon-bg">
									<FaPinterest className="pinterest-icon-color" />
								</li>
								<li className="social-icon twitter-icon-bg">
									<FaTwitter className="twitter-icon-color" />
								</li>
								<li className="social-icon linkedin-icon-bg">
									<FaLinkedinIn className="linkedin-icon-color" />
								</li>
								<li className="social-icon facebook-icon-bg">
									<ImFacebook2 className="facebook-icon-color" />
								</li>
								<li className="social-icon tumbler-icon-bg">
									<GrTumblr className="tumbler-icon-color" />
								</li>
							</menu>
						</div>
						<div className="social-link">
							<p>Set a link back to this photo</p>
							<button
								className="link-btn flex-row-center"
								onClick={() => onCopyToClipBoard()}>
								<span>Photo by Kaboompics.com from Pexels</span>
								<span>
									<MdOutlineContentCopy />
								</span>
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>,
		document.getElementById("image-portal")
	);
}

ImageModal.propTypes = {
	showModal: PropTypes.bool,
	onClose: PropTypes.func,
	props: PropTypes.object,
	getPreviousImage: PropTypes.object,
	getNextImage: PropTypes.object,
};

export default ImageModal;
