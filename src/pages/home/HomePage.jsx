import { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-css";
import { fetchImagesData } from "../../services/services";
import Image from "../../components/Image/Image";
import "./HomePage.scss";

const imgUrl = "https://api.pexels.com/v1/search/?page=1&query=nature";

function HomePage() {
	const [images, setImages] = useState([]);
	const [nextPageUrl, setNextPageUrl] = useState(imgUrl);
	const [isLoading, setIsLoading] = useState(false);

	const fetchImages = useCallback(async () => {
		if (!isLoading) {
			try {
				setIsLoading(true);
				const { photos, next_page } = await fetchImagesData(
					nextPageUrl
				);
				console.log(photos, next_page);
				setImages((prevPhotos) => [...prevPhotos, ...photos]);
				setNextPageUrl(next_page);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
	}, [isLoading, nextPageUrl]);

	console.log(images.length);
	const hasMore = !!nextPageUrl;
	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	const breakPointts = {
		default: 3,
		1100: 2,
		700: 1,
	};

	return (
		<div className="main-container">
			<InfiniteScroll
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
			>
				{images.length && (
					<ul>
						<Masonry
							breakpointCols={breakPointts}
							className="masonry-grid"
							columnClassName="masonry-grid-column"
						>
							{images.map((image, index) => (
								// <li key={`${image.id}-${index}`}>
								<Image
									key={`${image.id}-${index}`}
									imgSrc={image.src.large}
									altText={image.alt}
								/>
								// </li>
							))}
						</Masonry>
					</ul>
				)}
			</InfiniteScroll>
		</div>
	);
}

export default HomePage;
