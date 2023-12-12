import Router from './components/Router';
import { useState } from 'react';

function App() {

  const [init, setInit] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  return (

    <div>
      <Router isAuthenticated={isAuthenticated}/>
    </div>

  );
}

export default App;
