import { Link } from 'gatsby'
import React, { useState } from 'react'
import NavLink from './NavLink'

const links = [
    {
        name: 'Me',
        dest: '/'
    },
    {
        name: 'Projects'
    },
    {
        name: 'Music Theory',
        dest: '/music/'
    },
    {
        name: 'Animated Text',
        dest: '/animated-text/'
    },
    {
        name: 'Ipsum',
        dest: '/ipsum/'
    },
    {
        name: 'qbp',
        dest: '/qbp/'
    }
]

const Navigation = () => {
    const navInitVal = false
    const [navVisible, setNavVisible] = useState(navInitVal)

    const navButtonClicked = () => {
        setNavVisible(!navVisible)
    }

    const pickNavButtonIcon = () => {
        if (navVisible) {
            return (
                <i aria-hidden="true" className="fa-solid fa-xmark"></i>
            )
        } else {
            return (
                <i aria-hidden="true" className="fa-solid fa-bars"></i>
            )
        }
    }

    return (
        <div>
            <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded={navVisible} onClick={navButtonClicked}>
                <span className="visually-hidden">Menu</span>
                {pickNavButtonIcon()}
            </button>

            <nav data-visible={navVisible} id="primary-navigation" className="primary-navigation">
                <ul>
                    {
                        links.map((l: any) => {
                            if (l.dest) {
                                return (
                                    <li key={l.name}>
                                        <NavLink>
                                            <Link to={l.dest}>{l.name}</Link>
                                        </NavLink>
                                    </li>
                                )
                            } else {
                                return (
                                    <li className="header" key={l.name}>
                                        {l.name}
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navigation