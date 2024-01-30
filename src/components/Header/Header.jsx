import { useRef, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SearchInput from "../../common/searchinput/SearchInput";
import "./Header.scss";
import Logo from "./Logo";
import Sidebar from "../../common/sidebar/Sidebar";

function Header() {
	const sidebarRef = useRef();
	const navbarRef = useRef();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [showSearchInput, setShowSearchInput] = useState(false);

	function handleScroll() {
		const isScrolled = window.scrollY >= 600;
		setShowSearchInput(isScrolled);
		navbarRef.current.className = `main-nav-bar ${
			isScrolled ? "fixed-nav" : "absolute-nav"
		}`;
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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
			<div className="main-nav-bar absolute-nav" ref={navbarRef}>
				<div className="left">
					<Logo />
					{showSearchInput && (
						<SearchInput className="sp-search-input-container" />
					)}
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
							<GiHamburgerMenu onClick={toggleSidebar} />
						</button>
					</ul>
				</div>
			</div>

			<header className="main-header">
				<div className="hero">
					<h1 className="heading">
						The best free stock photos, royalty free images & videos
						shared by creators
					</h1>
					<SearchInput style={{ margin: "15px 0 0 0" }} />
				</div>
			</header>
			{sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
		</>
	);
}

export default Header;
