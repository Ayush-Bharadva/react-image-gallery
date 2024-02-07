import { PropTypes } from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoBookmarksOutline } from "react-icons/io5";
import "./videoCard.scss";

function VideoCard({ video }) {
	const videoFile = video.video_files[1];

	return (
		<div
			className="main-video-container"
			key={video.id}>
			<video
				className="video-card"
				playsInline
				muted
				autoPlay
				loop>
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
	video: PropTypes.object
};
