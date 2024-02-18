import { useState, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GoChevronDown } from "react-icons/go";
import "./Home.scss";
import { fetchCuratedPhotos } from "../../services/apiService";
import { BallsLoader } from "../../components/common/loader/Loader";
import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";

function Home() {
	const [curatedImagesInfo, setCuratedImagesInfo] = useState({
		fetchedImages: [],
		hasMore: true,
		isLoading: false
	});
	const nextPageLink = useRef(null);

	const { fetchedImages, hasMore, isLoading } = curatedImagesInfo;

	const fetchImages = useCallback(async () => {
		try {
			setCuratedImagesInfo(prev => ({ ...prev, isLoading: true }));
			const { photos, next_page } = await fetchCuratedPhotos(nextPageLink.current);

			if (!nextPageLink.current) {
				setCuratedImagesInfo({
					fetchedImages: [...photos],
					isLoading: false,
					hasMore: !!next_page
				});
			} else {
				setCuratedImagesInfo(prev => ({
					...prev,
					fetchedImages: [...prev.fetchedImages, ...photos],
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
			fetchImages();
		}
	}, [isLoading, hasMore, fetchImages]);

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
					allFetchedImages={fetchedImages}
					fetchImages={fetchImages}
					type={MediaType.photos}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default Home;
