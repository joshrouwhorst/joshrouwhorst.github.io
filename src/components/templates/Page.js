import React from 'react'
import Content from '../Content'

const Title = ({ title, hideHeader }) => {
    hideHeader = !!hideHeader

    if (!hideHeader && title) {
        return <h1>{title}</h1>
    }

    return null
}

const Page = ({ title, content, html, hideHeader }) => {
    return (
        <div className="page">
            <Title title={title} hideHeader={hideHeader} />
            <Content content={content} html={html} />
        </div>
    )
}

export default Page