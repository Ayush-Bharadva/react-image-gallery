import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import Button from "../../UI/Button";
import { GoChevronDown } from "react-icons/go";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { SearchContext } from "../../context/SearchProvider";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { SiCanva } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";
import { onDownloadImage } from "../../services/services";
import "./ImageDialog.scss";
import "../../styles/Global.scss";

const ImageDialog = forwardRef(function ImageDialog(props, ref) {
	const imageDialog = useRef(null);

	useImperativeHandle(ref, () => {
		return {
			open() {
				imageDialog.current?.showModal();
			},
		};
	});

	const { modalImageInfo } = useContext(SearchContext);
	// console.log(modalImageInfo);

	const handleDownload = () => {
		onDownloadImage(modalImageInfo.src.large, modalImageInfo.alt);
	};

	return createPortal(
		<dialog {...props} ref={imageDialog}>
			{modalImageInfo ? (
				<>
					<form method="dialog">
						<button>
							<RxCross1 />
						</button>
					</form>
					<div className="dialog-container">
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
									<IoBookmarksOutline className="icon" />{" "}
									Collect
								</Button>
								<Button>
									<IoHeartOutline className="icon" /> Like
								</Button>
								<Button>
									<SiCanva className="icon" /> Edit in Canva
								</Button>
								<Button
									className="download-btn-bg text-white"
									onClick={handleDownload}
								>
									Free Download{" "}
									<GoChevronDown className="icon" />{" "}
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
							<p className="flex-row gap-5">
								<span className="text-center-v">
									<AiTwotoneCheckCircle /> Free to use
								</span>
								<span className="text-center-v">
									<GrLocation /> NewZealand
								</span>
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
					</div>
				</>
			) : null}
		</dialog>,
		document.getElementById("image-portal")
	);
});

ImageDialog.propTypes = {
	props: PropTypes.object,
};

export default ImageDialog;
