export async function onDownloadImage(imageSrc, downloadName = "image.jpeg") {
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
}
