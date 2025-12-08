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