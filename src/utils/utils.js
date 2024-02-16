export async function downloadMedia(mediaSrc, downloadName = "media") {
  try {
    const response = await fetch(mediaSrc);
    const blobResponse = await response.blob();
    const mediaUrl = URL.createObjectURL(blobResponse);

    const anchor = document.createElement("a");
    anchor.href = mediaUrl;
    anchor.download = downloadName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(mediaUrl);
  } catch (error) {
    console.error("downloading error:", error);
  }
}

export const onCopyToClipBoard = ({ target: { innerText: text } }) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  }
};
