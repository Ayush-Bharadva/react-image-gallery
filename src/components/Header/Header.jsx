import { useRef, useContext, useState, useEffect } from "react";
// import NavBar from "../NavBar/NavBar";
import { AiOutlineClose } from "react-icons/ai";
import { SearchContext } from "../../context/SearchProvider";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import pexelsLogo from "../../assets/images/pexels-logo.jpg";
import SearchInput from "../Common/SearchInput";
import "./Header.scss";

function Header() {
	const sidebarRef = useRef();
	// const searchInputRef = useRef();
	const navbarRef = useRef();
	const navigate = useNavigate();
	const { onSetQuery } = useContext(SearchContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [searchString, setSearchString] = useState("");

	const onSearchStringChange = ({ target: { value } }) => {
		setSearchString(value);
	};

	function handleScroll() {
		const isScrolled = window.scrollY >= 600;
		setShowSearchInput(isScrolled);
		navbarRef.current.className = `main-nav-bar ${isScrolled ? "fixed-nav" : "absolute-nav"}`;

		if (window.scrollY >= 600) {
			// console.log("scrolled :", window.scrollY);
			setShowSearchInput(true);
			navbarRef.current.className = "main-nav-bar fixed-nav";
		} else {
			setShowSearchInput(false);
			navbarRef.current.className = "main-nav-bar absolute-nav";
		}
	}
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
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
		onSetQuery(searchString);
		navigate(`search/${searchString}`);
	};

	return (
		<>
			<div
				className="main-nav-bar absolute-nav"
				ref={navbarRef}>
				<div className="left">
					<div className="logo">
						<img
							src={pexelsLogo}
							alt="pexels logo"
						/>
						<span>Pexels</span>
					</div>

					{showSearchInput && (
						<SearchInput
							searchString={searchString}
							onChange={onSearchStringChange}
							onSubmit={onSubmitSearch}
						/>
					)}
				</div>
				<div className="right">
					<ul className="nav-items">
						<li>Explore</li>
						<li>License</li>
						<li>
							<button className="upload-btn">Upload</button>
						</li>
						<li>
							<button className="sidebar-btn">
								<GiHamburgerMenu onClick={toggleSidebar} />
							</button>
						</li>
					</ul>
				</div>
			</div>
			<header className="main-header">
				<div className="hero">
					<h1 className="heading">
						The best free stock photos, royalty free images & videos shared by creators
					</h1>
					<SearchInput
						style={{ margin: "15px 0 0 0" }}
						searchString={searchString}
						onChange={onSearchStringChange}
						onSubmit={onSubmitSearch}
					/>
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
