import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/searchContext";
import { computeColumnsFromWidth, fetchSearchedImages } from "../services/services";
import InfiniteScroll from "react-infinite-scroller";
import ImageGallery from "../components/Common/ImageGallery";
import pexelsLogo from "../assets/images/pexels-logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { relatedCategories } from "../helper/constants";
import { calculateColumns } from "../helper/helper";
import "../styles/Global.scss";
import "./SearchPage.scss";

function SearchPage() {
	const location = useLocation();
	const pathname = location.pathname;
	const navigate = useNavigate();
	const { query, onSetQuery } = useContext(SearchContext);

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false,
	});
	const [columns, setColumns] = useState(1);
	const searchInputRef = useRef();
	// console.log("ctx query :", query);

	const { searchedImagesInfo, nextPageLink, isLoading, hasMore } = searchState;

	const onSetPrevQuery = useCallback(() => {
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		const temp = pathname.split("/");
		const prevQuery = temp[temp.length - 1];
		searchInputRef.current.value = prevQuery;
		// console.log("prevQuery :", prevQuery);
		onSetQuery(prevQuery);
	}, [pathname, onSetQuery]);

	const computeColumns = () => {
		const columnCount = calculateColumns();
		setColumns(columnCount);
	};

	const fetchImages = useCallback(async () => {
		// console.log("fetchImages cb :", query, isLoading, hasMore);
		if (!isLoading && hasMore) {
			try {
				setSearchState(prev => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchSearchedImages(query, nextPageLink);
				setSearchState(prev => ({
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
	}, [query, isLoading, hasMore, nextPageLink]);

	useEffect(() => {
		onSetPrevQuery();
	}, [onSetPrevQuery]);

	useEffect(() => {
		computeColumns();
		window.addEventListener("resize", computeColumns);
		return () => {
			window.removeEventListener("resize", computeColumns);
		};
	}, []);

	const computedLayoutColumns = computeColumnsFromWidth(searchedImagesInfo, columns);
	// console.log(computedLayoutColumns);

	const onSubmitSearch = event => {
		event.preventDefault();
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		const newQuery = searchInputRef.current.value;
		// console.log(!newQuery.trim());
		if (!newQuery.trim()) {
			navigate("/");
			return;
		}
		onSetQuery(newQuery);
		navigate(`/search/${newQuery}`);
	};

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	const onNavigateToHome = () => {
		navigate("/", { replace: true });
	};

	/*
	const categoriesRef = useRef();
	const translateLeft = () => {
		categoriesRef.current.className += " translateLeft";
	};
	const translateRight = () => {
		categoriesRef.current.className += " translateRight";
	};
	*/

	return (
		<>
			<div id="search-images-container">
				<div className="nav-bar">
					<div
						className="logo"
						onClick={onNavigateToHome}>
						<img
							src={pexelsLogo}
							alt="pexels logo"
						/>
						<span>Pexels</span>
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
				<div className="related-categories">
					<FaAngleLeft />
					{relatedCategories.map((category, index) => (
						<li key={index}>
							<button>{category}</button>
						</li>
					))}
					<FaAngleRight />
				</div>
				<InfiniteScroll
					loadMore={fetchImages}
					hasMore={hasMore}
					loader={loader}>
					<ImageGallery
						allImages={computedLayoutColumns}
						// key={}
					/>
				</InfiniteScroll>
			</div>
		</>
	);
}

export default SearchPage;
