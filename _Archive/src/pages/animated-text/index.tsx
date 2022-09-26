import * as React from 'react'
import MainTemplate from '../../components/MainTemplate'
import { Link } from 'gatsby'

const Index = () => {
    return (
        <MainTemplate>
            <h2>
                Animated Text
            </h2>

            <div className="tech-specs">
                <div className="label">Languages</div>
                <ul>
                    <li>
                        SCSS
                    </li>
                    <li>
                        React
                    </li>
                </ul>
            </div>

            <p>
                These are some animation experiments I put together. The intention for these was to push some limits with Sass using random numbers and procedurally generated styles.
            </p>

            <p>
                Be sure to type your own text and click to cycle through animations.
            </p>

            <p>
                This is designed for desktop. It is very resource intensive for the browser.
            </p>

            <p>
                <a href="/animated-text/main" className="btn" target={'_blank'}>Start</a>
            </p>
        </MainTemplate>
    )
}

export default Index