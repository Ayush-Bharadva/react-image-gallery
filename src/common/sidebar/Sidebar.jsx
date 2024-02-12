import { PropTypes } from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SearchInput from "../searchinput/SearchInput";
import Logo from "../../components/Header/Logo";
import "./Sidebar.scss";
import { FiUpload } from "react-icons/fi";

function Sidebar({ items, sidebarOpen, closeSidebar }) {
	const navigate = useNavigate();

	const gotoHome = () => navigate("/");

	return (
		<div className={`sidebar-container ${sidebarOpen ? "show-side-bar" : null}`}>
			<div className="sidebar-nav-container">
				<div className="flex-row justify-between gap-7">
					<Logo textColor="white" />
					<SearchInput />
				</div>
				<div className="flex-row gap-7">
					<button className="upload-filled-button">Upload</button>
					<button type="button" className="upload-button">
						<FiUpload />
					</button>
					<button className="close-icon-btn" onClick={closeSidebar}>
						<AiOutlineClose />
					</button>
				</div>
			</div>
			<button className="btn" onClick={gotoHome}>
				Home
			</button>
			{items.map((item) => (
				<button key={item} className="btn">
					{item}
				</button>
			))}
		</div>
	);
}

Sidebar.propTypes = {
	items: PropTypes.array,
	closeSidebar: PropTypes.func,
	sidebarOpen: PropTypes.bool,
};

export default Sidebar;
