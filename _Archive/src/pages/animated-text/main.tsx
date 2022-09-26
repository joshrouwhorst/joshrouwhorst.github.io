import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

const TEXT_INIT_VAL = 'Type & Click'

const acceptablesStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()[]{};:<>,./?-_+=|\\\'" '
const acceptables = acceptablesStr.split('')

const animations = [
    {
        name: 'Eighty Four',
        class: 'eighty-four',
        description: 'This animation might push your browser to the limit. It just uses 4 keyframes and a simple rotation transform, but it also uses a mixin that organizes 7 layers of text-shadow to create the effect you see. I like the 80s feel it has.'
    },
    {
        name: 'AutoFocus',
        class: 'autofocus',
        description: ''
    },
    {
        name: 'RandomFocus',
        class: 'randomfocus',
        description: 'An experiment in random numbers. Every time this animation is compiled it not only generates new keyframe values but new keyframe positions as well. It has been tuned to show an effect that somewhat looks like a camera trying to autofocus on the text.'
    },
    {
        name: 'Color Separation',
        class: 'color-separation-horizontal',
        bodyClass: 'white-background',
        description: '',
    }
]

const Main = () => {
    const [animation, setAnimation] = useState(animations[0])
    const [currentText, setText] = useState(TEXT_INIT_VAL)
    let text = currentText
    let lastText = currentText
    let animationIndex = animations.indexOf(animation)

    const nextAnimation = () => {
        const idx = animations.indexOf(animation)
        if (idx >= animations.length - 1) setAnimation(animations[0])
        else setAnimation(animations[idx + 1])
    }

    const textUpdate = () => {
        if (lastText !== text) {
            lastText = text
            setText(text)
        }
        setTimeout(() => textUpdate(), 200)
    }

    const keyListener = (e: KeyboardEvent) => {
        e.preventDefault()

        if (text === TEXT_INIT_VAL) text = ''

        console.log(`currentText: ${currentText}`)
        console.log(`text: ${text}`)

        // Stops the listener
        if (e.key === 'Escape') {
            document.removeEventListener('keydown', keyListener)
        }

        if (acceptables.some(a => a === e.key)) {
            text += e.key
        }
        else if (e.key === 'Backspace' && text.length > 0) {
            text = text.substr(0, text.length - 1)
        }

        console.log(`Text: ${text}`)
    }

    document.addEventListener('keydown', keyListener)
    textUpdate()

    return (
        <div className="clickable" onClick={nextAnimation}>
            <Helmet bodyAttributes={{
                class: animation.bodyClass ? `animatedtext ${animation.bodyClass}` : 'animatedtext'
            }}>
            </Helmet>
            <div className={animation.class}>
                <div className="wrapper">
                    <div className="title">
                        {currentText}
                    </div>
                </div>
            </div>
            <div className="animation-info">
                <div className="animation-title">
                    {animation.name}
                </div>
                <div className="animation-description">
                    {animation.description}
                </div>
                <div className="animation-count">
                    {(animationIndex + 1)} / {animations.length}
                </div>
            </div>
        </div>
    )
}

export default Main