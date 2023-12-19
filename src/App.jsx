import ScrollToTop from '@/base-components/scroll-to-top/Main';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from './context/AuthContext';
import Router from './router';
// import { DataProvider } from './context/ApiCall';
import { ApiDataProvider } from './context/ApiDataContext';
// import { DataStateProvider } from './context/SelectedIdContext';
// import { SelectedIdProvider } from './context/SelectedIdContext';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider>
          <ApiDataProvider>
            <Router />
            <ScrollToTop />
          </ApiDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
