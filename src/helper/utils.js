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

export function onDownloadVideo(videoLink) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", videoLink, true);
	xhr.responseType = "blob";
	xhr.onload = function () {
		let urlCreator = window.URL || window.webkitURL;
		let videoUrl = urlCreator.createObjectURL(this.response);
		let tag = document.createElement("a");
		tag.href = videoUrl;
		tag.download = "your-video.mp4";
		document.body.appendChild(tag);
		tag.click();
		document.body.removeChild(tag);
	};
	xhr.onerror = err => {
		err;
	};
	xhr.send();
}

export const onCopyToClipBoard = ({ target: { innerText: text } }) => {
	try {
		navigator.clipboard.writeText(text);
	} catch (error) {
		console.error("Error copying to clipboard:", error);
	}
};
