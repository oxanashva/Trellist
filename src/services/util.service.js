import Bubble from "../assets/images/gradients/bubble.svg?react"
import Snow from "../assets/images/gradients/snow.svg?react"
import Ocean from "../assets/images/gradients/ocean.svg?react"
import Crystal from "../assets/images/gradients/crystal.svg?react"
import Rainbow from "../assets/images/gradients/rainbow.svg?react"
import Peach from "../assets/images/gradients/peach.svg?react"
import Flower from "../assets/images/gradients/flower.svg?react"
import Earth from "../assets/images/gradients/earth.svg?react"
import Alien from "../assets/images/gradients/alien.svg?react"
import Volcano from "../assets/images/gradients/volcano.svg?react"

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

/**
 * Format a timestamp into "Mon D, YYYY, HH:MM AM/PM"
 * Example: Oct 9, 2025, 11:21 PM
 *
 * @param {number|string|Date} input - Timestamp (ms), ISO string, or Date object
 * @returns {string} Formatted date string
 */

export function formatDate(input) {
    const date = new Date(input)

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    })
}

// Color utils
export const labelsColorsMap = {
    "subtle green": "#BAF3DB",
    "subtle yellow": "#F5E989",
    "subtle orange": "#FCE4A6",
    "subtle red": "#FFD5D2",
    "subtle purple": "#EED7FC",

    "green": "#4BCE97",
    "yellow": "#EED12B",
    "orange": "#FCA700",
    "red": "#F87168",
    "purple": "#C97CF4",

    "bold green": "#1F845A",
    "bold yellow": "#946F00",
    "bold orange": "#BD5B00",
    "bold red": "#C9372C",
    "bold purple": "#964AC0",

    "subtle blue": "#C7E2F1",
    "subtle sky": "#D1E9F9",
    "subtle lime": "#C7E2F1",
    "subtle pink": "#F1D1E9",
    "subtle black": "#D1D1D1",

    "sky": "#669DF1",
    "blue": "#6CC3E0",
    "lime": "#94C748",
    "pink": "#E774BB",
    "black": "#8C8F97",

    "bold blue": "#1868DB",
    "bold sky": "#227D9B",
    "bold lime": "#5B7F24",
    "bold pink": "#AE4787",
    "bold black": "#6B6E76",
}

export const defaultLabelsColorMap = {
    "green": "#4BCE97",
    "yellow": "#EED12B",
    "orange": "#FCA700",
    "red": "#F87168",
    "purple": "#C97CF4",
    "sky": "#669DF1",
    "blue": "#6CC3E0",
    "lime": "#94C748",
    "pink": "#E774BB",
    "black": "#8C8F97",
}

export const coverColorsMap = {
    "green": "#4BCE97",
    "yellow": "#EED12B",
    "orange": "#FCA700",
    "red": "#F87168",
    "purple": "#C97CF4",
    "blue": "#669DF1",
    "sky": "#6CC3E0",
    "lime": "#94C748",
    "pink": "#E774BB",
    "black": "#8C8F97"
}

export const getLabelColor = (colorName) => {
    return labelsColorsMap[colorName] || '#CCCCCC';
}

export const gradientColorsMap = {
    Bubble,
    Snow,
    Ocean,
    Crystal,
    Rainbow,
    Peach,
    Flower,
    Earth,
    Alien,
    Volcano
}

export const cloudinaryGradientColorsMap = {
    Bubble: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289307/bubble_rh24m3.svg",
    Snow: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289304/snow_tqqgom.svg",
    Ocean: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289306/ocean_rkvgdo.svg",
    Crystal: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289305/crystal_gpjjtx.svg",
    Rainbow: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289306/rainbow_jqmmhp.svg",
    Peach: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289308/peach_z8j9fh.svg",
    Flower: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289305/flower_wdjcpk.svg",
    Earth: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289307/earth_t322hu.svg",
    Alien: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289304/alien_vws1af.svg",
    Volcano: "https://res.cloudinary.com/da9naclpy/image/upload/v1765289304/volcano_up6ako.svg"
}

export function addOpacity(rgbString, alpha = 0.8) {
    // Extract numbers from "rgb(34,140,212)"
    const values = rgbString.match(/\d+/g)
    return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`
}

export function darkenHex(hex, factor = 0.8) {
    // hex → #RRGGBB
    let r = parseInt(hex.substr(1, 2), 16)
    let g = parseInt(hex.substr(3, 2), 16)
    let b = parseInt(hex.substr(5, 2), 16)

    r = Math.floor(r * factor)
    g = Math.floor(g * factor)
    b = Math.floor(b * factor)

    return `rgb(${r}, ${g}, ${b})`
}


/**
 * Parses an rgb() or rgba() string and returns the [R, G, B] components (0-255).
 * It ignores the alpha component if present.
 * @param {string} color The rgb() or rgba() color string.
 * @returns {number[]} Array of [R, G, B] values.
 */
function _getRgbComponents(color) {
    const match = color?.match(/(\d+),\s*(\d+),\s*(\d+)/)

    if (match) {
        // match[1] is R, match[2] is G, match[3] is B
        return [
            parseInt(match[1]),
            parseInt(match[2]),
            parseInt(match[3]),
        ]
    }

    // Fallback to black for safety
    return [0, 0, 0];
}

/**
 * Calculates the relative luminance of an RGB color based on sRGB standard.
 * @param {number[]} rgbComponents [R, G, B] array (0-255).
 * @returns {number} The luminance value (0-1).
 */
function _getLuminance(rgbComponents) {
    const [r, g, b] = rgbComponents.map(c => c / 255) // Normalize to 0-1

    // Standard sRGB coefficients for perceived brightness
    const R_L = 0.2126
    const G_L = 0.7152
    const B_L = 0.0722

    return (R_L * r) + (G_L * g) + (B_L * b)
}

/**
 * Determines the best contrasting text color (white or a specific dark color) 
 * for a given background color based on its luminance.
 * * It uses an adjusted luminance threshold (0.40) to ensure that visually 
 * medium-dark colors (like deep blues and teals) are assigned white text, 
 * improving readability in the UI.
 *
 * @param {string} backgroundColor The background color string in rgb() or rgba() format. 
 * (e.g., 'rgb(44, 114, 105)' or 'rgba(255, 100, 50, 0.8)').
 * @returns {string} The chosen contrasting text color: 'white' (for dark backgrounds) 
 * or 'rgb(23, 43, 77)' (for light backgrounds).
 */
export const getContrastingTextColor = (backgroundColor) => {
    const rgb = _getRgbComponents(backgroundColor)
    const luminance = _getLuminance(rgb)

    const LUMINANCE_THRESHOLD = 0.40

    const DARK_TEXT_COLOR = 'rgb(23, 43, 77)'
    const LIGHT_TEXT_COLOR = 'white'

    return luminance < LUMINANCE_THRESHOLD ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR
}