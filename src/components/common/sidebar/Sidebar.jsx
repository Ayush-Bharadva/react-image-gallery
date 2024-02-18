import { PropTypes } from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SearchInput from "../search-input/SearchInput";
import Logo from "../logo/Logo";
import "./Sidebar.scss";
import { FiUpload } from "react-icons/fi";
import { SidebarItems } from "../../../utils/constants";

function Sidebar({ isSidebarOpen, closeSidebar }) {
	const navigate = useNavigate();

	const gotoHome = () => navigate("/");

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
	);
}

Sidebar.propTypes = {
	closeSidebar: PropTypes.func,
	isSidebarOpen: PropTypes.bool
};

export default Sidebar;
