import { useContext } from "react";
import PropTypes from "prop-types";
import "./ImageModal.scss";
import Button from "../../UI/button/Button";
import { ImageContext } from "../../context/ImageProvider";
import { onDownloadImage } from "../../helper/utils";
import { IoBookmarksOutline, IoHeartOutline } from "react-icons/io5";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { FiDownload } from "react-icons/fi";
import avatar from "../../assets/images/profile-avatar.jpg";
import SocialShareModal from "./SocialShareModal";
import ImageDetailsModal from "./ImageDetailsModal";
import { RxCross1 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SiCanva } from "react-icons/si";
import { CiShare1 } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import Modal from "./Modal";
import useModal from "../../hooks/useModal";

function ImageModal({ onImageNavigate, isShowing, hide }) {
	const { isShowing: imageDetails, toggle: toggleImageDetails } = useModal();
	const { isShowing: shareInfo, toggle: toggleShare } = useModal();

	const {
		modalImageInfo: { image }
	} = useContext(ImageContext);

	const {
		photographer,
		src: { large: imageUrl },
		alt
	} = image;

	const handleDownload = () => onDownloadImage(imageUrl, alt);

	return (
		<Modal
			isShowing={isShowing}
			hide={hide}>
			<button
				className="modal-btn modal-close-btn"
				onClick={hide}>
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
							<Button type="outlined-button">
								<IoBookmarksOutline className="icon" />
								<span>Collect</span>
							</Button>
							<Button type="outlined-button">
								<IoHeartOutline className="icon" />
								<span>Like</span>
							</Button>
							<Button type="outlined-button">
								<SiCanva className="icon" />
								<span>Edit in Canva</span>
							</Button>
							<Button
								type="filled-button"
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
							<Button
								type="outlined-button"
								onClick={toggleImageDetails}>
								<BsInfoCircle className="icon" /> <span>More Info</span>
							</Button>
							<Button
								type="outlined-button"
								onClick={toggleShare}>
								<CiShare1 className="icon" /> <span>Share</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
			{imageDetails ? (
				<ImageDetailsModal
					modalImage={imageUrl}
					isShowing={imageDetails}
					hide={toggleImageDetails}
				/>
			) : null}
			{shareInfo ? (
				<SocialShareModal
					photographer={photographer}
					isShowing={shareInfo}
					hide={toggleShare}
				/>
			) : null}
		</Modal>
	);
}

ImageModal.propTypes = {
	onImageNavigate: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
	hide: PropTypes.func.isRequired
};
export default ImageModal;
