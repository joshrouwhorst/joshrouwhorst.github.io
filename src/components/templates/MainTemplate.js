import * as React from 'react'
import { Link } from 'gatsby'
import Navigation from '../Navigation'
import { Helmet } from 'react-helmet'

//import '../widgets/All'

import basicInfo from '../../cms/basic_info.json'

import '@fortawesome/fontawesome-free/css/all.css'
import '../../styles/style.scss'

const MainTemplate = ({ children, pageTitle, data, className }) => {
    const year = (new Date()).getFullYear()

    if (!pageTitle) {
        pageTitle = basicInfo.title
    } else {
        pageTitle = `${pageTitle} - ${basicInfo.title}`
    }

    const classes = className ? `main-content ${className}` : 'main-content'

    return (
        <div className="main-template">
            <Helmet bodyAttributes={{ class: 'main-template-body' }} htmlAttributes={{ lang: 'en' }}>
                <title>{pageTitle}</title>
                {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Slab:wght@400;700&display=swap" /> */}
                {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" /> */}
                {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Slab:wght@400;700&display=swap" rel="preload" as="style" onLoad={onTagLoad} /> */}
                {/* <noscript>{'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Slab:wght@400;700&display=swap" />'}</noscript> */}
                <meta name="description" content={basicInfo.description} />
            </Helmet>
            <header className="main-header">
                <Link to="/">
                    <div className="content">
                        <div className="site-title">{basicInfo.title}</div>
                        <div className="sub">{basicInfo.subTitle}</div>
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
                    &copy; {year} Josh Rouwhorst
                </p>
            </footer>
        </div>
    )
}

export default MainTemplate