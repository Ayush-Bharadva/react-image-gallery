import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { computeColumnsFromWidth } from "../../helper/helper";
import { calculateColumns } from "../../helper/helper";
import ImageGallery from "../../common/Imagegallery/ImageGallery";
import { GoChevronDown } from "react-icons/go";
import "./HomePage.scss";
import { fetchCuratedImages } from "../../services/services";
const curatedImgUrl = "https://api.pexels.com/v1/curated";

function HomePage() {
	const [fetchedImagesState, setFetchedImagesState] = useState({
		fetchedImages: [],
		nextPageUrl: curatedImgUrl,
		hasMore: true,
		isLoading: false,
	});
	const [columnCount, setColumnCount] = useState(1);

	const { fetchedImages, nextPageUrl, hasMore, isLoading } =
		fetchedImagesState;

	const computeColumns = () => {
		const columnsCount = calculateColumns();
		setColumnCount(columnsCount);
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setFetchedImagesState((prev) => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchCuratedImages(
					nextPageUrl
				);
				setFetchedImagesState((prev) => ({
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

	const computedImageColumns = computeColumnsFromWidth(
		fetchedImages,
		columnCount
	);

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div id="home-container">
			<div className="heading">
				<h1>Free Stock Photos</h1>
				<button>
					Trending <GoChevronDown />{" "}
				</button>
			</div>
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={400}
			>
				<ImageGallery allImages={computedImageColumns} />
			</InfiniteScroll>
		</div>
	);
}

export default HomePage;
