import GalleryGrid from "@/components/GalleryGrid";
import { getPhotos } from "@/lib/photos";

export default function Gallery() {
  const photos = getPhotos();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-accent mb-3">Gallery</h1>
        <p className="text-muted">Photos from a life well lived.</p>
      </div>

      <GalleryGrid photos={photos} />
    </div>
  );
}
