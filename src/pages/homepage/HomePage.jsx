import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
// import Masonry from "react-masonry-css";
import { computeColumnsFromWidth, fetchImagesData } from "../../services/services";
// import Image from "../../components/Image/Image";
import "./HomePage.scss";
import ImageGallery from "../../components/ImageGallery";
// computeColumnsFromWidth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3);

const imgUrl = "https://api.pexels.com/v1/search/?page=1&query=nature&per_page=5";

function HomePage() {
	const [allFetchedImages, setAllFetchedImages] = useState([]);
	// const [allImages, setAllImages] = useState({ column1: [], column2: [], column3: [] });
	// const [allImages, setAllImages] = useState({});
	const [nextPageUrl, setNextPageUrl] = useState(imgUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [columns, setColumns] = useState(1);

	const calculateColumns = () => {
		// console.log("calc");
		const windowWidth = window.innerWidth;
		if (windowWidth >= 300 && windowWidth < 700) {
			setColumns(1);
		} else if (windowWidth >= 700 && windowWidth < 1100) {
			setColumns(2);
		} else {
			setColumns(3);
		}
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading) {
			try {
				setIsLoading(true);
				const { photos, next_page } = await fetchImagesData(nextPageUrl);
				// console.log(photos, next_page);
				setAllFetchedImages(prev => [...prev, ...photos]);
				setNextPageUrl(next_page);
				setIsLoading(false);
			} catch (error) {
				throw new Error(error);
			}
		}
	}, [isLoading, nextPageUrl]);

	const computedImageColumns = computeColumnsFromWidth(allFetchedImages, columns);

	useEffect(() => {
		calculateColumns();
		// console.log("effect");
		window.addEventListener("resize", calculateColumns);
	}, []);

	const hasMore = !!nextPageUrl;
	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div className="home-container">
			<InfiniteScroll
				// key={Math.random.toString()}
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={400}>
				<ImageGallery
					key={Math.random().toString}
					allImages={computedImageColumns}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default HomePage;
