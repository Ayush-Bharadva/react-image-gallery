import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchProvider";
import { computeColumnsFromWidth, fetchSearchedImages } from "../services/services";
import InfiniteScroll from "react-infinite-scroller";
import ImageGallery from "../components/Common/ImageGallery";
import pexelsLogo from "../assets/images/pexels-logo.jpg";
import { relatedCategories } from "../constants/constants";
import { calculateColumns } from "../helper/helper";
import SearchInput from "../components/Common/SearchInput";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { PropTypes } from "prop-types";
import "./SearchPage.scss";
import "../styles/Global.scss";

function SearchPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname;

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false,
	});
	const [columns, setColumns] = useState(1);
	const [searchString, setSearchString] = useState("");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const { query, setQuery } = useContext(SearchContext);
	const categoriesRef = useRef();
	const sidebarRef = useRef();

	const onSearchStringChange = ({ target: { value } }) => {
		setSearchString(value);
	};

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
		setSearchString(prevQuery);
		setQuery(prevQuery);
	}, [pathname, setQuery]);

	const computeColumns = () => {
		const columnCount = calculateColumns();
		setColumns(columnCount);
	};

	const fetchImages = useCallback(async () => {
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

	const fetchCategoryImages = event => {
		const category = event.target.value;
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		setQuery(category);
		navigate(`/search/${category}`);
	};

	const computedLayoutColumns = computeColumnsFromWidth(searchedImagesInfo, columns);

	const onSubmitSearch = event => {
		event.preventDefault();
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		const newQuery = searchString;
		if (!newQuery.trim()) {
			navigate("/");
			return;
		}
		setQuery(newQuery);
		navigate(`/search/${newQuery}`);
	};

	const onScroll = scrollOffset => {
		if (categoriesRef.current) {
			// categoriesRef.current.style.transition = "scroll-left 0.5s ease-in-out";
			categoriesRef.current.scrollLeft += scrollOffset;
		}
	};

	const onNavigateToHome = () => {
		if (location.pathname === "/") {
			console.log(location.pathname);
			toggleSidebar();
		}
		navigate("/", { replace: true });
	};

	const toggleSidebar = () => {
		setSidebarOpen(prev => !prev);
		setSidebarWidth();
	};

	const setSidebarWidth = () => {
		const width = sidebarOpen ? "275px" : "0";
		sidebarRef.current.style.width = width;
	};

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div id="search-images-container">
			<CustomNavBar
				onNavigateToHome={onNavigateToHome}
				pexelsLogo={pexelsLogo}
				searchString={searchString}
				onSearchStringChange={onSearchStringChange}
				onSubmitSearch={onSubmitSearch}
				toggleSidebar={toggleSidebar}
			/>
			<RelatedCategories
				onScroll={onScroll}
				categoriesRef={categoriesRef}
				fetchCategoryImages={fetchCategoryImages}
			/>
			<InfiniteScroll
				className="infinite-scroll-container"
				key={Math.random().toString()}
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={500}>
				<ImageGallery allImages={computedLayoutColumns} />
			</InfiniteScroll>
			{sidebarOpen && (
				<div
					id="sidebar-container"
					ref={sidebarRef}>
					<button
						className="close-icon-btn"
						onClick={toggleSidebar}>
						<AiOutlineClose />
					</button>
					<button onClick={onNavigateToHome}>Home</button>
					<button>Discover Photos</button>
					<button>Popular Searches</button>
					<button>Free Videos</button>
					<button>Challenges</button>
					<button>Leaderboard</button>
					<button>Pexels Blog</button>
				</div>
			)}
		</div>
	);
}

export default SearchPage;

function CustomNavBar({
	onNavigateToHome,
	pexelsLogo,
	searchString,
	onSearchStringChange,
	onSubmitSearch,
	toggleSidebar,
}) {
	return (
		<div className="nav-bar">
			<div className="nav-bar-left">
				<div
					className="logo"
					onClick={onNavigateToHome}>
					<img
						src={pexelsLogo}
						alt="pexels logo"
					/>
					<span>Pexels</span>
				</div>
				<SearchInput
					className="sp-search-input-container"
					searchString={searchString}
					onChange={onSearchStringChange}
					onSubmit={onSubmitSearch}
				/>
			</div>
			<ul className="nav-items nav-bar-right">
				<li>Explore</li>
				<li>License</li>
				<li>
					<button>Upload</button>
				</li>
				<button className="upload-btn">
					<FiUpload />
				</button>
				<button className="sidebar-btn">
					<GiHamburgerMenu onClick={toggleSidebar} />
				</button>
			</ul>
		</div>
	);
}

CustomNavBar.propTypes = {
	onNavigateToHome: PropTypes.func,
	pexelsLogo: PropTypes.string,
	searchString: PropTypes.string,
	onSearchStringChange: PropTypes.func,
	onSubmitSearch: PropTypes.func,
	toggleSidebar: PropTypes.func,
};

function RelatedCategories({ onScroll, categoriesRef, fetchCategoryImages }) {
	return (
		<div className="related-categories-container">
			<FaAngleLeft
				className="move-left-icon"
				onClick={() => onScroll(-100)}
			/>
			<div
				className="related-categories"
				ref={categoriesRef}>
				{relatedCategories.map((category, index) => (
					<button
						key={index}
						onClick={fetchCategoryImages}
						value={category}>
						{category}
					</button>
				))}
			</div>
			<FaAngleRight
				className="move-right-icon"
				onClick={() => onScroll(100)}
			/>
		</div>
	);
}

RelatedCategories.propTypes = {
	onScroll: PropTypes.func,
	categoriesRef: PropTypes.func,
	fetchCategoryImages: PropTypes.func,
};
