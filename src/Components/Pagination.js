import React from 'react'

export const Pagination = ({itemsXPagina, totalItems, paginate}) => {
    const numeroPaginas = [];
    for(let i = 1;i<=Math.ceil(totalItems/itemsXPagina); i++){
        numeroPaginas.push(i);
    }

    return (
        <nav className="nav-paginator">
            <ul className="paginacion">
                {numeroPaginas.map(numero => (
                    <li key={numero} className="pagina">
                        <span onClick={()=>paginate(numero)} className="ir-pagina">{numero}</span>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}
