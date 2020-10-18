import '../styles/globals.css';
import { AppProps } from 'next/app';
import { DBContextProvider } from '../hooks/useDB';
import Modal from 'react-modal';
import { AuthProvider } from '../hooks/useAuth';
import { SocketContextProvider } from '../hooks/useSocket';

Modal.setAppElement('.app-wrapper');

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <div className="app-wrapper">
      <AuthProvider>
        <DBContextProvider>
          <SocketContextProvider>
            <Component {...pageProps} />
          </SocketContextProvider>
        </DBContextProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
