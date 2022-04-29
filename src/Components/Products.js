import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Products = () => {
    
    const [productos,setProductos] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3900/api/getProducts')
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
    },[])
    return (
        <>
            <div className="titulo no-buscador">
                <h3>Todos los Productos</h3>
                <Link to="/home"> Buscador</Link>
                &nbsp;&nbsp;
                <Link to="/create">Crear</Link> 
            </div>
            <div className="listado">
            <>
            {productos.length > 0 && (
                <>
                    {productos.map(producto => {
                        return (
                            <article key={producto.id} className="listado-item">
                                <img src={producto.img} alt="Producto"/>
                                <h3>{producto.titulo}</h3>
                                <p>${producto.precio.toLocaleString()}</p>
                                <p>{producto.descripcion}</p>
                            </article>

                        )
                    })
                    }
                </>
            )}
        </>
            </div>
        </>
    )
}
