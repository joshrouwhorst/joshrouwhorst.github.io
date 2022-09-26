export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const CHORD_LAYOUTS = [
    {
        name: {
            full: 'Major',
            quality: 'maj'
        },
        steps: [4, 7]
    },
    {
        name: {
            full: 'Minor',
            quality: 'min'
        },
        steps: [3, 7]
    },
    {
        name: {
            full: 'Augmented',
            quality: 'aug'
        },
        steps: [4, 8]
    },
    {
        name: {
            full: 'Diminished',
            quality: 'dim'
        },
        steps: [3, 6]
    },
    {
        name: {
            full: 'Suspended 2',
            quality: 'sus2'
        },
        steps: [2, 7]
    },
    {
        name: {
            full: 'Suspended 4',
            quality: 'sus4'
        },
        steps: [5, 7]
    },
    {
        name: {
            full: 'Major 7th',
            quality: 'maj',
            seventh: '7'
        },
        steps: [4, 7, 11]
    },
    {
        name: {
            full: 'Minor 7th',
            quality: 'min',
            seventh: '7'
        },
        steps: [3, 7, 10]
    },
    {
        name: {
            full: 'Dominant 7th',
            seventh: '7'
        },
        steps: [4, 7, 10]
    },
    {
        name: {
            full: 'Minor Major 7th',
            quality: 'min',
            seventh: 'maj7'
        },
        steps: [3, 7, 11]
    },
    {
        name: {
            full: 'Half Diminished 7th',
            seventh: '&#119241;7'
        },
        steps: [3, 6, 10]
    },
    {
        name: {
            full: 'Diminished 7th',
            seventh: '&#119240;7'
        },
        steps: [3, 6, 9]
    },
    {
        name: {
            full: 'Augmented Major 7th',
            quality: 'aug',
            seventh: 'maj7'
        },
        steps: [4, 8, 11]
    }
];

export const MODES = [
    {
        name: 'Ionian (Major Scale)',
        position: 0
    },
    {
        name: 'Dorian',
        position: 1
    },
    {
        name: 'Phrygian',
        position: 2
    },
    {
        name: 'Lydian',
        position: 3
    },
    {
        name: 'Mixolydian',
        position: 4
    },
    {
        name: 'Aeolian (Natural Minor)',
        position: 5
    },
    {
        name: 'Harmonic Minor',
        position: 5
    },
    {
        name: 'Melodic Minor',
        position: 5
    },
    {
        name: 'Locrian',
        position: 6
    }
];