import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Template from '../../components/Template';
import './index.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changeSenha(e) {
        setSenha(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();

        api
        .post('/authentication/', {
            username: email,
            password: senha
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('userName', res.data.name);
            history.push('/receitas');
        })
        .catch(err => console.log(err));
    }

  return (
    <Template title="Entre em sua Conta">
        <div className="content">
            <form onSubmit={handleLogin} className="cardLogin">
                <div className="cardComponent">
                    <label>E-mail</label>
                    <input type="text" placeholder="exemplo@exemplo.com" value={email} onChange={changeEmail}/>
                </div>
                <div className="cardComponent">    
                    <label>Senha</label>
                    <input type="password" placeholder="********" value={senha} onChange={changeSenha}/>
                </div>
                <div className="cardButton">
                    <button className="buttonLogin" type="submit">Entrar</button>
                </div>
            </form>
        </div>
    </Template>
  );
}
