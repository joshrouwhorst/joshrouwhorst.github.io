import * as React from "react"
import MainTemplate from "../components/templates/MainTemplate"
import { useStaticQuery, graphql } from "gatsby"
import Page from "../components/templates/Page"

const DetermineContent = ({ nopage, title, html, hideHeader }) => {
    if (nopage) {
        return <h1>No Home Page Set Up</h1>
    } else {
        return (
            <Page title={title} html={html} hideHeader={hideHeader} />
        )
    }
}

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query MyQuery {
            page: allMarkdownRemark(
                filter: {internal: {}, fileAbsolutePath: {glob: "**/src/pages/**"}, frontmatter: {path: {eq: "home"}}}
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            hideHeader
                        }
                    html
                    }
                }
            }
        }
    `)

    let nopage = data.page?.edges?.length <= 0
    let html, title, hideHeader

    if (!nopage) {
        html = data.page.edges[0].node.html
        title = data.page.edges[0].node.frontmatter.title
        hideHeader = data.page.edges[0].node.frontmatter.hideHeader
    }

    return (
        <MainTemplate>
            <DetermineContent nopage={nopage} html={html} title={title} hideHeader={hideHeader} />
        </MainTemplate>
    )
}

export default IndexPage
