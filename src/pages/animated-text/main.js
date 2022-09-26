import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { navigate } from 'gatsby'

import '../../styles/pages/animatedText/index.scss'

const TEXT_INIT_VAL = 'Type & Click'

const acceptablesStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()[]{};:<>,./?-_+=|\\\'" '
const acceptables = acceptablesStr.split('')

const animations = [

    // {
    //     name: 'Rainbow Fade',
    //     class: 'rainbow-fade',
    //     bodyClass: 'white-background',
    //     description: ''
    // },


    {
        name: 'Stranger Things',
        class: 'stranger-things',
        bodyClass: 'static',
        description: 'This uses a red background layer and a white foreground layer with subtly out of sync fades to achieve this effect. I also threw in a couple pixels of blur and a grain effect to give it a little film feel.'
    },

    {
        name: 'Eighty Four',
        class: 'eighty-four',
        description: 'This animation might push your browser to the limit. It just uses 4 keyframes and a simple rotation transform, but it also uses a mixin that organizes 7 layers of text-shadow to create the effect you see. I like the 80s feel it has.'
    },
    {
        name: 'AutoFocus',
        class: 'autofocus',
        description: 'I started thinking about how to use mixins to generate effects. With this effect I created a mixin that just takes a "distance" in pixels. From that we determine how much of a blur and distance the text shadow layers should have, and if it is a negative pixel value then we just have the text blurred.'
    },
    {
        name: 'GlitchyFocus',
        class: 'randomfocus',
        description: 'An experiment in random numbers. Every time this animation is compiled it not only generates new keyframe values but new keyframe positions as well. It has been tuned to show an effect, again, that somewhat looks like a camera trying to focus on the text.'
    },
    {
        name: 'Color Separation',
        class: 'color-separation-horizontal',
        bodyClass: 'white-background',
        description: 'Built on the previous effects, and again built with a mixin simply taking "distance" as a parameter.',
    },

]

const AnimatedTextMain = () => {
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

    const keyListener = (e) => {
        e.preventDefault()

        if (text === TEXT_INIT_VAL) text = ''

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
    }

    useEffect(() => {
        document.addEventListener('keydown', keyListener)
        textUpdate()
    }, [keyListener, textUpdate])

    return (
        <div className="clickable" onClick={nextAnimation} onKeyDown={nextAnimation} role="button">
            <Helmet bodyAttributes={{
                class: animation.bodyClass ? `animatedtext ${animation.bodyClass}` : 'animatedtext'
            }}>
                <title>Animated Text - Josh Rouwhorst</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
            </Helmet>
            <div className="nav">
                <i class="fa-solid fa-house-chimney" onClick={() => navigate(-1)} onKeyDown={() => navigate(-1)} role="button"></i>
            </div>
            <div className={`${animation.class} main-elem`}>
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

export default AnimatedTextMain