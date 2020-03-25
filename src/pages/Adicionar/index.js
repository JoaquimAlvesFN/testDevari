import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Template from '../../components/Template';
import './index.css';

export default function Adicionar() {
  const [receita, setReceita] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  const [categorias, setCategorias] = useState([]);

  const history = useHistory();

  function textReceita(e) {
    setReceita(e.target.value);
  }

  function textCategoria(e) {
    setCategoria(e.target.value);
  }

  function textDescricao(e) {
    setDescricao(e.target.value);
  }

  function adicionar(e) {
    e.preventDefault();
    
    api
    .post('/api/v1/recipe/', {
      title: receita,
      description: descricao,
      category: categoria,
      user: localStorage.getItem('userId')
    },{
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    })
    .then(res => {
      if(res.status == 201){
        history.push('/receita');
      }
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    api
    .get('/api/v1/category', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => setCategorias(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <Template title="Adicionar Receita">
     <div className="formContainer">
      <form className="form">
        <div className="inputN1">
          <input type="text" placeholder="Nome da receita" value={receita} onChange={textReceita}/>
          <select name="categoria" onChange={textCategoria}>
            <option>Escolha a categoria da receita</option>
            {
              categorias.map((data, index) => (
                <option key={data.id} value={data.id}>{data.name}</option>
              ))
            }
          </select>
        </div>
        <div className="inputN2">
          <span>Descrição</span>
          <textarea rows="6" cols="60" value={descricao} onChange={textDescricao}/>
        </div>
        <div>
          <button onClick={adicionar}>Criar Receita</button>
        </div>
      </form>
     </div>
    </Template>
  );
}
