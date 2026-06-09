import image1 from '../assets/image1.webp';
import image2 from '../assets/image2.webp';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.webp';
import { Translation } from '../data/translations';

const galleryImages = [image1, image2, image3, image4];

type GalleryProps = {
  t: Translation['gallery'];
};

function Gallery({ t }: GalleryProps) {
  const titleParts = t.title.split(' ');
  const highlight = titleParts.pop();

  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <h2 className="section-title" id="gallery-title">
          {titleParts.join(' ')} <span>{highlight}</span>
        </h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <figure className="gallery-item" key={image}>
              <img src={image} alt={`${t.alt} ${index + 1}`} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
