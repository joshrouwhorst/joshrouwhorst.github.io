const MAJOR = [2, 2, 1, 2, 2, 2, 1];
const HARMONIC_MINOR = [2, 1, 2, 2, 1, 3, 1];
const MELODIC_MINOR = [2, 1, 2, 2, 2, 2, 1];

export class Mode {
    constructor(name, position, id) {
        this.Name = name
        this.Position = position
        this.Steps = getModeSteps(this)
        this.Id = id
    }
}

function getModeSteps(mode) {
    let scaleIdx = mode.Position
    const steps = []
    let scale = null

    if (mode.Name === 'Harmonic Minor') {
        scale = HARMONIC_MINOR
        scaleIdx = 0
    }
    else if (mode.Name === 'Melodic Minor') {
        scale = MELODIC_MINOR
        scaleIdx = 0
    }
    else {
        scale = MAJOR
    }

    for (let i = 0; i < scale.length; i++) {
        steps.push(scale[scaleIdx])

        scaleIdx++
        if (scaleIdx >= scale.length) {
            scaleIdx -= scale.length
        }
    }

    return steps;
}