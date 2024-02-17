import { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Search.scss";
import InfiniteScroll from "react-infinite-scroller";
import Gallery from "../../components/gallery/Gallery";
import { fetchSearchedImages } from "../../services/apiService";
import { MediaType, SidebarItems } from "../../utils/constants";
// import Navbar from "../../components/common/navbar/Navbar";
import { BallsLoader } from "../../components/common/loader/Loader";
import Logo from "../../components/common/header/Logo";
import SearchInput from "../../components/common/search-input/SearchInput";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { FiUpload } from "react-icons/fi";
import RelatedCategories from "../../components/common/related-categories/RelatedCategories";

function Search() {

	// const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;
	const searchQuery = currentPath.split("/").at(-1);

	const [searchState, setSearchState] = useState({
		fetchedImages: [],
		hasMore: true,
		isLoading: false
	});

	const nextPageLink = useRef(null);
	const { fetchedImages, isLoading, hasMore } = searchState;

	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	const toggleSidebar = () => setIsOpenSidebar(prev => !prev);

	const fetchImages = useCallback(async () => {
		try {
			setSearchState(prev => ({ ...prev, isLoading: true }));
			const { photos, next_page } = await fetchSearchedImages(searchQuery, nextPageLink.current);
			console.log(nextPageLink.current)
			if (!nextPageLink.current) {
				setSearchState({
					fetchedImages: [...photos],
					hasMore: !!next_page,
					isLoading: false
				});
			} else {
				setSearchState(prev => ({
					...prev,
					fetchedImages: [...prev.fetchedImages, ...photos],
					hasMore: !!next_page,
					isLoading: false
				}));
			}
			nextPageLink.current = next_page;
		} catch (error) {
			console.error(error);
		}
	}, [searchQuery]);

	useEffect(() => {
		setSearchState({
			fetchedImages: [],
			hasMore: true,
			isLoading: false
		})
		nextPageLink.current = null
	}, [location.pathname, fetchImages])

	useEffect(() => {
		if (!fetchedImages.length && !isLoading && hasMore) {
			fetchImages()
		}
	}, [fetchedImages, isLoading, hasMore, fetchImages])

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchImages();
		}
	}, [isLoading, hasMore, fetchImages]);

	return (
		<div className="search-images-container">
			<>
				<div className="nav-bar">
					<div className="nav-bar-left">
						<Logo textColor="black" />
						<SearchInput searchQuery={searchQuery} />
					</div>
					<ul className="nav-items nav-bar-right">
						<li>Explore</li>
						<li>License</li>
						<button>Upload</button>
						<button className="upload-btn">
							<FiUpload />
						</button>
						<button className="sidebar-btn">
							<GiHamburgerMenu onClick={toggleSidebar} />
						</button>
					</ul>
				</div>
				<Sidebar
					items={SidebarItems}
					closeSidebar={toggleSidebar}
					sidebarOpen={isOpenSidebar}
				/>
			</>
			<RelatedCategories />
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={loadMore}
				hasMore={hasMore}
				loader={<BallsLoader />}
				isInitialLoad={false}
				threshold={400}>
				{console.info('fetchedImages-ser :', fetchedImages)}
				<Gallery
					allFetchedImages={fetchedImages}
					type={MediaType.photos} />
			</InfiniteScroll>
			{!fetchedImages.length ? <h1>No images found for {searchQuery + '..'}</h1> : null}
		</div>
	);
}

export default Search;
