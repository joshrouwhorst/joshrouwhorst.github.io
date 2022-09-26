import React from 'react'
import { Link } from 'gatsby'
import Navigation from './Navigation'
import { Helmet } from 'react-helmet'

//import '@fortawesome/fontawesome-free/css/all.css'
import '../styles/style.scss'

const MainTemplate = ({ children, pageTitle, data, className }: any) => {
    if (!pageTitle) {
        pageTitle = 'Josh Rouwhorst'
    } else {
        pageTitle = `${pageTitle} - Josh Rouwhorst`
    }

    const classes = className ? `main-content ${className}` : 'main-content'

    return (
        <div className="main-template">
            <Helmet bodyAttributes={{ class: 'main-template-body' }}>
                <title>{pageTitle}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
            </Helmet>
            <header className="main-header">
                <Link to="/">
                    <div className="content">
                        <h1>Josh Rouwhorst</h1>
                        <div className="sub">Frontend WebDev</div>
                    </div>
                </Link>
            </header>
            <aside className="main-sidebar">
                <Navigation></Navigation>
            </aside>
            <main className={classes}>
                {children}
            </main>
            <footer>
                <p>
                    &copy; 2022 Josh Rouwhorst
                </p>
            </footer>
        </div>
    )
}

export default MainTemplate