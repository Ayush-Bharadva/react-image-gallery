import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { computeColumnsFromWidth } from "../../helper/helper";
import { calculateColumns } from "../../helper/helper";
import ImageGallery from "../../components/Common/Imagegallery/ImageGallery";
import { GoChevronDown } from "react-icons/go";
import "./HomePage.scss";
import { fetchCuratedImages } from "../../services/services";
/*
import Modal from "../../components/Common/modal/Modal";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { GrTumblr } from "react-icons/gr";
*/
// import Photo from "../photo/Photo";
// import "../../styles/Global.scss";

const curatedImgUrl = "https://api.pexels.com/v1/curated";

function HomePage() {
	const [fetchedImagesState, setFetchedImagesState] = useState({
		fetchedImages: [],
		nextPageUrl: curatedImgUrl,
		hasMore: true,
		isLoading: false,
	});
	const [columnCount, setColumnCount] = useState(1);
	// const modalRef = useRef();

	const { fetchedImages, nextPageUrl, hasMore, isLoading } = fetchedImagesState;

	const computeColumns = () => {
		const columnsCount = calculateColumns();
		setColumnCount(columnsCount);
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setFetchedImagesState(prev => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchCuratedImages(nextPageUrl);
				// console.log(photos, next_page);
				setFetchedImagesState(prev => ({
					...prev,
					fetchedImages: [...prev.fetchedImages, ...photos],
					nextPageUrl: next_page,
					isLoading: false,
					hasMore: !!next_page,
				}));
			} catch (error) {
				throw new Error(error);
			}
		}
	}, [isLoading, nextPageUrl, hasMore]);

	const computedImageColumns = computeColumnsFromWidth(fetchedImages, columnCount);

	useEffect(() => {
		computeColumns();
		window.addEventListener("resize", computeColumns);
		return () => {
			window.removeEventListener("resize", computeColumns);
		};
	}, []);

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
				threshold={400}>
				<ImageGallery allImages={computedImageColumns} />
			</InfiniteScroll>
			{/* <Modal ref={modalRef}>
				<div className="social-share-modal flex-column-center">
					<h1 className="modal-title">Share this with Your Community</h1>
					<div className="social-icons-container">
						<menu>
							<li className="social-icon pinterest-icon-bg">
								<FaPinterest className="pinterest-icon-color" />
							</li>
							<li className="social-icon twitter-icon-bg">
								<FaTwitter className="twitter-icon-color" />
							</li>
							<li className="social-icon linkedin-icon-bg">
								<FaLinkedinIn className="linkedin-icon-color" />
							</li>
							<li className="social-icon facebook-icon-bg">
								<ImFacebook2 className="facebook-icon-color" />
							</li>
							<li className="social-icon tumbler-icon-bg">
								<GrTumblr className="tumbler-icon-color" />
							</li>
						</menu>
					</div>
					<div className="social-link">
						<p>Set a link back to this photo</p>
						<button className="link-btn flex-row-center">
							<span>Photo by Kaboompics.com from Pexels</span>
							<span>
								<MdOutlineContentCopy />
							</span>
						</button>
					</div>
				</div>
			</Modal> */}
			{/* <Photo /> */}
		</div>
	);
}

export default HomePage;
