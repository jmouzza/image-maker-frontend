import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Find } from './Find'
import axios from 'axios';
import { Pagination } from './Pagination';

export const Home = () => {
    /*Paginador*/
    const [currentPage,setCurrentPage] = useState(1);
    const [productPerPage] = useState(8);
    const [currentProducts,setCurrentProducts] = useState([]);
    /*Paginador*/
    const [productos,setProductos] = useState([]);
    const search = (e) => {
        if(e.target.value.length>0){
            axios.get(process.env.REACT_APP_BACKEND_URL+'/findProducts/'+e.target.value)
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
    useEffect(()=>{
        paginar();
    },[productos,currentPage])
    const paginar = () => {
        const indexOfLastPost = currentPage * productPerPage;
        const indexOfFirstPost = indexOfLastPost - productPerPage;
        setCurrentProducts(productos.slice(indexOfFirstPost, indexOfLastPost));
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                <Find productos={currentProducts}/>
                <Pagination itemsXPagina={productPerPage} totalItems={productos.length} paginate={paginate}/>
            </div>
        </>
    )
}
