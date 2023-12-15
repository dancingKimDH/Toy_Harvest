import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Router from './components/Router';
import { useEffect, useState } from 'react';
import { app } from './firebaseApp';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';

function App() {

  const [init, setInit] = useState<boolean>(false);

  const auth = getAuth(app);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      } setInit(true);
    })
  }, [auth])

  return (

    <div>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated}/> : <Loader /> }
    </div>

  );
}

export default App;
