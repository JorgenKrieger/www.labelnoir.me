import '../styles/globals.sass';
import { Navigation, Footer } from '../components/ui';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Navigation />
            <main id="main" tabIndex="-1">
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
};

export default MyApp;
