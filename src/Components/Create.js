import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Create = () => {
    
    const [nuevoProducto,setNuevoProducto] = useState({});
    const [mensaje,setMensaje] = useState();
    useEffect(()=>{
        setTimeout(() => {
            setMensaje();
        }, 3500);
    },[mensaje])
    const handleChange = (e) => {
        if(nuevoProducto.titulo){
            let nameTag = e.target.name; 
            setNuevoProducto( prevProps => {
                return {
                    ...prevProps,
                    [nameTag]:e.target.value
                }
            });
        }
    }
    const getFormulario = async(e) => {
        e.preventDefault();
        let formulario = e.target;
        let productoForm = {
            titulo: formulario.titulo.value,
            precio: formulario.precio.value,
            descripcion: formulario.descripcion.value,
            img: formulario.img.value
        }
        await setNuevoProducto(productoForm);
        await axios.post('http://localhost:3900/api/saveProduct',nuevoProducto)
        .then(function (response) {
            if(response.data.status === 200 && response.data.product){
                setMensaje(response.data.message);
                document.getElementById("miForm").reset();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <>
            <div className="titulo no-buscador">
                <h3>Crear Producto</h3>
                <Link to="/home"> Buscador</Link>
                &nbsp;&nbsp;
                <Link to="/products">Productos</Link>
            </div>
            <form id="miForm" onSubmit={getFormulario}>
                <label>Título</label>
                <input
                    name="titulo"
                    placeholder="Ingrese título del producto" 
                    type="text" 
                    onChange={handleChange} />

                <label>Precio</label>
                <input 
                    name="precio"
                    placeholder="Ingrese precio del producto" 
                    type="number" 
                    onChange={handleChange} />

                <label>Descripción</label>
                <textarea 
                    name="descripcion"
                    placeholder="Ingrese descripción del producto" 
                    onChange={handleChange}></textarea>

                <label>Url Imagen</label>
                <input 
                    name="img"
                    placeholder="Ingrese url de la imagen del producto"
                    type="text" 
                    onChange={handleChange} />
                <input type="submit" value="Enviar"/>
            </form>
            {mensaje && 
                <p className="mensaje-exito">{mensaje}</p>
            }            
        </>
    )
}
