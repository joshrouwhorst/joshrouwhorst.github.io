import React from "react"
import Page from "../../components/templates/Page"
import { Helmet } from 'react-helmet'

export default function PagePreview({ entry, widgetFor }) {
    if (!entry || !widgetFor) {
        return <></>
    }

    const title = entry.getIn(['data', 'title'])
    const hideHeader = entry.getIn(['data', 'hideHeader'])
    const body = widgetFor('body')

    return (
        <>
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Helmet>
            <Page
                title={title}
                hideHeader={hideHeader}
                content={body}></Page>
        </>
    )
}
