import { PropTypes } from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SearchInput from "../search-input/SearchInput";
import Logo from "../logo/Logo";
import "./Sidebar.scss";
import { FiUpload } from "react-icons/fi";
import { SidebarItems } from "../../../utils/constants";
import { FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { useEffect } from "react";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
	const navigate = useNavigate();

	const gotoHome = () => navigate("/");

	useEffect(() => {
		if (isSidebarOpen) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isSidebarOpen]);

	return (
		<div className={`sidebar-container ${isSidebarOpen ? "show-side-bar" : ""}`}>
			<div className="sidebar-nav-container">
				<div className="left">
					<Logo textColor="white" />
					<SearchInput />
				</div>
				<div className="right">
					<button className="upload-filled-button">Upload</button>
					<button
						type="button"
						className="upload-button">
						<FiUpload />
					</button>
					<button
						className="close-icon-btn"
						onClick={closeSidebar}>
						<AiOutlineClose />
					</button>
				</div>
			</div>

			<div className="sidebar-sections">
				<div className="section">
					<button
						className="btn"
						onClick={gotoHome}>
						Home
					</button>
					{SidebarItems.map(item => (
						<button
							key={item}
							className="btn">
							{item}
						</button>
					))}
				</div>
				<div className="section">
					<button type="button" className="btn">Your Profile</button>
					<button type="button" className="btn">Change Language</button>
					<button type="button" className="btn">Upload</button>
					<button type="button" className="btn">License</button>
					<button type="button" className="btn">Settings</button>
					<button type="button" className="btn">Logout</button>
				</div>
				<div className="section">
					<button type="button" className="btn">Apps & Plugins</button>
					<button type="button" className="btn">FAQ</button>
					<button type="button" className="btn">About Us</button>
					<button type="button" className="btn">Imprint & terms</button>
				</div>
				<div className="bottom-section">
					<button type="button" className="btn"> <ImFacebook2 /> </button>
					<button type="button" className="btn"> <FaTwitter /> </button>
					<button type="button" className="btn"> <FaInstagram /> </button>
					<button type="button" className="btn"> <FaPinterest /> </button>
					<button type="button" className="btn"> <FaYoutube /> </button>
				</div>
			</div>

		</div>
	);
}

Sidebar.propTypes = {
	closeSidebar: PropTypes.func,
	isSidebarOpen: PropTypes.bool
};

export default Sidebar;
