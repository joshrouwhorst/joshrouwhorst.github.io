import React from "react"
import { graphql } from "gatsby"
import MainTemplate from "../components/templates/MainTemplate"
import Page from "../components/templates/Page"

export default function Template({ data }) {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark

    return (
        <MainTemplate>
            <Page
                title={frontmatter.title}
                hideHeader={frontmatter.hideHeader}
                html={html}></Page>

        </MainTemplate>
    )
}

export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                hideHeader
            }
        }
    }
`