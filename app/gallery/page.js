"use client";

import { useState } from "react";
import Image from "next/image";
import { photos } from "@/lib/photos";

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-accent mb-3">Gallery</h1>
        <p className="text-muted">Photos from a life well lived.</p>
      </div>

      {photos.length === 0 ? (
        <div className="text-center border border-dashed border-border rounded-2xl py-16 px-6 text-muted">
          <p className="mb-2 text-2xl">📷</p>
          <p>
            Photos will appear here soon. To add them, drop image files into{" "}
            <code className="bg-accent-soft px-1.5 py-0.5 rounded">
              public/images/gallery/
            </code>{" "}
            and list them in{" "}
            <code className="bg-accent-soft px-1.5 py-0.5 rounded">lib/photos.js</code>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setLightbox(photo)}
              className="relative aspect-square rounded-lg overflow-hidden border border-border group"
            >
              <Image
                src={photo.src}
                alt={photo.caption || ""}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <Image
                src={lightbox.src}
                alt={lightbox.caption || ""}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {lightbox.caption && (
              <p className="text-white text-center mt-4">{lightbox.caption}</p>
            )}
            <button
              className="block mx-auto mt-4 text-white/70 hover:text-white text-sm"
              onClick={() => setLightbox(null)}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
