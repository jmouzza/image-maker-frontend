import React, { useEffect } from 'react'

export const Find = ({ productos }) => {
    useEffect(()=>{

    },[])
    return (
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
    )
}
