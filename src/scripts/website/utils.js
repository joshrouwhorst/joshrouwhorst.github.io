export const rand = (min, max) => {
    return Math.floor(min + (Math.random() * ((max - min) + 1)))
}

export const isOneIn = (max) => {
    return rand(1, max) === 1
}