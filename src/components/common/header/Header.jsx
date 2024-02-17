import { useState, useEffect, useCallback } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SearchInput from "../search-input/SearchInput";
import "./Header.scss";
import { SidebarItems } from "../../../utils/constants";
import Sidebar from "../sidebar/Sidebar";
import Logo from "./Logo";

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

	const onOpenSidebar = () => setIsOpenSidebar(true);
	const onCloseSidebar = () => setIsOpenSidebar(false);

	return (
		<>
			<div className={`main-nav-bar ${isScrolled ? "fixed-nav" : "absolute-nav"}`}>
				<div className="left">
					<Logo />
					{isScrolled && <SearchInput />}
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
					<SearchInput className="flex-0" />
				</div>
			</header>
			<Sidebar
				items={SidebarItems}
				closeSidebar={onCloseSidebar}
				sidebarOpen={isOpenSidebar}
			/>
		</>
	);
}

export default Header;
