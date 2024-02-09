import { PropTypes } from "prop-types"
import ImageCard from "../components/ImageCard/ImageCard"
import VideoCard from "../components/VideoCard/VideoCard"
import { useEffect, useRef } from "react"

function RenderColumn({ column, allItems, onImageSelect, fetchImages, isVideo }) {
	const columnRef = useRef()

	useEffect(() => {
		function handleScroll() {
			if (columnRef.current && columnRef.current.clientHeight < window.scrollY) {
				fetchImages()
			}
		}

		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("scroll", handleScroll)
		}
	}, [fetchImages])

	return (
		<div ref={columnRef} className={`col-${column}`}>
			{allItems[`column${column}`].map((item, index) => {
				return isVideo ? (
					<VideoCard key={item.id} video={item} />
				) : (
					<ImageCard key={item.id} image={item} index={index} column={column} onImageClick={onImageSelect} />
				)
			})}
		</div>
	)
}

export default RenderColumn

RenderColumn.propTypes = {
	column: PropTypes.number,
	allItems: PropTypes.shape({
		column1: PropTypes.arrayOf(PropTypes.object),
		column2: PropTypes.arrayOf(PropTypes.object),
		column3: PropTypes.arrayOf(PropTypes.object),
	}),
	onImageSelect: PropTypes.func,
	fetchImages: PropTypes.func,
	isVideo: PropTypes.bool,
}
