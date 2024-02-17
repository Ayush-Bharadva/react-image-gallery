import { useState } from "react";
// import { PropTypes } from "prop-types";
import "./Navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SearchInput from "../search-input/SearchInput";
import Logo from "../header/Logo";
import "../header/Header.scss";
import Sidebar from "../sidebar/Sidebar";
import { SidebarItems } from "../../../utils/constants";

function Navbar() {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	const onOpenSidebar = () => setIsOpenSidebar(true);
	const onCloseSidebar = () => setIsOpenSidebar(false);

	return (
		<>
			<div className="nav-bar">
				<div className="nav-bar-left">
					<Logo textColor="black" />
					<SearchInput />
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
				items={SidebarItems}
				closeSidebar={onCloseSidebar}
				sidebarOpen={isOpenSidebar}
			/>
		</>
	);
}
export default Navbar;

// Navbar.propTypes = {
// 	searchedString: PropTypes.string
// };
