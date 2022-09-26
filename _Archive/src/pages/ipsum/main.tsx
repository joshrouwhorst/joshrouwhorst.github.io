import React, { useState } from 'react'
import MainTemplate from '../../components/MainTemplate'
import { rand } from '../../scripts/website/utils'

import dictionary from './dictionary.js'

const MAX_SENT_LEN = 15
const MIN_SENT_LEN = 5
const MAX_HEAD_LEN = 5
const MIN_HEAD_LEN = 2
const LINK_URL = '#'

let maxParaLen = 5
let minParaLen = 1
let makeLinks = true
let makeStyles = true
let debug = true

const punctuation = ['.', '!', '?']

const uppercase = (word: string) => {
    try {
        return word.charAt(0).toUpperCase() + word.slice(1)
    } catch (err) {
        console.error('Error uppercasing word.')
        console.error(err)
        console.error(word)
    }
}

const generateSentence = () => {
    const wordCount = rand(MIN_SENT_LEN, MAX_SENT_LEN)
    let words = []

    let element = ''

    const elRand = rand(0, 100)

    if (elRand > 90 && makeLinks) {
        element = 'LINK'
    } else if (elRand > 80 && makeStyles) {
        element = 'BOLD'
    } else if (elRand > 70 && makeStyles) {
        element = 'ITALIC'
    } else {
        element = ''
    }

    const elementStart = rand(0, wordCount - 1)
    const elementEnd = rand(elementStart + 1, wordCount)


    for (let i = 0; i < wordCount; i++) {
        const idx = rand(0, dictionary.length)

        if (element && i === elementStart) words.push(`[${element}]`)

        let word = dictionary[idx]
        if (i === 0) word = uppercase(word)
        words.push(word)

        if (element && (i + 1) === elementEnd) words.push(`[/${element}]`)
    }

    words[0] = uppercase(words[0])

    const punct = punctuation[rand(0, punctuation.length - 1)]
    const sentence = `${words.join(' ')}${punct}`

    if (element) console.log(sentence)
    if (element) console.log(`elementStart: ${elementStart} - elementEnd: ${elementEnd} - wordCount: ${wordCount}`)

    return sentence
}

const generateParagraph = () => {
    const sentCount = rand(minParaLen, maxParaLen)
    const sents = []

    for (let i = 0; i < sentCount; i++) {
        sents.push(generateSentence())
    }

    return { paragraph: true, text: sents.join(' ') }
}

const generateHeading = () => {
    const wordCount = rand(MIN_HEAD_LEN, MAX_HEAD_LEN)
    const words = []

    for (let i = 0; i < wordCount; i++) {
        const idx = rand(0, dictionary.length)
        const word = uppercase(dictionary[idx])
        words.push(word)
    }

    return { heading: true, text: words.join(' ') }
}

const Main = () => {
    const [html, setHtml] = useState('')
    const [output, setOutput] = useState('')
    const [settings, setSettings] = useState({
        paragraph: '20',
        paraMin: minParaLen.toString(),
        paraMax: maxParaLen.toString(),
        links: makeLinks.toString(),
        styles: makeStyles.toString(),
        heads: 'true',
        format: 'hidden'
    })

    const updateVal = (e: Event) => {
        setSettings({ ...settings, [e.target.name]: e.target.value })
    }

    const run = () => {
        const paragraphs = parseInt(settings.paragraph, 10)

        minParaLen = parseInt(settings.paraMin, 10)
        maxParaLen = parseInt(settings.paraMax, 10)
        makeLinks = settings.links === 'true'
        makeStyles = settings.styles === 'true'

        let out = []
        let headCountDown = 0

        for (let i = 0; i < paragraphs; i++) {
            if (settings.heads === 'true' && headCountDown === 0) {
                out.push(generateHeading())
                headCountDown = rand(3, 5)
            }

            headCountDown--
            out.push(generateParagraph())
        }

        out = out.map((o: any) => {
            const linkRand = rand(0, 100)

            let linksToInsert = 0
            if (linkRand > 50 && linkRand < 80) linksToInsert = 1
            else if (linkRand > 80) linksToInsert = 2

            if (settings.format === 'md') {
                o.text = o.text.replace(/\[LINK\] /g, '[')
                o.text = o.text.replace(/ \[\/LINK\]/g, `](${LINK_URL})`)

                o.text = o.text.replace(/\[BOLD\] /g, '**')
                o.text = o.text.replace(/ \[\/BOLD\]/g, '**')

                o.text = o.text.replace(/\[ITALIC\] /g, '*')
                o.text = o.text.replace(/ \[\/ITALIC\]/g, '*')

                if (o.paragraph) return `<p>${o.text}</p>`
                else if (o.heading) return `<p>## ${o.text}</p>`
            } else if (settings.format === 'html') {
                o.text = o.text.replace(/\[LINK\] /g, `&lt;a href="${LINK_URL}"&gt;`)
                o.text = o.text.replace(/ \[\/LINK\]/g, `&lt;/a&gt;`)

                o.text = o.text.replace(/\[BOLD\] /g, '&lt;strong&gt;')
                o.text = o.text.replace(/ \[\/BOLD\]/g, '&lt;/strong&gt;')

                o.text = o.text.replace(/\[ITALIC\] /g, '&lt;em&gt;')
                o.text = o.text.replace(/ \[\/ITALIC\]/g, '&lt;/em&gt;')

                if (o.paragraph) return `<p>&lt;p&gt;${o.text}&lt;/p&gt;</p>`
                else if (o.heading) return `<p>&lt;h2&gt;${o.text}&lt;/h2&gt;</p>`
            } else {
                o.text = o.text.replace(/\[LINK\] /g, `<a href="${LINK_URL}">`)
                o.text = o.text.replace(/ \[\/LINK\]/g, `</a>`)

                o.text = o.text.replace(/\[BOLD\] /g, '<strong>')
                o.text = o.text.replace(/ \[\/BOLD\]/g, '</strong>')

                o.text = o.text.replace(/\[ITALIC\] /g, '<em>')
                o.text = o.text.replace(/ \[\/ITALIC\]/g, '</em>')

                if (o.paragraph) return `<p>${o.text}</p>`
                else if (o.heading) return `<h2>${o.text}</h2>`
            }
        })

        setHtml(out.join(''))
        setOutput('')
    }

    return (
        <MainTemplate className="ipsum">
            <div className="settings">
                <div className="row">
                    <div className="col input-group">
                        <label htmlFor="paragraphs">
                            Paragraphs
                        </label>
                        <input id="paragraphs" type="number" name="paragraph" value={settings.paragraph} onChange={updateVal} />
                    </div>
                    <div className="col input-group">
                        <label htmlFor="paraMin">
                            Paragraph Min. Length
                        </label>
                        <input type="number" id="paraMin" name="paraMin" value={settings.paraMin} onChange={updateVal} />
                    </div>
                    <div className="col input-group">
                        <label htmlFor="paraMax">
                            Paragraph Max. Length
                        </label>
                        <input type="number" id="paraMax" name="paraMax" value={settings.paraMax} onChange={updateVal} />
                    </div>
                </div>
                <div className="row">
                    <div className="col input-group">
                        <label htmlFor="heads">
                            Headings
                        </label>
                        <select id="heads" name="heads" value={settings.heads} onChange={updateVal}>
                            <option value="true">On</option>
                            <option value="false">Off</option>
                        </select>
                    </div>
                    <div className="col input-group">
                        <label htmlFor="links">
                            Links
                        </label>
                        <select id="links" name="links" value={settings.links} onChange={updateVal}>
                            <option value="true">On</option>
                            <option value="false">Off</option>
                        </select>
                    </div>
                    <div className="col input-group">
                        <label htmlFor="styles">
                            Bold/Italics
                        </label>
                        <select id="styles" name="styles" value={settings.styles} onChange={updateVal}>
                            <option value="true">On</option>
                            <option value="false">Off</option>
                        </select>
                    </div>
                    <div className="col input-group">
                        <label htmlFor="format">
                            Format
                        </label>
                        <select id="format" name="format" value={settings.format} onChange={updateVal}>
                            <option value="hidden">Don't Show</option>
                            <option value="html">HTML</option>
                            <option value="md">Markdown</option>
                        </select>
                    </div>
                </div>
                <button onClick={run}>Run</button>
            </div>
            <div className="output" dangerouslySetInnerHTML={{ __html: html }}></div>
            <div className="output">{output}</div>
        </MainTemplate>
    )
}

export default Main