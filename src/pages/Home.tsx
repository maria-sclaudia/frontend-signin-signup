import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/pages/home.css';
import isConnected from '../utils/isConnected';

function Home() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if(!isConnected)
      setRedirect(true)
  });

  async function Logout() {
    localStorage.removeItem('@access');
    window.location.reload();
  }

  return (
    <div className="container-home">
      { redirect && <Redirect to="/" /> }
      <h1>Que bom que você chegou até aqui!!</h1>
      <button type="button" onClick={Logout}>SAIR</button>
    </div>
  );
}

export default Home;