import React from "react"
import ProjectPage from "../../components/templates/ProjectPage"

export default function ProjectPreview({ entry, widgetFor }) {
    if (!entry || !widgetFor) {
        return <></>
    }

    const title = entry.getIn(['data', 'title'])
    let technologies = entry.getIn(['data', 'technologies'])
    const projectUrl = entry.getIn(['data', 'projectUrl'])
    const newTab = entry.getIn(['data', 'openInNewTab'])
    const body = widgetFor('body')

    if (technologies) technologies = technologies.split(',')

    return (
        <ProjectPage
            title={title}
            technologies={technologies}
            projectUrl={projectUrl}
            newTab={newTab}
            contentHtml={body}></ProjectPage>
    )
}
