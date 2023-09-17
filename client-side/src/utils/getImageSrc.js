export default function getImageSrc(imagePath) {
  return `/uploads/${imagePath.split("uploads\\")[1]}`;
}
