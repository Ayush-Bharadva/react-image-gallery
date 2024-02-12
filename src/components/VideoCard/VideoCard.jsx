import { PropTypes } from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoBookmarksOutline } from "react-icons/io5";
import "./videoCard.scss";
import { useEffect, useRef, useState } from "react";

function VideoCard({ video, onVideoSelect }) {
	const [isHovering, setIsHovering] = useState(false);
	const videoRef = useRef();

	const videoFile = video.video_files.at(-1);

	useEffect(() => {
		if (isHovering && videoRef.current) {
			videoRef.current.play();
		} else {
			videoRef.current.pause();
		}
	}, [isHovering]);

	return (
		<div
			className="main-video-container"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			key={video.id}>
			<video
				ref={videoRef}
				className="video-card"
				onClick={onVideoSelect}
				playsInline
				muted>
				{video && (
					<source
						src={videoFile.link}
						type={videoFile.file_type}
					/>
				)}
			</video>
			<div className="icons-group">
				<button className="bookmark-icon">
					<IoBookmarksOutline />
				</button>
				<button className="heart-icon">
					<FaRegHeart />
				</button>
			</div>
			<button className="download-icon">
				<FiDownload /> Download
			</button>
		</div>
	);
}

export default VideoCard;

VideoCard.propTypes = {
	video: PropTypes.object,
	onVideoSelect: PropTypes.func
};
