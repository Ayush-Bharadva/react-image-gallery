import { PropTypes } from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SearchInput from "../searchinput/SearchInput";
import "./Navbar.scss";
import Logo from "../../components/Header/Logo";
import { useRef, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "../../components/Header/Header.scss";

function Navbar() {
	const sidebarRef = useRef();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
		setSidebarWidth();
	};

	const setSidebarWidth = () => {
		const width = sidebarOpen ? "275px" : "0";
		sidebarRef.current.style.width = width;
	};

	return (
		<>
			<div className="nav-bar">
				<div className="nav-bar-left">
					<Logo />
					<SearchInput className="sp-search-input-container" />
				</div>
				<ul className="nav-items nav-bar-right">
					<li>Explore</li>
					<li>License</li>
					<li>
						<button>Upload</button>
					</li>
					<button className="upload-btn">
						<FiUpload />
					</button>
					<button className="sidebar-btn">
						<GiHamburgerMenu onClick={toggleSidebar} />
					</button>
				</ul>
			</div>
			{sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
		</>
	);
}
export default Navbar;

Navbar.propTypes = {
	showSearchInput: PropTypes.bool,
};
