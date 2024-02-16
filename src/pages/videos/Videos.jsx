import { useCallback, useState } from "react";
import { fetchPopularVideos } from "../../services/apiService";
import { BallsLoader } from "../../components/common/loader/Loader";
import InfiniteScroll from "react-infinite-scroller";
import "./Videos.scss";
// import VideoGallery from "../../components/common/video-gallery/VideoGallery";
import { GoChevronDown } from "react-icons/go";
import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";

function Videos() {
	const [popularVideosInfo, setPopularVideosInfo] = useState({
		fetchedVideos: [],
		nextPageUrl: "",
		hasMore: true,
		isLoading: false
	});

	const { fetchedVideos, hasMore, isLoading, nextPageUrl } = popularVideosInfo;

	const fetchVideos = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setPopularVideosInfo(prev => ({ ...prev, isLoading: true }));
				const response = await fetchPopularVideos(nextPageUrl);
				const { videos, next_page } = await response;
				// console.log("fetchVideos :", videos, next_page);
				setPopularVideosInfo(prev => ({
					...prev,
					fetchedVideos: [...prev.fetchedVideos, ...videos],
					nextPageUrl: next_page,
					hasMore: !!next_page,
					isLoading: false
				}));
			} catch (error) {
				console.error("Error fetching videos :", error);
			}
		}
	}, [hasMore, isLoading, nextPageUrl]);

	return (
		<div className="videos-container">
			<div className="heading">
				<h4>Trending Free Stock Videos</h4>
				<button>
					Trending <GoChevronDown />
				</button>
			</div>
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={fetchVideos}
				hasMore={hasMore}
				loader={<BallsLoader />}
				threshold={400}>
				{/* <VideoGallery
					allFetchedVideos={fetchedVideos}
					fetchVideos={fetchVideos}
				/> */}
				<Gallery allFetchedVideos={fetchedVideos} fetchVideos={fetchVideos} type={MediaType.videos} />
			</InfiniteScroll>
		</div>
	);
}

export default Videos;
