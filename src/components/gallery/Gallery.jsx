import { useCallback, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import useModal from "../../hooks/useModal";
import { arrangeImagesIntoColumns, calculateColumns } from "../../utils/helper";
import RenderColumn from "./RenderColumn";
import MediaModal from "../common/modal/MediaModal";

function Gallery({ fetchedMedia, type }) {

	const [containerWidth, setContainerWidth] = useState(0);
	const [columnCount, setColumnCount] = useState(1);
	const [allColumns, setAllColumns] = useState([[], [], []])
	const [selectedMedia, setSelectedMedia] = useState({});

	const { isShowing: showMediaModal, toggle: toggleMediaModal } = useModal();
	const galleryElement = useRef();

	useEffect(() => {
		let animationFrameId = null;

		const observer = new ResizeObserver(entries => {
			const newWidth = Math.floor(entries[0].contentRect.width);
			const newColumnCount = calculateColumns(newWidth);
			setColumnCount(prev => {
				if (newColumnCount !== prev) {
					setContainerWidth((prevContainerWidth) => {
						if (prevContainerWidth !== newWidth) {
							animationFrameId = window.requestAnimationFrame(() => {
								setContainerWidth(newWidth);
							});
						}
					});
					return newColumnCount;
				}
				return prev;
			});
		});
		observer.observe(galleryElement.current);

		return () => {
			observer.disconnect();
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

	useEffect(() => {
		if (showMediaModal) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showMediaModal]);

	useEffect(() => {
		const [column1, column2, column3] = arrangeImagesIntoColumns(containerWidth, columnCount, fetchedMedia);
		setAllColumns([column1, column2, column3]);
	}, [fetchedMedia, columnCount, containerWidth])

	const onSelectMedia = useCallback((mediaId) => {
		const selectedMedia = fetchedMedia.find(media => media.id === mediaId);
		if (selectedMedia) {
			setSelectedMedia(selectedMedia);
			toggleMediaModal();
		}
	}, [fetchedMedia, setSelectedMedia, toggleMediaModal]);

	const handleMediaNavigation = useCallback((currentMediaId, direction) => {
		const currentMediaIndex = fetchedMedia.findIndex(media => media.id === currentMediaId);
		const newMedia = fetchedMedia.at(currentMediaIndex + direction);
		if (newMedia) {
			setSelectedMedia(newMedia);
		}
	}, [fetchedMedia]);

	// console.log('allColumns:', allColumns);

	return (
		<>
			<div
				ref={galleryElement}
				className="gallery-container">
				{/* {
					allColumns.map((column, index) => {
						if (column.length > 0) {
							return (
								<RenderColumn
									key={index}
									allMediaItems={column}
									onMediaSelect={onSelectMedia}
									type={type}
								/>
							);
						}
					})
				} */}
				{!!allColumns[0].length && (
					<RenderColumn
						allMediaItems={allColumns[0]}
						onMediaSelect={onSelectMedia}
						type={type}
					/>
				)}
				{!!allColumns[1].length && (
					<RenderColumn
						allMediaItems={allColumns[1]}
						onMediaSelect={onSelectMedia}
						type={type}
					/>
				)}
				{!!allColumns[2].length && (
					<RenderColumn
						allMediaItems={allColumns[2]}
						onMediaSelect={onSelectMedia}
						type={type}
					/>
				)}
			</div>
			{showMediaModal && <MediaModal
				isShowing={showMediaModal}
				hide={toggleMediaModal}
				selectedMedia={selectedMedia}
				handleMediaNavigate={handleMediaNavigation}
				type={type}
			/>}
		</>
	);
}

export default Gallery;

Gallery.defaultProps = {
	allFetchedImages: [],
	allFetchedVideos: []
}

Gallery.propTypes = {
	fetchedMedia: PropTypes.array,
	type: PropTypes.string
};