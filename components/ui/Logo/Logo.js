// Imports
import Breadcrumbs from '../Breadcrumb';
import styles from './Logo.module.sass';

// Component
const Logo = () => {
    return (
        <div className={styles.breadcrumbs}>
            <span>J&ouml;rgen Krieger</span>
            <Breadcrumbs />
        </div>
    );
};

// Export
export default Logo;
