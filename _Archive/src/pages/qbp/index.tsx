import * as React from 'react'
import MainTemplate from '../../components/MainTemplate'
import { Link } from 'gatsby'

const Index = () => {
    return (
        <MainTemplate>
            <h2>
                qbp
            </h2>

            <div className="tech-specs">
                <div className="label">Languages</div>
                <ul>
                    <li>
                        JavaScript
                    </li>
                </ul>
            </div>

            <p>
                When working on node projects I would often find myself wanting to process a lot of records asynchronously and in batches. I kept rebuilding the same basic structure for doing this over and over, so eventually I turned it into <a href="https://www.npmjs.com/package/qbp" target="_blank">an NPM package</a>.
            </p>

            <p>
                I found with a little tweaking I could also have it handle rate limiting as well. So if I only want 100 records processed per minute I can easily specify that.
            </p>

            <p>
                Click the Start button to see some examples of this package in action.
            </p>

            <p>
                <Link to="./main" className="btn">Start</Link>
            </p>
        </MainTemplate>
    )
}

export default Index