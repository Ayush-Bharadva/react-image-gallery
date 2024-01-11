import { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import NavBar from "../NavBar/NavBar";
import { AiOutlineClose } from "react-icons/ai";
import "./Header.scss";
import { fetchSearchedImages } from "../../services/services";

function Header() {
	const [searchQuery, setSearchQuery] = useState("");

	const onQueryChange = ({ target: { value } }) => {
		setSearchQuery(value);
	};

	const sidebarRef = useRef();

	const onCloseSidebar = () => {
		sidebarRef.current.style.width = "0";
	};

	const onSidebarOpen = () => {
		sidebarRef.current.style.width = "275px";
	};

	return (
		<>
			<header className="main-header">
				<NavBar onSidebarOpen={onSidebarOpen} />
				<div className="hero">
					<h1>The best free stock photos, royalty free images & videos shared by creators</h1>
					<div className="search-input-container">
						<button className="option-btn">Photos</button>
						<form onSubmit={() => fetchSearchedImages(searchQuery)}>
							<input
								type="text"
								value={searchQuery}
								onChange={onQueryChange}
								placeholder="Search for free photos"
							/>
							<button className="search-icon-btn">
								<CiSearch />
							</button>
						</form>
					</div>
				</div>
			</header>
			<div
				id="sidebar-container"
				ref={sidebarRef}>
				<button className="close-icon-btn">
					<AiOutlineClose onClick={onCloseSidebar} />
				</button>
				<button>Home</button>
				<button>Discover Photos</button>
				<button>Popular Searches</button>
				<button>Free Videos</button>
				<button>Challenges</button>
				<button>Leaderboard</button>
				<button>Pexels Blog</button>
			</div>
		</>
	);
}

export default Header;
