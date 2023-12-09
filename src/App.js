import Router from './shared/Router';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
