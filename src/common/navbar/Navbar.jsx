import { PropTypes } from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SearchInput from "../searchinput/SearchInput";
import "./Navbar.scss";
import Logo from "../../components/Header/Logo";
import "../../components/Header/Header.scss";
import Sidebar from "../sidebar/Sidebar";
import { sidebarItems } from "../../constants/constants";
import { useState } from "react";

function Navbar() {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	const onOpenSidebar = () => {
		setIsOpenSidebar(true);
	};

	const onCloseSidebar = () => {
		setIsOpenSidebar(false);
	};

	return (
		<>
			<div className="nav-bar">
				<div className="nav-bar-left">
					<Logo textColor="black" />
					<SearchInput className="sp-search-input-container" />
				</div>
				<ul className="nav-items nav-bar-right">
					<li>Explore</li>
					<li>License</li>
					<button>Upload</button>
					<button className="upload-btn">
						<FiUpload />
					</button>
					<button className="sidebar-btn">
						<GiHamburgerMenu onClick={onOpenSidebar} />
					</button>
				</ul>
			</div>
			<Sidebar
				items={sidebarItems}
				closeSidebar={onCloseSidebar}
				sidebarOpen={isOpenSidebar}
			/>
		</>
	);
}
export default Navbar;

Navbar.propTypes = {
	showSearchInput: PropTypes.bool
};
