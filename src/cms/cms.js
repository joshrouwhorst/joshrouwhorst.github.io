import React from 'react'
import CMS from 'netlify-cms-app'
import ProjectPreview from '../pages/projects/preview'
import PagePreview from '../pages/markdown/preview'
import '@fortawesome/fontawesome-free/css/all.css'
import style from '../styles/cms.scss'

//CMS.registerPreviewStyle(style)

CMS.registerPreviewTemplate('project', ProjectPreview)
CMS.registerPreviewTemplate('page', PagePreview)

// https://www.netlifycms.org/docs/custom-widgets/
CMS.registerEditorComponent({
    id: "test-wid",
    label: "Test Widget",
    fields: [
        {
            name: 'title',
            label: 'Title',
            widget: 'string'
        },
        {
            name: 'view',
            label: 'View',
            widget: 'select',
            options: ['Header', 'Paragraph']
        }
    ],
    pattern: /^<TestWidget title="(.*?)" view="(.*?)">.*<\/TestWidget>$/msi,
    fromBlock(match) {
        return {
            title: match[1],
            view: match[2]
        }
    },
    toBlock({ title, view }) {
        let html = ''

        if (view === 'Header') html = `<div><h1>${title}</h1></div>`
        else html = `<div><p>${title}</p></div>`

        return `<TestWidget title="${title}" view="${view}">${html}</TestWidget>`
    },
    toPreview({ title, view }) {
        let html = ''

        if (view === 'Header') html = `<div><h1>${title}</h1></div>`
        else html = `<div><p>${title}</p></div>`

        return `<TestWidget title="${title}" view="${view}">${html}</TestWidget>`
    },
})

// CMS.registerEditorComponent({
//     id: "basic-cta",
//     label: "Basic CTA",
//     fields: [
//         {
//             name: 'title',
//             label: 'Title',
//             widget: 'string'
//         },
//         {
//             name: 'description',
//             label: 'Description',
//             widget: 'markdown'
//         },
//         {
//             name: 'linkText',
//             labe: 'Link Text',
//             widget: 'string'
//         },
//         {
//             name: 'linkUrl',
//             labe: 'Link URL',
//             widget: 'string'
//         },
//         {
//             name: 'view',
//             labe: 'View',
//             widget: 'select',
//             options: ['Main', 'Second']
//         },
//     ],
//     // Regex pattern used to search for instances of this block in the markdown document.
//     // Patterns are run in a multline environment (against the entire markdown document),
//     // and so generally should make use of the multiline flag (`m`). If you need to capture
//     // newlines in your capturing groups, you can either use something like
//     // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
//     // which will cause `(.*)` to match newlines as well.
//     //
//     // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
//     // `(.*?)` vs `(.*)`), especially if matching against newline characters.
//     pattern: /^<div class="basic-cta" data-title="(.*?)" data->$\s*?<summary>(.*?)<\/summary>\n\n(.*?)\n^<\/details>$/ms,
//     // Given a RegExp Match object
//     // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
//     // return an object with one property for each field defined in `fields`.
//     //
//     // This is used to populate the custom widget in the markdown editor in the CMS.
//     fromBlock: function(match) {
//       return {
//         summary: match[1],
//         detail: match[2]
//       };
//     },
//     // Given an object with one property for each field defined in `fields`,
//     // return the string you wish to be inserted into your markdown.
//     //
//     // This is used to serialize the data from the custom widget to the
//     // markdown document
//     toBlock: function(data) {
//       return `
//   <details>
//     <summary>${data.summary}</summary>
  
//     ${data.detail}
  
//   </details>
//   `;
//     },
//     // Preview output for this component. Can either be a string or a React component
//     // (component gives better render performance)
//     toPreview: function(data) {
//       return `
//   <details>
//     <summary>${data.summary}</summary>
  
//     ${data.detail}
  
//   </details>
//   `;
//     }
//   });