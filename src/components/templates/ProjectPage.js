import React from 'react'
import TechSpecs from '../TechSpecs'
import Content from '../Content'

const ProjectTechSpecs = ({ technologies }) => {
    if (technologies) {
        return (
            <TechSpecs title='Technologies' values={technologies}></TechSpecs>
        )
    } else {
        return null
    }
}

const Button = ({ projectUrl, target }) => {
    if (projectUrl) {
        return (
            <p>
                <a href={projectUrl} className="btn" target={target}>Start</a>
            </p>
        )
    } else {
        return null
    }
}

const ProjectPage = ({ title, technologies, contentHtml, html, projectUrl, newTab }) => {
    const target = newTab ? '_blank' : ''

    return (
        <div className="project">
            <h1>
                {title}
            </h1>

            <ProjectTechSpecs technologies={technologies}></ProjectTechSpecs>

            <Content content={contentHtml} html={html}></Content>

            <Button projectUrl={projectUrl} target={target}></Button>
        </div>
    )
}

export default ProjectPage