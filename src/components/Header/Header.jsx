import { useRef, useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import NavBar from "../NavBar/NavBar";
import { AiOutlineClose } from "react-icons/ai";
import "./Header.scss";
import { SearchContext } from "../../context/searchContext";
import { useNavigate } from "react-router-dom";

function Header() {
	const sidebarRef = useRef();
	const searchInputRef = useRef();
	const navigate = useNavigate();
	const { onSetQuery } = useContext(SearchContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);

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
		console.log("searching for :", searchQuery);
		onSetQuery(searchQuery);
		navigate(`search/${searchQuery}`);
	};

	return (
		<>
			<header className="main-header">
				<NavBar onSidebarOpen={toggleSidebar} />
				<div className="hero">
					<h1>The best free stock photos, royalty free images & videos shared by creators</h1>
					<div className="search-input-container">
						<button className="option-btn">Photos</button>
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
