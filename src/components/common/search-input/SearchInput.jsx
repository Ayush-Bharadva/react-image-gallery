import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import "./SearchInput.scss";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import { RiVideoLine } from "react-icons/ri";
import SearchDropdown from "./SearchDropdown";

function SearchInput({ searchQuery }) {

	const navigate = useNavigate();
	const dropdownRef = useRef();

	const [searchString, setSearchString] = useState(searchQuery);
	const [searchHistory, setSearchHistory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("Photos");
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		setSearchString(searchQuery);
	}, [searchQuery])

	useEffect(() => {
		const currentSearchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
		setSearchHistory(currentSearchHistory);
	}, []);

	useEffect(() => {
		function handleClick(event) {
			event.stopPropagation();
			if (!dropdownRef.current || !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		}
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const handleSearchFocus = () => setShowDropdown(true);
	const onChange = ({ target: { value } }) => setSearchString(value);

	const clearSearchHistory = () => {
		localStorage.setItem("search-history", JSON.stringify([]));
		setSearchHistory([]);
	};

	const updateSearchHistory = searchItem => {
		if (!searchHistory.includes(searchItem)) {
			setSearchHistory(prev => ([searchItem, ...prev]));
			localStorage.setItem("search-history", JSON.stringify([searchItem, ...searchHistory]));
		}
	};

	const handleSearchSelect = buttonText => {
		updateSearchHistory(buttonText);
		setShowDropdown(false);
		navigate(`/search/${buttonText}`);
	};

	const searchImages = () => {
		if (searchString.trim()) {
			updateSearchHistory(searchString);
			setShowDropdown(false);
			navigate(`/search/${searchString}`);
		}
	}

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			searchImages();
		}
	}

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	}

	return (
		<div
			ref={dropdownRef}
			className={`search-input-container`}>
			<button className="option-btn">
				<HiOutlinePhotograph /> <span className="button-text" >{selectedCategory}</span> <GoChevronDown />
				<div className="button-options">
					<button type="button" onClick={() => handleCategorySelect("Photos")}>
						<HiOutlinePhotograph /> <span>Photos</span>
					</button>
					<button type="button" onClick={() => handleCategorySelect("Videos")}>
						<RiVideoLine /> <span>Videos</span>
					</button>
				</div>
			</button>
			<form
				className="search-field">
				<input
					id="search"
					type="text"
					title={searchString}
					value={searchString}
					onChange={onChange}
					onFocus={handleSearchFocus}
					onKeyDown={handleKeyDown}
					autoComplete="off"
					placeholder="Search for free photos"
				/>
				<button
					type="button"
					className="search-icon-btn"
					onClick={searchImages}
				>
					<CiSearch />
				</button>
			</form>
			{showDropdown ? (
				<SearchDropdown
					searchHistory={searchHistory}
					clearSearchHistory={clearSearchHistory}
					handleSelect={handleSearchSelect}
				/>
			) : null}
		</div>
	);
}

SearchInput.propTypes = {
	searchQuery: PropTypes.string,
};

export default SearchInput;
