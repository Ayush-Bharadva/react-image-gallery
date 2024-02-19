import { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Search.scss";
import InfiniteScroll from "react-infinite-scroller";
import Gallery from "../../components/gallery/Gallery";
import { fetchSearchedImages } from "../../services/api-services";
import { MediaType } from "../../utils/constants";
import { BallsLoader } from "../../components/common/loader/Loader";
import RelatedCategories from "../../components/common/related-categories/RelatedCategories";
import Header from "../../components/common/header/Header";
// import useFetchData from "../../hooks/useFetchData";

function Search() {

	const location = useLocation();
	const searchQuery = location.pathname.split("/").at(-1);

	// const { data: fetchedPhotos, hasMore, fetchData, loadMore } =
	// 	useFetchData({
	// 		fetchFunction: () => fetchSearchedImages(searchQuery), initialData: [], type: MediaType.photos
	// 	});

	const [searchState, setSearchState] = useState({
		fetchedPhotos: [],
		hasMore: true,
		isLoading: false
	});
	const nextPageLink = useRef(null);

	const { fetchedPhotos, isLoading, hasMore } = searchState;

	const fetchPhotos = useCallback(async () => {
		try {
			setSearchState(prev => ({ ...prev, isLoading: true }));
			const { photos, next_page } = await fetchSearchedImages(searchQuery, nextPageLink.current);
			if (!nextPageLink.current) {
				setSearchState({
					fetchedPhotos: [...photos],
					hasMore: !!next_page,
					isLoading: false
				});
			} else {
				setSearchState(prev => ({
					...prev,
					fetchedPhotos: [...prev.fetchedPhotos, ...photos],
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
			fetchedPhotos: [],
			hasMore: true,
			isLoading: false
		})
		nextPageLink.current = null
	}, [location.pathname]);

	useEffect(() => {
		if (!fetchedPhotos.length && !isLoading && hasMore) {
			fetchPhotos();
		}
	}, [fetchedPhotos, isLoading, hasMore, fetchPhotos]);

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchPhotos();
		}
	}, [isLoading, hasMore, fetchPhotos]);

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
					allFetchedImages={fetchedPhotos}
					fetchImages={fetchPhotos}
					type={MediaType.photos} />
			</InfiniteScroll>
			{!fetchedPhotos.length ? <h1>No images found for {searchQuery + '..'}</h1> : null}
		</div>
	);
}

export default Search;
