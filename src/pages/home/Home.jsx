import { useState, useCallback } from "react";
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
		nextPageUrl: '',
		hasMore: true,
		isLoading: false
	});

	const { fetchedImages, nextPageUrl, hasMore, isLoading } = curatedImagesInfo;

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setCuratedImagesInfo(prev => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchCuratedPhotos(nextPageUrl);
				setCuratedImagesInfo(prev => ({
					...prev,
					fetchedImages: [...prev.fetchedImages, ...photos],
					nextPageUrl: next_page,
					isLoading: false,
					hasMore: !!next_page
				}));
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		}
	}, [isLoading, nextPageUrl, hasMore]);

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
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={<BallsLoader />}
				threshold={300}>
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
