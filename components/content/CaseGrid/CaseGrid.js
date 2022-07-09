// Libraries
import classNames from 'classnames/bind';
import styles from './CaseGrid.module.sass';
import { CaseTile } from '..';
import { forwardRef } from 'react';

// Prepare classes
let cx = classNames.bind(styles);

// Component
const CaseGrid = forwardRef(({ projects, children, hidden }, ref) => {
    return (
        <div ref={ref} className={cx('container', 'cases', { hidden: hidden })}>
            {children}
            <div className={cx('grid')}>
                {projects.map((project) => (
                    <CaseTile key={project.slug} {...project} />
                ))}
            </div>
        </div>
    );
});

// Export
export default CaseGrid;
