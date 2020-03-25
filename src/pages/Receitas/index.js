import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import Template from '../../components/Template';
import Grid from '../../components/Grid';
import './index.css';

export default function Receitas() {
    const [data, setData] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api
        .get('/api/v1/recipe', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res);
            setData(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    function verReceita(props) {
        history.push(`/verReceita/${props}`);
    }

  return (
    <Template title="Receitas">
        <Grid>
        {
            data.map((result, index) => (
                <div key={result.id} className="cardReceita" onClick={() => {verReceita(result.id)}}>
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
                            <Link to="" style={{color: '#FF7F00'}}>Ver Receita</Link>
                        </div>
                    </div>
                </div>
            ))
        }
        </Grid>
    </Template>
  );
}
