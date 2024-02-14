import { PropTypes } from "prop-types";
import RenderColumn from "../RenderColumn";
import useModal from "../../../hooks/useModal";
import { useCallback, useContext, useEffect, useState } from "react";
import VideoModal from "../modal/VideoModal";
import { MainContext } from "../../../context/MainProvider";
import { calculateColumns, computeColumnsFromWidth } from "../../../helper/helper";

function VideoGallery({ allFetchedVideos, fetchVideos }) {
	// const { column1, column2, column3 } = allVideos;

	const { isShowing: showVideoModal, toggle: toggleVideoModal } = useModal();

	const { setModalVideo } = useContext(MainContext);

	const [columnCount, setColumnCount] = useState(1);

	const computeColumns = () => {
		const columnsCount = calculateColumns();
		setColumnCount(columnsCount);
	};

	useEffect(() => {
		computeColumns();
		window.addEventListener("resize", computeColumns);
		return () => {
			window.removeEventListener("resize", computeColumns);
		};
	}, []);

	const computedVideoColumns = computeColumnsFromWidth(allFetchedVideos, columnCount);

	const { column1, column2, column3 } = computedVideoColumns;

	useEffect(() => {
		if (showVideoModal) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showVideoModal]);

	const onSelectVideo = videoId => {
		const videoSelected = allFetchedVideos.find(video => video.id === videoId);
		setModalVideo(videoSelected);
		toggleVideoModal();
	};

	const handleVideoNavigation = useCallback(
		(currentId, dir) => {
			const currentVideoIndex = allFetchedVideos.findIndex(video => video.id === currentId);
			const newVideo = allFetchedVideos.at(currentVideoIndex + dir);
			setModalVideo(newVideo);
		},
		[allFetchedVideos, setModalVideo]
	);

	return (
		<>
			<div className="video-gallery-container">
				{column1 && (
					<RenderColumn
						column={1}
						allMediaItems={column1}
						onSelectVideo={onSelectVideo}
						fetchVideos={fetchVideos}
						isVideo
					/>
				)}
				{column2 && (
					<RenderColumn
						column={2}
						allMediaItems={column2}
						onSelectVideo={onSelectVideo}
						fetchVideos={fetchVideos}
						isVideo
					/>
				)}
				{column3 && (
					<RenderColumn
						column={3}
						allMediaItems={column3}
						onSelectVideo={onSelectVideo}
						fetchVideos={fetchVideos}
						isVideo
					/>
				)}
			</div>
			{showVideoModal && (
				<VideoModal
					isShowing={showVideoModal}
					hide={toggleVideoModal}
					handleVideoNavigation={handleVideoNavigation}
				/>
			)}
		</>
	);
}

export default VideoGallery;

VideoGallery.propTypes = {
	allFetchedVideos: PropTypes.array,
	fetchVideos: PropTypes.func
};
