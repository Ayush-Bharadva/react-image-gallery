import { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Search.scss";
import InfiniteScroll from "react-infinite-scroller";
import Gallery from "../../components/gallery/Gallery";
import { fetchSearchedImages } from "../../services/apiService";
import { MediaType } from "../../utils/constants";
import { BallsLoader } from "../../components/common/loader/Loader";
import RelatedCategories from "../../components/common/related-categories/RelatedCategories";
import Header from "../../components/common/header/Header";

function Search() {

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

	const fetchImages = useCallback(async () => {
		try {
			setSearchState(prev => ({ ...prev, isLoading: true }));
			const { photos, next_page } = await fetchSearchedImages(searchQuery, nextPageLink.current);
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
	}, [location.pathname]);

	useEffect(() => {
		if (!fetchedImages.length && !isLoading && hasMore) {
			fetchImages();
		}
	}, [fetchedImages, isLoading, hasMore, fetchImages]);

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchImages();
		}
	}, [isLoading, hasMore, fetchImages]);

	return (
		<div className="search-images-container">
			<Header searchQuery={searchQuery} isSearchPage />
			<RelatedCategories />
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={loadMore}
				hasMore={hasMore}
				loader={<BallsLoader />}
				isInitialLoad={false}
				threshold={400}>
				<Gallery
					allFetchedImages={fetchedImages}
					type={MediaType.photos} />
			</InfiniteScroll>
			{!fetchedImages.length ? <h1>No images found for {searchQuery + '..'}</h1> : null}
		</div>
	);
}

export default Search;
