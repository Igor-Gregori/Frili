import { ToastProvider } from 'react-toast-notifications';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )
}

export default MyApp
