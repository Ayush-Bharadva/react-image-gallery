import { useState, useEffect, useCallback } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SearchInput from "../common/searchinput/SearchInput";
import "./Header.scss";
import Logo from "./Logo";
import { sidebarItems } from "../../constants/constants";
import Sidebar from "../common/sidebar/Sidebar";

function Header() {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const handleScroll = useCallback(function handleScroll() {
		setIsScrolled(() => window.scrollY >= 600);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	const onOpenSidebar = () => {
		setIsOpenSidebar(true);
	};

	const onCloseSidebar = () => {
		setIsOpenSidebar(false);
	};

	return (
		<>
			<div className={`main-nav-bar ${isScrolled ? "fixed-nav" : "absolute-nav"}`}>
				<div className="left">
					<Logo />
					{isScrolled && <SearchInput className="sp-search-input-container" />}
				</div>
				<div className="right">
					<ul className="nav-items">
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
			</div>
			<header className="main-header">
				<div className="hero">
					<h1 className="heading">
						The best free stock photos, royalty free images & videos shared by creators
					</h1>
					<SearchInput />
				</div>
			</header>
			<Sidebar
				items={sidebarItems}
				closeSidebar={onCloseSidebar}
				sidebarOpen={isOpenSidebar}
			/>
		</>
	);
}

export default Header;
