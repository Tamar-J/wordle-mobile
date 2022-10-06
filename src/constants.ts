type colorsType = {
  black: "#121214"
  darkgrey: "#3A3A3D"
  grey: "#818384"
  lightgrey: "#D7DADC"
  primary: "#538D4E"
  secondary: "#B59F3B"
}
export const colors: colorsType = {
  black: "#121214",
  darkgrey: "#3A3A3D",
  grey: "#818384",
  lightgrey: "#D7DADC",
  primary: "#538D4E",
  secondary: "#B59F3B",
}

export type colorsToEmojiType = {
  [color: string]: "⬛"|"🟩"|"🟧"
}

export const colorsToEmoji: colorsToEmojiType = {
  [colors.darkgrey]: "⬛",
  [colors.primary]: "🟩",
  [colors.secondary]: "🟧",
}

export const ENTER = "ENTER"
export const CLEAR = "CLEAR"

export type keysType = "q" | "w" | "e" | "r" | "t" | "y" | "u" | "i" | "o" | "p" | "a" | "s" | "d" | "f" | "g" | "h" | "j" | "k" | "l" |"ENTER" | "z" | "x" | "c" | "v" | "b" | "n" | "m" | "CLEAR"

export const keys: keysType[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  [ENTER, "z", "x", "c", "v", "b", "n", "m", CLEAR],
]

export const NUMBER_OF_TRIES = 6