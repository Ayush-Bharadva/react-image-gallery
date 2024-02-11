import { useCallback, useEffect, useState } from "react";
import { fetchPopularVideos } from "../../services/services";
import { BallsLoader } from "../../components/loader/Loader";
import InfiniteScroll from "react-infinite-scroller";
import "./Videos.scss";
import { calculateColumns, computeColumnsFromWidth } from "../../helper/helper";
import { GoChevronDown } from "react-icons/go";
import VideoGallery from "../../common/videogallery/VideoGallery";

function Videos() {
	const [popularVideosInfo, setPopularVideosInfo] = useState({
		fetchedVideos: [],
		nextPageUrl: "",
		hasMore: true,
		isLoading: false,
	});
	const [columnCount, setColumnCount] = useState(1);

	const computeColumns = () => {
		const columnsCount = calculateColumns();
		setColumnCount(columnsCount);
	};

	const { fetchedVideos, hasMore, isLoading, nextPageUrl } = popularVideosInfo;

	const fetchVideos = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setPopularVideosInfo((prev) => ({ ...prev, isLoading: true }));
				const response = await fetchPopularVideos(nextPageUrl);
				const { videos, next_page } = response.data;
				setPopularVideosInfo((prev) => ({
					...prev,
					fetchedVideos: [...prev.fetchedVideos, ...videos],
					nextPageUrl: next_page,
					hasMore: !!next_page,
					isLoading: false,
				}));
			} catch (error) {
				console.error("Error fetching videos :", error);
			}
		}
	}, [hasMore, isLoading, nextPageUrl]);

	useEffect(() => {
		computeColumns();
		window.addEventListener("resize", computeColumns);
		return () => {
			window.removeEventListener("resize", computeColumns);
		};
	}, []);

	const computedVideoColumns = computeColumnsFromWidth(fetchedVideos, columnCount);

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
				<VideoGallery allVideos={computedVideoColumns} allFetchedVideos={fetchedVideos} fetchVideos={fetchVideos} />
			</InfiniteScroll>
		</div>
	);
}

export default Videos;
