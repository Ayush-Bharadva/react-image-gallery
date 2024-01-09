import { CiSearch } from "react-icons/ci";
import "./Header.scss";
import NavBar from "../NavBar/NavBar";

function Header() {
	return (
		<header className="main-header">
			<NavBar />
			<div className="hero">
				<h1>The best free stock photos, royalty free images & videos shared by creators</h1>
				<div className="search-input-container">
					<button className="option-btn">Photos</button>
					<input
						type="text"
						placeholder="Search for free photos"
					/>
					<button className="search-icon-btn">
						<CiSearch />
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
