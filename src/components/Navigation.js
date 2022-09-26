import { Link } from 'gatsby'
import React, { useState } from 'react'
import NavLink from './NavLink'
import { useStaticQuery, graphql } from "gatsby"

const linkColors = ['anibar-blue', 'anibar-green', 'anibar-yellow', 'anibar-red']


const Navigation = ({ view }) => {
    const navInitVal = false
    const [navVisible, setNavVisible] = useState(navInitVal)

    let lastColorIdx = 4

    let links = []

    // Query for link data
    const data = useStaticQuery(graphql`
        query PageQuery {
            pages: allMarkdownRemark(
                filter: {internal: {}, fileAbsolutePath: {glob: "**/src/pages/markdown/**"}}
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            path
                            showInNav
                            ordinal
                        }
                    }
                }
            }
            projects: allMarkdownRemark(
                filter: {internal: {}, fileAbsolutePath: {glob: "**/src/projects/**"}}
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            path
                            showInNav
                            ordinal
                        }
                    }
                }
            }
        }
    `)

    const pageData = data.pages
    const projData = data.projects

    // Set up Page links
    const pages = pageData.edges.map(e => {
        const { title, path, ordinal, showInNav } = e.node.frontmatter

        return {
            name: title,
            dest: path === 'home' ? '/' : `/${path}`,
            ordinal: ordinal ? parseInt(ordinal, 10) : 0,
            showInNav: !!showInNav
        }
    })
        .filter(p => p.showInNav)
        .sort((a, b) => {
            if (a.ordinal < b.ordinal) return -1
            else if (a.ordinal > b.ordinal) return 1
            else return 0
        })

    links.push(...pages)

    // Set up Project links
    const projects = projData.edges.map(e => {
        const { title, path, ordinal, showInNav } = e.node.frontmatter

        return {
            name: title,
            dest: `/projects/${path}`,
            ordinal: ordinal ? parseInt(ordinal, 10) : 0,
            showInNav: !!showInNav
        }
    })
        .filter(p => p.showInNav)
        .sort((a, b) => {
            if (a.ordinal < b.ordinal) return -1
            else if (a.ordinal > b.ordinal) return 1
            else return 0
        })

    if (projects.length > 0) {
        links.push({ name: 'Projects' }, ...projects)
    }

    // Set up link colors
    links.forEach((l) => {
        if (!l.dest) return
        let nextIdx = 0
        if (lastColorIdx + 1 < linkColors.length) nextIdx = lastColorIdx + 1
        l.color = linkColors[nextIdx]
        lastColorIdx = nextIdx
    })

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

    if (!view || view === 'original') {
        return originalView({ links, navVisible, navButtonClicked, navButtonIcon: pickNavButtonIcon() })
    } else if (view === 'new') {
        return newView({ links, navVisible, navButtonClicked, navButtonIcon: pickNavButtonIcon() })
    }
}

export default Navigation

function originalView({ links, navVisible, navButtonClicked, navButtonIcon }) {
    return (
        <div className='original-view'>
            <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded={navVisible} onClick={navButtonClicked}>
                <span className="visually-hidden">Menu</span>
                {navButtonIcon}
            </button>

            <nav data-visible={navVisible} id="primary-navigation" className="primary-navigation">
                <ul>
                    {
                        links.map((l) => {
                            if (l.dest) {
                                return (
                                    <li key={l.name}>
                                        <NavLink className={l.color}>
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

function newView({ links, navVisible, navButtonClicked, navButtonIcon }) {
    return (
        <div className='new-view'>
            <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded={navVisible} onClick={navButtonClicked}>
                <span className="visually-hidden">Menu</span>
                {navButtonIcon}
            </button>

            <nav data-visible={navVisible} id="primary-navigation" className="primary-navigation">
                <ul>
                    {
                        links.map((l) => {
                            if (l.dest) {
                                return (
                                    <li key={l.name}>
                                        <NavLink className={l.color}>
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