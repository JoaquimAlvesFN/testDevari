import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import Template from '../../components/Template';
import Grid from '../../components/Grid';

export default function MinhasReceitas() {
  const [data, setData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api
    .get(`/api/v1/recipe?user=${localStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, []);

  function editarReceita(props){
    history.push(`/editar/${props}`);
  }

  return (
    <Template title="Minhas Receitas">
      <Grid>
        {
          data.map((result, index) => (
            <div key={result.id} className="cardReceita" onClick={() => {editarReceita(result.id)}}>
                <div className="headerCard">
                    <img className="imageHeaderCard" src={result.category.image}/>
                </div>
                <div className="bodyCard">
                    <div className="contentTitleCard">
                        <span>{result.title}</span>
                    </div>
                    <div className="contentBodyCard">
                        <span>{result.description}</span>
                    </div>
                    <div className="linkTo">
                        <Link to="" style={{color: '#FF7F00'}}>Editar</Link>
                    </div>
                </div>
            </div>
          ))
        }
      </Grid>
    </Template>
    
  );
}
