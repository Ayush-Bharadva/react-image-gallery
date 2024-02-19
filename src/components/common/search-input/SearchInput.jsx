import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import "./SearchInput.scss";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import { RiVideoLine } from "react-icons/ri";
import SearchDropdown from "./SearchDropdown";

function SearchInput({ className, searchQuery = '' }) {

	const navigate = useNavigate();
	const dropdownRef = useRef();

	const [searchString, setSearchString] = useState(searchQuery);
	const [searchHistory, setSearchHistory] = useState([]);
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

	const onSearchFocus = isTrue => setShowDropdown(isTrue);
	const onChange = ({ target: { value } }) => setSearchString(value);

	const clearSearchHistory = () => {
		localStorage.setItem("search-history", JSON.stringify([]));
		setSearchHistory([]);
	};

	const updateSearchHistory = searchItem => {
		const prevSearchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
		if (!prevSearchHistory.includes(searchItem)) {
			setSearchHistory(prev => ([searchItem, ...prev]));
			localStorage.setItem("search-history", JSON.stringify([searchItem, ...prevSearchHistory]));
		}
	};

	const handleSearchSelect = buttonText => {
		updateSearchHistory(buttonText);
		setSearchString("");
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

	return (
		<div
			ref={dropdownRef}
			className={`search-input-container ${className || ""}`}>
			<button className="option-btn">
				<HiOutlinePhotograph /> <span className="button-text" >Photos</span> <GoChevronDown />
				<div className="button-options">
					<button type="button">
						<HiOutlinePhotograph /> <span>Photos</span>
					</button>
					<button type="button">
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
					onFocus={() => onSearchFocus(true)}
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
	className: PropTypes.string
};

export default SearchInput;
