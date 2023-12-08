import Router from './shared/Router';
import {__getFix} from './redux/modules/Detail';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useDispatch} from 'react-redux';
import useEffect from '@testing-library/user-event';
const qureryClient = new QueryClient();

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(__getFix());
  // }, []);
  return (
    <>
      <Router />
      <ToastContainer />
    </>
    // <QueryClientProvider client={qureryClient}>
    // </QueryClientProvider>
  );
}

export default App;
