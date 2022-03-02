// Libaries
import { H } from 'react-headings';
import { StructuredText } from 'react-datocms';
import classNames from 'classnames/bind';
import styles from './TextRecord.module.sass';

// Prepare classes
let cx = classNames.bind(styles);

// Component
const TextRecord = ({ data }) => {
    return (
        <section
            className={cx('container', 'content', 'content-text', {
                'align-right': data.textAlignRight,
            })}
        >
            <div>
                {data.title && <H className="h3">{data.title}</H>}
                <StructuredText data={data.content} />
            </div>
        </section>
    );
};

// Export
export default TextRecord;
