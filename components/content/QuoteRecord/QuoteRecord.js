// Libaries
import classNames from 'classnames/bind';
import styles from './QuoteRecord.module.sass';

// Prepare classes
let cx = classNames.bind(styles);

// Component
const QuoteRecord = ({ data }) => {
    return (
        <blockquote className={cx('container', 'content', 'content-quote')} tabIndex="0">
            {data.blockquote}
        </blockquote>
    );
};

// Export
export default QuoteRecord;
