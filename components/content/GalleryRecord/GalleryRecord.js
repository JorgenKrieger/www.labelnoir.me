// Libraries
import Image from 'next/image';
import classnames from 'classnames/bind';
import styles from './GalleryRecord.module.sass';

// Prepare classes
let cx = classnames.bind(styles);

// Component
const GalleryRecord = ({ data }) => {
    return (
        <div
            className={cx('container', 'content', 'content-gallery')}
            style={{ '--images': data.images.length > 4 ? 4 : data.images.length }}
            tabIndex="0"
        >
            {data.images.map((image, index) => (
                <figure key={index} className={cx('image')} tabIndex="0">
                    <Image
                        alt={image.alt}
                        height={image.responsiveImage.height}
                        width={image.responsiveImage.width}
                        src={image.responsiveImage.src}
                        placeholder="blur"
                        blurDataURL={image.blurUpThumb}
                        objectFit="cover"
                        objectPosition="center"
                    />
                    <figcaption>{image.title}</figcaption>
                </figure>
            ))}
        </div>
    );
};

// Export
export default GalleryRecord;
