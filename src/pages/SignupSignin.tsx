import { useState, FormEvent }  from 'react';
import { MdEmail, MdLock, MdPermIdentity, MdRecentActors } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import api from '../services/api';
import '../styles/pages/signupsignin.css';

function Signin() {
  const history = useHistory();

  const [signinSignup, setSigninSignup] = useState('sign-in');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      name,
      email,
      password,
      cpf
    }

    await api
      .post('register', data)
      .then(response => {
        console.log(response.data);
        alert('Cadastro realizado com sucesso!!');
        sendMail()
        history.push("/home");
      })
      .catch((err) => {
        if(err.response.data.error !== undefined)
          return alert(err.response.data.error);
        else
          return alert(err.response.data);
    });
  }

  async function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();

    const data = {
      email: emailLogin,
      password: passwordLogin
    }

    await api
      .post('login', data)
      .then(response => {
        history.push("/home");
        saveAccess();
      })
      .catch((err) => {
        return alert(err.response.data.error);
    });
  }

  async function sendMail() {
    const data = {
      email,
      notify_id: 3
    }

    await api
      .post('sendmail', data)
      .then(response => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
    });
  }

  async function saveAccess() {
    localStorage.setItem('@access', emailLogin);
    window.location.reload();
  }
  
  return(
    <div id="container-signin" className={signinSignup}>
      <div className="content first-content">
        <div className="first-column">
          <h2 className="title title-primary">Olá!</h2>
          <p className="description">Deseja fazer o login no sistema?</p>
          <button className="btn btn-primary" onClick={() => setSigninSignup('sign-in')}>
            Entrar
          </button>
        </div>

        <div className="second-column">
          <h2 className="title title-second">Criar conta</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="div-input">
              <MdPermIdentity />
              <input 
                id="name" 
                type="text" 
                value={name} 
                placeholder="Nome Completo"
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="div-input">
              <MdRecentActors />
              <InputMask 
                mask="999.999.999-99" 
                id="cpf" value={cpf} 
                placeholder="CPF" 
                onChange={event => setCpf(event.target.value)} 
              />
            </div>

            <div className="div-input">
              <MdEmail />
              <input 
                id="email" 
                type="text" 
                value={email} 
                placeholder="Email" 
                onChange={event => setEmail(event.target.value)} 
              />
            </div>

            <div className="div-input">
              <MdLock />
              <input 
                id="password" 
                type="password" 
                value={password} 
                placeholder="Senha" 
                onChange={event => setPassword(event.target.value)} 
              />
            </div>
            <button className="btn btn-second" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>

      <div className="content second-content">
        <div className="first-column">
          <h2 className="title title-primary">Não tem uma conta?</h2>
          <p className="description description-primary">Faça seu cadastro!</p>
          <button className="btn btn-primary" onClick={() => setSigninSignup('sign-up')}>
            Cadastrar
          </button>
        </div>

        <div className="second-column">
          <h2 className="title title-second">Login</h2>
          <form onSubmit={handleSubmitLogin} className="form">
            <div className="div-input">
              <MdEmail />
              <input 
                id="emailLogin" 
                type="text" 
                value={emailLogin} 
                placeholder="Email" 
                onChange={event => setEmailLogin(event.target.value)} 
              />
            </div>

            <div className="div-input">
              <MdLock />
              <input 
                id="passwordLogin" 
                type="password" 
                value={passwordLogin} 
                placeholder="Senha" 
                onChange={event => setPasswordLogin(event.target.value)}  />
            </div>
            
            <button className="btn btn-second" type="submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
