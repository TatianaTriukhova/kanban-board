import '../styles/globals.css';
import { AppProps } from 'next/app';
import Modal from 'react-modal';
import { AuthProvider } from '../hooks/useAuth';
import { SocketContextProvider } from '../hooks/useSocket';

Modal.setAppElement('.app-wrapper');

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <div className="app-wrapper">
      <AuthProvider>
        <SocketContextProvider>
          <Component {...pageProps} />
        </SocketContextProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
