import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import Button from "../../UI/Button";
import { GoChevronDown } from "react-icons/go";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import "./ImagePortal.scss";
import "../../styles/Global.scss";

function ImagePortal({ isOpen, onClose, imgObj }) {
	if (!isOpen) {
		return null;
	}

	return createPortal(
		<div className="modal">
			<div className="modal-container">
				<div className="modal-body">
					<p>Sample Modal</p>
					<div className="image-info">
						<div className="profile"></div>
						<div className="actions">
							<Button>
								{" "}
								<IoBookmarksOutline className="icon" /> Collect
							</Button>
							<Button>
								{" "}
								<IoHeartOutline className="icon" /> Like
							</Button>
							<Button>Edit in Canva</Button>
							<Button className="download-btn-bg text-white">
								Free Download <GoChevronDown className="icon" />{" "}
							</Button>
						</div>
					</div>
					<div className="image-container">
						<img
							src={imgObj.src.large}
							alt={imgObj.alt}
						/>
					</div>
					<div className="more-info">
						<p>
							<span>Free to use</span>
							<span>West Killbride, Scotland, United Kingdom</span>
						</p>
						<div className="buttons">
							<Button>
								<BsInfoCircle className="icon" /> More Info
							</Button>
							<Button>
								<CiShare1 className="icon" /> Share
							</Button>
						</div>
					</div>
					<button onClick={onClose}>Close</button>
				</div>
			</div>
		</div>,
		document.getElementById("image-portal")
	);
}

ImagePortal.propTypes = {
	isOpen: PropTypes.boolean,
	onClose: PropTypes.func,
	imgObj: PropTypes.object,
};

export default ImagePortal;
