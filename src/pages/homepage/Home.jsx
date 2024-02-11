import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { computeColumnsFromWidth } from "../../helper/helper";
import { calculateColumns } from "../../helper/helper";
import ImageGallery from "../../common/imagegallery/ImageGallery";
import { GoChevronDown } from "react-icons/go";
import "./Home.scss";
import { fetchCuratedImages } from "../../services/services";
import { BallsLoader } from "../../components/loader/Loader";
import { curatedImgUrl } from "../../constants/constants";

function Home() {
	const [curatedImagesInfo, setCuratedImagesInfo] = useState({
		fetchedImages: [],
		nextPageUrl: curatedImgUrl,
		hasMore: true,
		isLoading: false,
	});
	const [columnCount, setColumnCount] = useState(1);

	const { fetchedImages, nextPageUrl, hasMore, isLoading } = curatedImagesInfo;

	const computeColumns = () => {
		const columnsCount = calculateColumns();
		setColumnCount(columnsCount);
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setCuratedImagesInfo((prev) => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchCuratedImages(nextPageUrl);
				setCuratedImagesInfo((prev) => ({
					...prev,
					fetchedImages: [...prev.fetchedImages, ...photos],
					nextPageUrl: next_page,
					isLoading: false,
					hasMore: !!next_page,
				}));
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		}
	}, [isLoading, nextPageUrl, hasMore]);

	useEffect(() => {
		computeColumns();
		window.addEventListener("resize", computeColumns);
		return () => {
			window.removeEventListener("resize", computeColumns);
		};
	}, []);

	const computedImageColumns = computeColumnsFromWidth(fetchedImages, columnCount);

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
				threshold={400}>
				<ImageGallery allImages={computedImageColumns} allFetchedImages={fetchedImages} fetchImages={fetchImages} />
			</InfiniteScroll>
		</div>
	);
}

export default Home;
