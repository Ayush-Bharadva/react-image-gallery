import { useState, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GoChevronDown } from "react-icons/go";
import "./Home.scss";
import { fetchCuratedPhotos } from "../../services/api-services";
import { BallsLoader } from "../../components/common/loader/Loader";
import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";
// import useFetchData from "../../hooks/useFetchData";

function Home() {

	// const { data: fetchedPhotos, hasMore, fetchData, loadMore } =
	// 	useFetchData({
	// 		fetchFunction: fetchCuratedPhotos, initialData: [], type: MediaType.photos
	// 	});

	const [curatedImagesInfo, setCuratedImagesInfo] = useState({
		fetchedPhotos: [],
		hasMore: true,
		isLoading: false
	});
	const nextPageLink = useRef(null);

	const { fetchedPhotos, hasMore, isLoading } = curatedImagesInfo;

	const fetchPhotos = useCallback(async () => {
		try {
			setCuratedImagesInfo(prev => ({ ...prev, isLoading: true }));
			const { photos, next_page } = await fetchCuratedPhotos(nextPageLink.current);

			if (!nextPageLink.current) {
				setCuratedImagesInfo({
					fetchedPhotos: [...photos],
					isLoading: false,
					hasMore: !!next_page
				});
			} else {
				setCuratedImagesInfo(prev => ({
					...prev,
					fetchedPhotos: [...prev.fetchedPhotos, ...photos],
					isLoading: false,
					hasMore: !!next_page
				}));
			}
			nextPageLink.current = next_page;
		} catch (error) {
			console.error("Error fetching images:", error);
		}
	}, []);

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchPhotos();
		}
	}, [isLoading, hasMore, fetchPhotos]);

	return (
		<div className="home-container">
			<div className="heading">
				<h4>Free Stock Photos</h4>
				<button>
					Trending <GoChevronDown />
				</button>
			</div>
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={loadMore}
				hasMore={hasMore}
				loader={<BallsLoader />}>
				<Gallery
					allFetchedImages={fetchedPhotos}
					fetchImages={fetchPhotos}
					type={MediaType.photos}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default Home;
