import { useRef, useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SearchInput from "../Common/SearchInput";
import pexelsLogo from "../../assets/images/pexels-logo.jpg";
import "./Header.scss";
import "../../styles/Global.scss";

function Header() {
	const sidebarRef = useRef();
	const navbarRef = useRef();
	const navigate = useNavigate();
	const { setQuery } = useContext(SearchContext);
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
		if (searchString.trim() !== "") {
			setQuery(searchString);
			navigate(`search/${searchString}`);
		}
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
							className="sp-search-input-container"
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
					<button onClick={toggleSidebar}>Home</button>
					<button onClick={toggleSidebar}>Discover Photos</button>
					<button onClick={toggleSidebar}>Popular Searches</button>
					<button onClick={toggleSidebar}>Free Videos</button>
					<button onClick={toggleSidebar}>Challenges</button>
					<button onClick={toggleSidebar}>Leaderboard</button>
					<button onClick={toggleSidebar}>Pexels Blog</button>
				</div>
			)}
		</>
	);
}

export default Header;
