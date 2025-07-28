import '../styles/globals.css';
import '../styles/components/layout.css';
import '../styles/components/navbar.css';
import '../styles/components/sidebar.css';
import '../styles/components/dashboard.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;