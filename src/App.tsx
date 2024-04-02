import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Router from './components/Router';
import { useEffect, useState } from 'react';
import { app } from './firebaseApp';
import Loader from './components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';

function App() {

  const [init, setInit] = useState<boolean>(false);

  const auth = getAuth(app);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      } setInit(true);
    })
  }, [auth])

  return (

    <div>
      <RecoilRoot>
        <ToastContainer />
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </RecoilRoot>
    </div>

  );
}

export default App;
