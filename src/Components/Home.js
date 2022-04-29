import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Find } from './Find'
import axios from 'axios';

export const Home = () => {
    const [productos,setProductos] = useState([]);
    const search = (e) => {
        
        if(e.target.value.length>0){
            axios.get('http://localhost:3900/api/findProducts/'+e.target.value)
            .then(function (response) {
                if(response.data.status === 200 && response.data.products){
                    setProductos(response.data.products);
                }else{
                    console.log(response);
                    setProductos([]);    
                }
            })
            .catch(function (error) {
                console.log(error);
                setProductos([]);
            });            
        }else{
            setProductos([]);
        }
    }
    return (
        <>
            <div className="buscador">
                <input 
                placeholder="Buscar productos..."
                onChange={search}/>
            </div>
            <div className="titulo">
                <h3>Resultado Búsqueda</h3>
                <Link to="/products">Productos</Link>
                &nbsp;&nbsp;
                <Link to="/create">Crear</Link> 
            </div>
            <div className="listado">
                <Find productos={productos}/>
            </div>
        </>
    )
}
