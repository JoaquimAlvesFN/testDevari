import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import api from '../../services/api';
import Template from '../../components/Template';

export default function EditarReceita() {
  const [titulo, setTitulo] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [category, setCategory] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  function textTitulo(e) {
    setTitulo(e.target.value);
  }

  function textCategoria(e) {
    setCategoria(e.target.value);
  }

  function textDescricao(e) {
    setDescricao(e.target.value);
  }

  function atualizar(e) {
    e.preventDefault();

    api
    .put(`/api/v1/recipe/${id}/`, {
      title: titulo,
      category: categoriaId,
      description: descricao
    },{
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res.status == 200){
        history.push('/receita');
      }
    })
    .catch(err => console.log(err))
  }

  function deletar() {
    api
    .delete(`/api/v1/recipe/${id}`,{
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res.status == 204){
        history.push('/receita');
      }
    })
    .catch(err => console.log(err));
  }
  
  useEffect(() => {
    api
    .get(`/api/v1/recipe/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      setTitulo(res.data.title);
      setCategoriaId(res.data.category.id);
      setCategoria(res.data.category.name);
      setDescricao(res.data.description);
    })
    .catch(err => console.log(err));

    api
    .get('/api/v1/category', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => setCategory(res.data))
    .catch(err => console.log(err));
  }, []);



  return (
    <Template title="Editar Receita">
      <div className="formContainer">
      <form className="form">
        <div className="deletar" onClick={deletar}>
          <FontAwesomeIcon icon={faTrash}/>
        </div>
        <div className="inputN1">
          <input type="text" placeholder="Nome da receita" value={titulo} onChange={textTitulo}/>
          <select name="categoria" onChange={textCategoria}>
            {
              category.map((data, index) => (
                <option key={data.id} value={data.id}>{data.name}</option>
                ))
              }
              <option selected value={categoriaId}>{categoria}</option>
          </select>
        </div>
        <div className="inputN2">
          <span>Descrição</span>
          <textarea rows="6" cols="60" value={descricao} onChange={textDescricao}/>
        </div>
        <div>
          <button onClick={atualizar}>Atualizar Receita</button>
        </div>
      </form>
     </div>
    </Template>
  );
}
