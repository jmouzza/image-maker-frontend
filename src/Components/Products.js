import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from './Pagination';

export const Products = () => {

    /*Paginador*/
    const [currentPage,setCurrentPage] = useState(1);
    const [productPerPage] = useState(8);
    const [currentProducts,setCurrentProducts] = useState([]);
    /*Paginador*/
    const [productos,setProductos] = useState([]);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/getProducts')
        .then(function (response) {
            if(response.data.status === 200 && response.data.products){
                setProductos(response.data.products);
            }else{
                console.log(response);
                setProductos([]);    
            }
            paginar();
        })
        .catch(function (error) {
            console.log(error);
            setProductos([]);
        });        
    },[])
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
            <div className="titulo no-buscador">
                <h3>Todos los Productos</h3>
                <Link to="/home"> Buscador</Link>
                &nbsp;&nbsp;
                <Link to="/create">Crear</Link> 
            </div>
            <div className="listado">
            <>
            {currentProducts.length > 0 && (
                <>
                    {currentProducts.map(producto => {
                        return (
                            <article key={producto._id} className="listado-item">
                                <img src={producto.img} alt="Producto"/>
                                <h3>{producto.titulo}</h3>
                                <p>${producto.precio.toLocaleString()}</p>
                                <p>{producto.descripcion}</p>
                            </article>

                        )
                    })
                }
                {productos.length>8 &&
                    <Pagination itemsXPagina={productPerPage} totalItems={productos.length} paginate={paginate}/>
                }
                </>
            )}
        </>
            </div>
        </>
    )
}
