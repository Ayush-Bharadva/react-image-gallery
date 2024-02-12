export async function onDownloadImage(imageSrc, downloadName = "image.jpeg") {
	try {
		const response = await fetch(imageSrc);
		const blobImage = await response.blob();
		const href = URL.createObjectURL(blobImage);

		const anchor = document.createElement("a");
		anchor.href = href;
		anchor.download = downloadName;

		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		URL.revokeObjectURL(href);
	} catch (error) {
		console.error("Error downloading image:", error);
	}
}

export async function onDownloadVideo(videoLink) {
	try {
		const response = await fetch(videoLink);
		const blobVideo = await response.blob();
		const videoUrl = URL.createObjectURL(blobVideo);

		const anchor = document.createElement("a");
		anchor.href = videoUrl;
		anchor.download = "video.mp4";

		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		URL.revokeObjectURL(videoUrl);
	} catch (error) {
		console.error("Error downloading video:", error);
	}
}

export const onCopyToClipBoard = ({ target: { innerText: text } }) => {
	try {
		navigator.clipboard.writeText(text);
	} catch (error) {
		console.error("Error copying to clipboard:", error);
	}
};
