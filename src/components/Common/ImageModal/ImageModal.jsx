import { useContext } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import Button from "../../../UI/button/Button";
import { SearchContext } from "../../../context/SearchProvider";
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
import "./ImageModal.scss";

function ImageModal({ onClose, getPreviousImage, getNextImage, showModal, ...props }) {
	const { modalImageInfo } = useContext(SearchContext);

	const handleDownload = () => {
		onDownloadImage(modalImageInfo.src.large, modalImageInfo.alt);
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
								<Button>
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
