import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { SearchContext } from "../context/searchContext";
import {
	computeColumnsFromWidth,
	fetchSearchedImages,
} from "../services/services";
import InfiniteScroll from "react-infinite-scroller";
import ImageGallery from "../components/Common/ImageGallery";
import pexelsLogo from "../assets/images/pexels-logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "../styles/Global.scss";
import "./SearchPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Global.scss";

function SearchPage() {
	const loc = useLocation();

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false,
	});
	const { query, onSetQuery } = useContext(SearchContext);
	useEffect(() => {
		const temp = loc.pathname.split("/");
		onSetQuery(temp[temp.length - 1]);
	}, []);
	// const [searchQuery, setSearchQuery] = useState(query);
	const [columns, setColumns] = useState(1);
	const searchInputRef = useRef();

	const navigate = useNavigate();
	console.log("ctx query :", query); // example "cars"

	const { searchedImagesInfo, nextPageLink, isLoading, hasMore } =
		searchState;

	const calculateColumns = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth >= 300 && windowWidth < 700) {
			setColumns(1);
		} else if (windowWidth >= 700 && windowWidth < 1100) {
			setColumns(2);
		} else {
			setColumns(3);
		}
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore && query !== "") {
			try {
				setSearchState((prev) => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchSearchedImages(
					query,
					nextPageLink
				);
				setSearchState((prev) => ({
					...prev,
					searchedImagesInfo: [...prev.searchedImagesInfo, ...photos],
					hasMore: !!next_page,
					nextPageLink: next_page,
					isLoading: false,
				}));
			} catch (error) {
				console.error(error);
			}
		}
	}, [nextPageLink, isLoading, hasMore, query]);

	const computedLayoutColumns = computeColumnsFromWidth(
		searchedImagesInfo,
		columns
	);
	// console.log(computedLayoutColumns);

	const onSubmitSearch = (event) => {
		event.preventDefault();
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		const query = searchInputRef.current.value;
		navigate("/search/" + query);
		onSetQuery(query);
	};

	useEffect(() => {
		calculateColumns();
		window.addEventListener("resize", calculateColumns);
		return () => {
			window.removeEventListener("resize", calculateColumns);
		};
	}, []);

	const relatedCategories = [
		"people",
		"nature",
		"funny",
		"art",
		"dice",
		"abstract",
		"background",
		"photo",
		"design",
		"dark",
		"business",
	];

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	const categoriesRef = useRef();
	const translateLeft = () => {
		categoriesRef.current.className += " translateLeft";
	};
	const translateRight = () => {
		categoriesRef.current.className += " translateRight";
	};

	return (
		<>
			<div id="search-images-container">
				<div className="nav-bar">
					<div className="logo">
						<img src={pexelsLogo} alt="pexels logo" />
					</div>
					<div className="search-input-container">
						<button className="option-btn">Photos</button>
						<form onSubmit={onSubmitSearch}>
							<input
								type="text"
								ref={searchInputRef}
								// value={searchQuery}
								// onChange={onQueryChange}
								placeholder="Search for free photos"
							/>
							<button className="search-icon-btn">
								<CiSearch />
							</button>
						</form>
					</div>
					<ul className="nav-items">
						<li>Explore</li>
						<li>License</li>
						<li>
							<button>Upload</button>
						</li>
						<li>
							<button className="sidebar-btn">
								<GiHamburgerMenu />
							</button>
						</li>
					</ul>
				</div>
				<div className="related-categories" ref={categoriesRef}>
					<FaAngleLeft onClick={translateLeft} />
					{relatedCategories.map((category, index) => (
						<li key={index}>
							<button>{category}</button>
						</li>
					))}
					<FaAngleRight onClick={translateRight} />
				</div>
				<InfiniteScroll
					loadMore={fetchImages}
					hasMore={hasMore}
					loader={loader}
				>
					<ImageGallery
						key={Math.random().toString}
						allImages={computedLayoutColumns}
					/>
				</InfiniteScroll>
			</div>
		</>
	);
}

export default SearchPage;
