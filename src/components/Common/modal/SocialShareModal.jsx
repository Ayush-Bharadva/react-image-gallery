import { PropTypes } from "prop-types";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import { FaLinkedinIn, FaPinterest, FaTwitter } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { GrTumblr } from "react-icons/gr";
import { MdOutlineContentCopy } from "react-icons/md";

function SocialShareModal({ onClose, onCopy }) {
	return (
		<Modal>
			<div className="social-share-modal-container">
				<button
					className="modal-close-btn close-modal-btn"
					onClick={onClose}>
					<RxCross1 />
				</button>
				<div className="social-share-modal flex-column-center">
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
							onClick={onCopy}>
							<span>Photo by Kaboompics.com from Pexels</span>
							<span>
								<MdOutlineContentCopy />
							</span>
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default SocialShareModal;

SocialShareModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
};
