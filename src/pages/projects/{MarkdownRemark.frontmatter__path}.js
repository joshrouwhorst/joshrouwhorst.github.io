import React from "react"
import { graphql } from "gatsby"
import MainTemplate from "../../components/templates/MainTemplate"
import ProjectPage from "../../components/templates/ProjectPage"

export default function Template({ data }) {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    const tech = frontmatter.technologies?.split(',') || []

    return (
        <MainTemplate>
            <ProjectPage
                title={frontmatter.title}
                technologies={tech}
                html={html}
                projectUrl={frontmatter.projectUrl}
                newTab={frontmatter.openInNewTab}></ProjectPage>

        </MainTemplate>
    )
}

export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                openInNewTab
                projectUrl
                technologies
                path
                title
            }
        }
    }
`