import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import "./SearchInput.scss";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import { RiVideoLine } from "react-icons/ri";
import SearchDropdown from "./SearchDropdown";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const SearchInput = () => {

	const navigate = useNavigate();
	const dropdownRef = useRef();
	const { query } = useParams();

	const [searchString, setSearchString] = useState(query);
	const [selectedCategory, setSelectedCategory] = useState("photos");
	const [showDropdown, setShowDropdown] = useState(false);
	const [searchHistory, setSearchHistory] = useLocalStorage("search-history",[]);

	useEffect(() => {
		setSearchString(query);
	}, [query])

	useEffect(() => {
		const handleClick = event => {
			event.stopPropagation();
			if (dropdownRef.current && (!dropdownRef.current || !dropdownRef.current.contains(event.target))) {
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
		setSearchHistory([]);
	};

	const updateSearchHistory = searchItem => {
		if (!searchHistory.includes(searchItem)) {
			setSearchHistory(prev => {
				console.log(searchItem)
				return [searchItem, ...prev];
			});
		}
	};

	const handleSearch = (searchValue) => {
		console.log('hit',searchValue)
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
			<div className="option-btn">
				<HiOutlinePhotograph /> <span className="button-text" >{selectedCategory}</span> <GoChevronDown />
				<div className="button-options">
					<button type="button" onClick={() => handleCategorySelect("photos")}>
						<HiOutlinePhotograph /> <span>photos</span>
					</button>
					<button type="button" onClick={() => handleCategorySelect("videos")}>
						<RiVideoLine /> <span>videos</span>
					</button>
				</div>
			</div>
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
