import { useRef, useContext, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
// import NavBar from "../NavBar/NavBar";
import { AiOutlineClose } from "react-icons/ai";
import { SearchContext } from "../../context/searchContext";
import { useNavigate } from "react-router-dom";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import pexelsLogo from "../../assets/images/pexels-logo.jpg";
import "./Header.scss";

function Header() {
	const sidebarRef = useRef();
	const searchInputRef = useRef();
	const navbarRef = useRef();
	const navigate = useNavigate();
	const { onSetQuery } = useContext(SearchContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY >= 600) {
				console.log("scrolled :", window.scrollY);
				navbarRef.current.className = "nav-bar fixed-nav";
			} else {
				navbarRef.current.className = "nav-bar absolute-nav";
			}
		});
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(prev => !prev);
		setSidebarWidth();
	};

	const setSidebarWidth = () => {
		const width = sidebarOpen ? "275px" : "0";
		sidebarRef.current.style.width = width;
	};

	const onSubmitSearch = event => {
		event.preventDefault();
		const searchQuery = searchInputRef.current.value;
		// console.log("searching for :", searchQuery);
		onSetQuery(searchQuery);
		navigate(`search/${searchQuery}`);
	};

	return (
		<>
			<div
				className="nav-bar absolute-nav"
				ref={navbarRef}>
				<div className="logo">
					<img
						src={pexelsLogo}
						alt="pexels logo"
					/>
					<span>Pexels</span>
				</div>
				<div className="search-input-container">
					<button className="option-btn">
						{" "}
						<HiOutlinePhotograph style={{ fontSize: "1.25rem" }} /> Photos{" "}
						<GoChevronDown style={{ fontSize: "1rem" }} />
					</button>
					<form onSubmit={onSubmitSearch}>
						<input
							type="text"
							ref={searchInputRef}
							placeholder="Search for free photos"
						/>
						<button className="search-icon-btn">
							<CiSearch />
						</button>
					</form>
				</div>
				<ul className="nav-items">
					<li>Explore</li>
					<li>License</li>
					<li>
						<button>Upload</button>
					</li>
					<li>
						<button className="sidebar-btn">
							<GiHamburgerMenu onClick={toggleSidebar} />
						</button>
					</li>
				</ul>
			</div>
			<header className="main-header">
				<div className="hero">
					<h1>The best free stock photos, royalty free images & videos shared by creators</h1>
					<div className="search-input-container">
						<button className="option-btn">
							{" "}
							<HiOutlinePhotograph style={{ fontSize: "1.25rem" }} /> Photos{" "}
							<GoChevronDown style={{ fontSize: "1rem" }} />
						</button>
						<form onSubmit={onSubmitSearch}>
							<input
								type="text"
								ref={searchInputRef}
								placeholder="Search for free photos"
							/>
							<button className="search-icon-btn">
								<CiSearch />
							</button>
						</form>
					</div>
				</div>
			</header>
			{sidebarOpen && (
				<div
					id="sidebar-container"
					ref={sidebarRef}>
					<button
						className="close-icon-btn"
						onClick={toggleSidebar}>
						<AiOutlineClose />
					</button>
					<button>Home</button>
					<button>Discover Photos</button>
					<button>Popular Searches</button>
					<button>Free Videos</button>
					<button>Challenges</button>
					<button>Leaderboard</button>
					<button>Pexels Blog</button>
				</div>
			)}
		</>
	);
}

export default Header;
