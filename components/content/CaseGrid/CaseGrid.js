// Libraries
import classNames from 'classnames/bind';
import styles from './CaseGrid.module.sass';
import { CaseTile } from '..';

// Prepare classes
let cx = classNames.bind(styles);

// Component
const CaseGrid = ({ projects, children }) => {
    return (
        <div className={cx('container', 'cases')}>
            {children}
            <div className={cx('grid')}>
                {projects.map((project) => (
                    <CaseTile key={project.slug} {...project} />
                ))}
            </div>
        </div>
    );
};

// Export
export default CaseGrid;
