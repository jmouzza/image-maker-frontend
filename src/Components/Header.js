import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header className="header">
            <Link to="/products">
                <div className="logo">
                    <h2>FIND<strong>MAKERS</strong></h2>
                </div>
            </Link>
        </header>
    )
}
