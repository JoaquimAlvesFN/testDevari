import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './index.css';

export default function Template(props) {
  const [isToken, setIsToken] = useState(false);
  const [username, setUsername] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsToken(true);
      setUsername(localStorage.getItem('userName'));
    }else{
      history.push('/login');
    }

  }, []);

  function handleLogout() {
    localStorage.clear();
    setIsToken(false);
    history.push('/login');
  }

  return (
    <div className="container">
      <header>
        <div className="logo">
          <span className="dev">DEV</span>
          <span className="food">food</span>
        </div>
        {
          isToken && pathname !== '/login' &&
          <>
            <div className="links">
              <Link style={{textDecoration: 'none', color: '#FFF', marginLeft: 20, fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif'}} to="/receitas">Receitas</Link>
              <Link style={{textDecoration: 'none', color: '#FFF', marginLeft: 20, fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif'}} to="/receita">Minhas Receitas</Link>
              <Link style={{textDecoration: 'none', color: '#FFF', marginLeft: 20, fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif'}} to="/adicionar">Adicionar Receitas</Link>
            </div>
            <div className="infoUser">
              <span>{username}</span>
              <span className="userPhoto"></span>
              <span className="pipe"></span>
              <div className="userLogout">
                <FontAwesomeIcon onClick={handleLogout} icon={faSignOutAlt} color="#FFF" size={20}/>
              </div>
            </div>
          </>
        }
      </header>
      <body>
        <div className={
            pathname == '/adicionar' || pathname == '/editar' 
              ? "bodyHeader1" 
              : "bodyHeader"
            }
        >
          {
            pathname == '/adicionar' || pathname == '/editar' 
            ?
              <span onClick={() => {history.goBack()}} className="headerButtonBack">Voltar</span>
            : ''
          }
          <span className="span1">{props.title}</span> 
          <div/>
        </div>
        <div className="bodyContent">
          {props.children}
        </div>
      </body>
    </div>
  );
}
