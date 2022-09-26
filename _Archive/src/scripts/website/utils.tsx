export const rand = (min: number, max: number) => {
    return Math.floor(min + (Math.random() * ((max - min) + 1)))
}

export const isOneIn = (max: number) => {
    return rand(1, max) === 1
}