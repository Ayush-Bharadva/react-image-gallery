import { useCallback, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import useModal from "../../hooks/useModal";
import { arrangeImagesIntoColumns, calculateColumns } from "../../utils/helper";
import RenderColumn from "./RenderColumn";
import MediaModal from "../common/modal/MediaModal";

function Gallery({ mediaList, type }) {

	// const [columnCount, setColumnCount] = useState(1);
	const [containerWidth, setContainerWidth] = useState(0);
	const [allColumns, setAllColumns] = useState([[], [], []])
	const [selectedMedia, setSelectedMedia] = useState({});

	const { isShowing: showMediaModal, toggle: toggleMediaModal } = useModal();
	const galleryElement = useRef();

	let columns = 1;

	useEffect(() => {
		let animationFrameId = null;

		const observer = new ResizeObserver(entries => {

			const newWidth = Math.floor(entries[0].contentRect.width);
			if (containerWidth !== newWidth) {
				animationFrameId = window.requestAnimationFrame(() => {
					setContainerWidth(newWidth);
				});
			}
		});
		observer.observe(galleryElement.current);

		return () => {
			observer.disconnect();
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [containerWidth]);

	useEffect(() => {
		if (showMediaModal) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showMediaModal]);

	columns = calculateColumns(containerWidth);

	useEffect(() => {
		// console.log('recalculating');
		const [column1, column2, column3] = arrangeImagesIntoColumns(containerWidth, columns, mediaList);
		setAllColumns([column1, column2, column3]);
	}, [mediaList, columns, containerWidth])

	const onSelectMedia = useCallback((media) => {
		if (media) {
			setSelectedMedia(media);
			toggleMediaModal();
		}
	}, [setSelectedMedia, toggleMediaModal]);

	const handleMediaNavigation = useCallback((currentMedia, direction) => {
		const currentMediaIndex = mediaList.findIndex(media => media.id === currentMedia.id);
		const newMedia = mediaList[currentMediaIndex + direction];
		if (newMedia) {
			setSelectedMedia(newMedia);
		}
	}, [mediaList, setSelectedMedia]);

	return (
		<>
			<div
				ref={galleryElement}
				className="gallery-container">
				{
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
				}
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
	mediaList: [],
}

Gallery.propTypes = {
	mediaList: PropTypes.array,
	type: PropTypes.string
};