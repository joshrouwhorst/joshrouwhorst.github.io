import * as React from 'react'
import MainTemplate from '../../components/MainTemplate'
import { Link } from 'gatsby'

const Index = () => {
    return (
        <MainTemplate>
            <h2>
                Music Theory
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
                I've been writing music since I was a teenager. But I never learned music theory until a while back when I discovered music theory YouTube tutorials.
            </p>

            <p>
                I learned the rules that make up fundamental music structure. For example, a key must have 7 notes. It starts at the root note and goes up exactly 1-2 semitones with each next note in the scale.
            </p>

            <p>
                Knowing that, you can programmatically build all possible keys and their scales.
            </p>

            <p>
                I took the rules I found and wrote an engine in JavaScript that builds out (practically) all keys and chords and creates relationships between them. This allowed me to create a tool to easily navigate information for notes, chords, and keys.
            </p>

            <p>
                But the best resource is the <strong>Key Finder</strong>. Whenever I'm playing with a tune and I have a few chords or notes figured out, I can put them in the Key Finder and get an idea of what other notes and chords would go along.
            </p>

            <p>
                <Link to="./main" className="btn">Start</Link>
            </p>
        </MainTemplate>
    )
}

export default Index