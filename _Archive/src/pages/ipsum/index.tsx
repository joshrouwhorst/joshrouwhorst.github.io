import * as React from 'react'
import MainTemplate from '../../components/MainTemplate'
import { Link } from 'gatsby'
import dictionary from './dictionary.js'

const Index = () => {
    return (
        <MainTemplate>
            <h2>
                Ipsum
            </h2>

            <div className="tech-specs">
                <div className="label">Languages</div>
                <ul>
                    <li>
                        JavaScript
                    </li>
                    <li>
                        React
                    </li>
                </ul>
            </div>

            <p>
                As a little challenge while making this site, I thought it would be interesting to make a Lorem Ipsum generator. I wanted one that would not just generate text, but one that would provide HTML or Markdown formatting as well as a range of typical elements found in text such as headings, links, bold and italics.
            </p>

            <p>
                The first step was building a little Node.js app that would take raw text I gave it, strip that text of unwanted characters, break the text into an array of unique words, filter out (hopefully) inappropriate words, and save it to a JSON file the code on this site could use. Currently there are <strong>{dictionary.length}</strong> unique words in this Ipsum dictionary.
            </p>

            <p>
                The next step was taking those raw words and building out a system that would generate sentences of random length (with minimum and maximum sizes), generate paragraphs of random length, as well as inserting those typical elements mentioned above. Like the rest of the site, this was done in React.
            </p>

            <p>
                The end result, I think, is an ipsum generator that looks more natural than latin, and provides more professional text than a lot of themed ipsum generators out there.
            </p>

            <p>
                <Link to="./main" className="btn">Start</Link>
            </p>
        </MainTemplate>
    )
}

export default Index