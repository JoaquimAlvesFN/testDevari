import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import Template from '../../components/Template';
import './index.css';

export default function VerReceita() {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [titulo, setTitulo] = useState('');

  const { id } = useParams();
  
  useEffect(() => {
    api
    .get(`/api/v1/recipe/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res);
      setTitulo(res.data.category.name);
      setImage(res.data.category.image);
      setDescription(res.data.description);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <Template title={titulo}>
      <div className="content">
        <div className="bodyPage">
          <div>
            <img src={image}/>
          </div>
          <div className="bodyContent">
            <span className="titleRecipe">Descrição</span>
            <div className="descBody">{description}</div>
          </div>
        </div>
      </div>
    </Template>
  );
}
