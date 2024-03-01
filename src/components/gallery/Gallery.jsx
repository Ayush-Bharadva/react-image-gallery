import { useCallback, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import useModal from "../../hooks/useModal";
import { arrangeImagesIntoColumns, calculateColumns } from "../../utils/helper";
import RenderColumn from "./RenderColumn";
import MediaModal from "../common/modal/MediaModal";

function Gallery({ mediaList, type }) {

	const [columnCount, setColumnCount] = useState(1);
	const [containerWidth, setContainerWidth] = useState(0);
	const [allColumns, setAllColumns] = useState([[], [], []])
	const [selectedMedia, setSelectedMedia] = useState({});

	const { isShowing: showMediaModal, toggle: toggleMediaModal } = useModal();
	const galleryElement = useRef();

	const updateColumnCount = useCallback((newColumnCount, newContainerWidth) => {
		setColumnCount(prevColumnCount => {
			if (prevColumnCount !== newColumnCount) {
				setContainerWidth(newContainerWidth);
				return newColumnCount;
			}
			return prevColumnCount;
		});
	}, []);

	useEffect(() => {

		const observer = new ResizeObserver(entries => {
			const newWidth = Math.floor(entries[0].contentRect.width);
			const newColumnCount = calculateColumns(newWidth);
			updateColumnCount(newColumnCount, newWidth);
		});
		observer.observe(galleryElement.current);

		return () => {
			observer.disconnect();
		};
	}, [updateColumnCount]);

	useEffect(() => {
		if (mediaList.length > 0) {
			const [column1, column2, column3] = arrangeImagesIntoColumns(containerWidth, columnCount, mediaList);
			setAllColumns([column1, column2, column3]);
		}
	}, [mediaList, columnCount, containerWidth])

	const onSelectMedia = useCallback((media) => {
		if (media) {
			setSelectedMedia(media);
			toggleMediaModal();
		}
	}, [setSelectedMedia, toggleMediaModal]);

	const handleMediaNavigation = useCallback((mediaIndex) => {
		const newMedia = mediaList[mediaIndex];
		if (newMedia) {
			setSelectedMedia({ ...newMedia, index: mediaIndex });
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
									key={`${column.length}-${index}`}
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
				closeModal={toggleMediaModal}
				selectedMedia={selectedMedia}
				handleMediaNavigate={handleMediaNavigation}
				type={type}
				mediaListLength={mediaList.length}
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