// components/Gallery.tsx
import Image from 'next/image'
import g1 from '../assets/images/1.jpg'
import g2 from '../assets/images/2.jpg'
import g3 from '../assets/images/3.jpg'


export default function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          আমাদের আমের গ্যালারী
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3  gap-2 md:gap-4">
            <div  className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={g1}
                alt={`Gallery 1`}
                fill
                className="object-cover"
              />
            </div>
            <div  className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={g2}
                alt={`Gallery 1`}
                fill
                className="object-cover"
              />
            </div>
            <div  className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={g3}
                alt={`Gallery 1`}
                fill
                className="object-cover"
              />
            </div>
            <div  className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={g1}
                alt={`Gallery 1`}
                fill
                className="object-cover"
              />
            </div>
            <div  className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={g1}
                alt={`Gallery 1`}
                fill
                className="object-cover"
              />
            </div>
            <div  className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={g1}
                alt={`Gallery 1`}
                fill
                className="object-cover"
              />
            </div>

            
        </div>
      </div>
    </section>
  )
}

