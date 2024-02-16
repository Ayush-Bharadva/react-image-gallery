import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import useModal from "../../hooks/useModal";
import { arrangeImagesIntoColumns, calculateColumns } from "../../utils/helper";
import RenderColumn from "./RenderColumn";
import MediaModal from "../common/modal/MediaModal";

function Gallery({ allFetchedImages, allFetchedVideos, type }) {
	// console.log('rerendering..')
	const [containerWidth, setContainerWidth] = useState(0);
	const [columnCount, setColumnCount] = useState(1);
	const [allColumns, setAllColumns] = useState({
		column1: [],
		column2: [],
		column3: [],
	})
	const [modalObj, setModalObj] = useState({});
	const { isShowing: showMediaModal, toggle: toggleMediaModal } = useModal();
	const galleryElement = useRef();

	const { column1, column2, column3 } = allColumns;

	useLayoutEffect(() => {
		let animationFrameId = null;

		const observer = new ResizeObserver(entries => {
			const newWidth = Math.floor(entries[0].contentRect.width);
			const newColumnCount = calculateColumns(newWidth);
			setColumnCount(prev => {
				if (newColumnCount !== prev) {
					setContainerWidth((prevContainerWidth) => {
						if (prevContainerWidth !== newWidth) {
							animationFrameId = window.requestAnimationFrame(() => {

							});
							return newWidth;
						}
						return prevContainerWidth;
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
		// console.log('column count changed..')
		const [col1, col2, col3] = arrangeImagesIntoColumns(containerWidth, columnCount, allFetchedImages || allFetchedVideos);
		setAllColumns(prev => ({ ...prev, column1: [...col1], column2: [...col2], column3: [...col3] }));
	}, [allFetchedImages, allFetchedVideos, columnCount, containerWidth])

	const onSelectImage = useCallback(
		imageId => {
			const selectedImage = allFetchedImages.find(image => image.id === imageId);
			setModalObj(selectedImage);
			toggleMediaModal();
		},
		[allFetchedImages, setModalObj, toggleMediaModal]
	);
	const onSelectVideo = useCallback(videoId => {
		const videoSelected = allFetchedVideos.find(video => video.id === videoId);
		setModalObj(videoSelected);
		toggleMediaModal();
	}, [allFetchedVideos, setModalObj, toggleMediaModal]);

	const handleMediaNavigation = useCallback((currentMediaId, direction) => {
		const currentMediaIndex = type === 'photos' ? allFetchedImages.findIndex(image => image.id === currentMediaId) : allFetchedVideos.findIndex(video => video.id === currentMediaId);
		const newMedia = type === 'photos' ? allFetchedImages.at(currentMediaIndex + direction) : allFetchedVideos.at(currentMediaIndex + direction);
		if (newMedia) {
			setModalObj(newMedia);
		}
	}, [type, allFetchedImages, allFetchedVideos]);

	return (
		<>
			<div
				ref={galleryElement}
				className="gallery-container">
				{!!column1.length && (
					<RenderColumn
						column={1}
						allMediaItems={column1}
						onImageSelect={onSelectImage}
						onVideoSelect={onSelectVideo}
						type={type}
					/>
				)}
				{!!column2.length && (
					<RenderColumn
						column={2}
						allMediaItems={column2}
						onImageSelect={onSelectImage}
						onVideoSelect={onSelectVideo}
						type={type}
					/>
				)}
				{!!column3.length && (
					<RenderColumn
						column={3}
						allMediaItems={column3}
						onImageSelect={onSelectImage}
						onVideoSelect={onSelectVideo}
						type={type}
					/>
				)}
			</div>
			{showMediaModal &&
				<MediaModal
					isShowing={showMediaModal}
					hide={toggleMediaModal}
					selectedMedia={modalObj}
					handleMediaNavigate={handleMediaNavigation}
					type={type}
				/>
			}
		</>
	);
}

export default Gallery;

Gallery.propTypes = {
	allFetchedImages: PropTypes.array,
	allFetchedVideos: PropTypes.array,
	type: PropTypes.string
};