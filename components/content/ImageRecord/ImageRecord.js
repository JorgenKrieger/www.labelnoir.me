// Libaries
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ImageRecord.module.sass';

// Prepare classes
let cx = classNames.bind(styles);

// Component
const ImageRecord = ({ data }) => {
    return (
        <figure className={cx('container', 'content', 'content-image')} tabIndex="0">
            <Image
                alt={data.image.alt}
                height={data.image.responsiveImage.height}
                width={data.image.responsiveImage.width}
                src={data.image.responsiveImage.src}
                placeholder="blur"
                blurDataURL={data.image.blurUpThumb}
                objectFit={data.imageSize}
                objectPosition="center"
                layout="responsive"
            />
            <figcaption>{data.image.title}</figcaption>
        </figure>
    );
};

// Export
export default ImageRecord;
