import { useCallback, useRef, useState } from "react";
import { fetchPopularVideos } from "../../services/apiService";
import { BallsLoader } from "../../components/common/loader/Loader";
import InfiniteScroll from "react-infinite-scroller";
import "./Videos.scss";
import { GoChevronDown } from "react-icons/go";
import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";

function Videos() {
	const [popularVideosInfo, setPopularVideosInfo] = useState({
		fetchedVideos: [],
		hasMore: true,
		isLoading: false
	});
	const nextPageLink = useRef(null);

	const { fetchedVideos, hasMore, isLoading } = popularVideosInfo;

	const fetchVideos = useCallback(async () => {
		try {
			setPopularVideosInfo(prev => ({ ...prev, isLoading: true }));
			const response = await fetchPopularVideos(nextPageLink.current);
			const { videos, next_page } = await response;
			if (!nextPageLink.current) {
				setPopularVideosInfo({
					fetchedVideos: [...videos],
					hasMore: !!next_page,
					isLoading: false
				});
			} else {
				setPopularVideosInfo(prev => ({
					...prev,
					fetchedVideos: [...prev.fetchedVideos, ...videos],
					hasMore: !!next_page,
					isLoading: false
				}));
			}
			nextPageLink.current = next_page;
		} catch (error) {
			console.error("Error fetching videos :", error);
		}
	}, []);

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchVideos();
		}
	}, [isLoading, hasMore, fetchVideos]);

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
				loadMore={loadMore}
				hasMore={hasMore}
				loader={<BallsLoader />}
				threshold={400}>
				<Gallery
					allFetchedVideos={fetchedVideos}
					fetchVideos={fetchVideos}
					type={MediaType.videos}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default Videos;
