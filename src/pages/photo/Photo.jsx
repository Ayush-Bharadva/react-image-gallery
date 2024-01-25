import "./Photo.scss";
import { IoBookmarksOutline, IoHeartOutline } from "react-icons/io5";
import Button from "../../UI/button/Button";
import Navbar from "../../components/Common/navbar/Navbar";
import { SiCanva } from "react-icons/si";
import { onDownloadImage } from "../../helper/utils";
import { useContext, useState } from "react";
import { ImageContext } from "../../context/SearchProvider";
import { FiDownload } from "react-icons/fi";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GrLocation, GrTumblr } from "react-icons/gr";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import avatar from "../../assets/images/profile-avatar.jpg";
import Modal from "../../components/Common/modal/Modal";
import { FaLinkedinIn, FaPinterest, FaTwitter } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { MdOutlineContentCopy } from "react-icons/md";
// import ImageModal from "../../components/Common/ImageModal/ImageModal";

function Photo() {
	const [showShareModal, setShowShareModal] = useState(false);

	const onShare = () => {
		setShowShareModal(true);
	};

	const onCloseShare = () => {
		setShowShareModal(false);
	};

	const { modalImageInfo } = useContext(ImageContext);
	console.log(modalImageInfo);

	const {
		photographer,
		src: { large: imageUrl },
		alt,
	} = modalImageInfo;
	console.log(imageUrl);

	const newAlt = alt.replace(/\s/g, "-");
	console.log(newAlt);

	const handleDownload = () => {
		onDownloadImage(imageUrl, alt);
	};

	const onCopyToClipBoard = value => {
		navigator.clipboard.writeText(value);
	};

	// const [showModal, setShowModal] = useState(false);
	// const onCloseModal = () => {
	// 	setShowModal(false);
	// };

	return (
		<>
			<Navbar />
			<div className="photo-container">
				<div className="top">
					<div className="image-info">
						<div className="profile">
							<div className="profile-img">
								<img
									src={avatar}
									alt="avatar image"
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
				</div>
				<div className="middle">
					<div className="image-container">
						<img
							src={imageUrl}
							alt={alt}
							className="photo-img"
						/>
					</div>
				</div>
				<div className="bottom">
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
							<Button onClick={onShare}>
								<CiShare1 className="icon" /> <span>Share</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
			{showShareModal && (
				<Modal>
					<div className="social-share-modal flex-column-center">
						<button onClick={onCloseShare}>Close</button>
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
								onClick={() => onCopyToClipBoard(alt)}>
								<span>Photo by Kaboompics.com from Pexels</span>
								<span>
									<MdOutlineContentCopy />
								</span>
							</button>
						</div>
					</div>
				</Modal>
			)}
			{/* {showModal && (
				<ImageModal
					onClose={onCloseModal}
					showModal={setShowModal}
					// getPreviousImage={getPreviousImage}
					// getNextImage={getNextImage}
				/>
			)} */}
		</>
	);
}

export default Photo;
