// components/Gallery.tsx
import Image from 'next/image'

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          আমাদের আমের গ্যালারী
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={`/images/gallery/${index + 1}.jpg`}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
