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
	const [selectedCategory, setSelectedCategory] = useState("photos");
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

	const handleSearch = (searchValue) => {
		if (searchValue.trim()) {
			updateSearchHistory(searchValue);
			setShowDropdown(false);
			navigate(`/search/${searchValue.trim()}`);
		}
	}

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			handleSearch(searchString);
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
					<button type="button" onClick={() => handleCategorySelect("photos")}>
						<HiOutlinePhotograph /> <span>photos</span>
					</button>
					<button type="button" onClick={() => handleCategorySelect("videos")}>
						<RiVideoLine /> <span>videos</span>
					</button>
				</div>
			</button>
			<form className="search-field">
				<input
					id="search"
					type="text"
					title={searchString}
					value={searchString}
					onChange={onChange}
					onFocus={handleSearchFocus}
					onKeyDown={handleKeyDown}
					autoComplete="off"
					placeholder={`Search for free ${selectedCategory.toLowerCase()}`}
				/>
				<button
					type="button"
					className="search-icon-btn"
					onClick={() => handleSearch(searchString)}
				>
					<CiSearch />
				</button>
			</form>
			{showDropdown ? (
				<SearchDropdown
					searchHistory={searchHistory}
					clearSearchHistory={clearSearchHistory}
					handleSelect={handleSearch}
				/>
			) : null}
		</div>
	);
}

SearchInput.propTypes = {
	searchQuery: PropTypes.string,
};

export default SearchInput;
