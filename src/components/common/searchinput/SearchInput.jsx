import { PropTypes } from "prop-types";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import "./SearchInput.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../../context/MainProvider";
import { RiVideoLine } from "react-icons/ri";
import SearchDropdown from "./SearchDropdown";

function SearchInput({ className, props }) {
	const navigate = useNavigate();
	const { setQuery, query } = useContext(MainContext);
	// console.log("search Query :", query);
	const ddRef = useRef();

	const [searchString, setSearchString] = useState(query || "");
	const [searchHistory, setSearchHistory] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		const currentSearchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
		setSearchHistory(currentSearchHistory);
	}, []);

	useEffect(() => {
		function handleClick(e) {
			e.stopPropagation();
			if (!ddRef.current || !ddRef.current.contains(e.target)) {
				setShowDropdown(false);
			}
		}
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const onSearchFocus = isTrue => {
		setShowDropdown(isTrue);
	};

	const onChange = ({ target: { value } }) => {
		setSearchString(value);
	};

	const clearSearchHistory = () => {
		localStorage.setItem("search-history", JSON.stringify([]));
		setSearchHistory([]);
	};

	const updateSearchHistory = searchItem => {
		const prevSearchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
		if (!prevSearchHistory.includes(searchItem)) {
			setSearchHistory(prev => ({ searchItem, ...prev }));
			localStorage.setItem("search-history", JSON.stringify([searchItem, ...prevSearchHistory]));
		}
	};

	const handleSearchSelect = buttonText => {
		updateSearchHistory(buttonText);
		setSearchString("");
		setQuery(buttonText);
		navigate(`/search/${buttonText}`);
	};

	const onSubmitSearch = event => {
		event.preventDefault();
		if (!searchString.trim()) {
			return;
		}
		handleSearchSelect(searchString);
	};

	return (
		<div
			ref={ddRef}
			className={`search-input-container ${className}`}
			{...props}>
			<button className="option-btn">
				<HiOutlinePhotograph /> <span>Photos</span> <GoChevronDown />
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
				onSubmit={onSubmitSearch}
				className="search-input">
				<input
					id="search"
					type="text"
					title={searchString}
					value={searchString}
					onChange={onChange}
					onFocus={() => onSearchFocus(true)}
					autoComplete="off"
					placeholder="Search for free photos"
				/>
				<button
					type="button"
					className="search-icon-btn">
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
	searchString: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	className: PropTypes.string,
	props: PropTypes.object
};

export default SearchInput;
