import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

const DATE_FORMAT = "MM/DD/YYYY"
const TIME_FORMAT = "h:mm A"

const DATE_PARSE_FORMATS = [
    "M/D/YYYY",
    "MM/D/YYYY",
    "M/DD/YYYY",
    "MM/DD/YYYY",
    "M/D/YY",
    "MM/D/YY",
    "M/DD/YY",
    "MM/DD/YY",
    "MM/DD",
    "M/D",
    "MM/D",
    "M/DD",
]

const TIME_PARSE_FORMATS = [
    "H:m",
    "H:mm",
    "h:m a",
    "h:mm a",
    "h:ma",
    "h:mma",
    "h:m A",
    "h:mm A",
]

/**
 * Parses a date value from an input string or formats an existing date object.
 * @param {string | dayjs.Dayjs | null} dateValue - The date string or object to format/parse.
 * @returns {string} The date formatted as "MM/DD/YYYY".
 */
export function formatDate(dateValue) {
    if (!dateValue) return dayjs().format(DATE_FORMAT)
    return dayjs(dateValue).format(DATE_FORMAT)
}

/**
 * Parses a time value from an input string or formats an existing time string.
 * @param {string | null} timeValue - The time string (e.g., "1:00 PM").
 * @returns {string} The time formatted as "h:mm A".
 */
export function formatTime(timeValue) {
    if (!timeValue) {
        return dayjs().format(TIME_FORMAT)
    }

    const parsedTime = dayjs(timeValue, TIME_FORMAT)

    return parsedTime.isValid() ? parsedTime.format(TIME_FORMAT) : dayjs().format(TIME_FORMAT)
}

/**
 * Creates a dayjs object from a task's existing date/time fields.
 * @param {string | null} dateString - The raw date string.
 * @param {number} daysToAdd - Days to add if no dateString is provided (used for dueDate default).
 * @returns {dayjs.Dayjs} A dayjs object.
 */
export function createDate(dateString, daysToAdd = 0) {
    let date = dateString ? dayjs(dateString) : dayjs().add(daysToAdd, "day")
    return date
}

/**
 * Attempts to parse user-entered date text.
 * @param {string} dateInput - The raw string from the date input field.
 * @returns {dayjs.Dayjs | null} A valid dayjs object, or null if parsing fails.
 */
export function parseDateInput(dateInput) {
    return dayjs(dateInput, DATE_PARSE_FORMATS, true)
    // const parsed = dayjs(dateInput, DATE_PARSE_FORMATS, true)
    // return parsed.isValid() ? parsed : null
}

/**
 * Gets a new dayjs object by updating an existing dayjs object with new time strings.
 * Used for the onSubmit function.
 * @param {dayjs.Dayjs} dateObj - The existing dayjs date object.
 * @param {string | null} timeString - The time string (e.g., "1:00 PM").
 * @returns {dayjs.Dayjs | null} The combined dayjs object or null if dateObj is null.
 */
export function combineDateAndTime(dateObj, timeString) {
    if (!dateObj) return null
    if (!timeString) return dateObj.hour(0).minute(0).second(0).millisecond(0)

    const time = dayjs(timeString, TIME_FORMAT)
    return dateObj
        .hour(time.hour())
        .minute(time.minute())
        .second(0)
        .millisecond(0)
}

/**
 * Normalizes user-entered date text.
 * - Tries to parse common input formats.
 * - Returns a formatted date string ("MM/DD/YYYY") if valid.
 * - Returns the original string if parsing fails (e.g., partial or non-sense input).
 * - Returns today's date formatted if the input is empty.
 * * @param {string} dateInput - The raw string from the date input field.
 * @returns {string} The normalized date string, or the original dateInput if invalid.
 */
export function normalizeDateInput(dateInput) {
    if (!dateInput) {
        return dayjs().format(DATE_FORMAT)
    }

    const trimmedDate = dateInput.trim()

    let parsed = dayjs(trimmedDate, DATE_PARSE_FORMATS, true)

    if (parsed.isValid()) {
        return parsed.format(DATE_FORMAT)
    }

    return dayjs().format(DATE_FORMAT)
}

/**
 * Normalizes user-entered time text.
 * - Tries to parse common input formats.
 * - Returns a formatted time string ("h:mm A") if valid.
 * - Returns the current time formatted if parsing fails (e.g., partial or non-sense input).
 * - Returns the current time formatted if the input is empty.
 * @param {string} timeString - The raw string from the time input field.
 * @returns {string} The normalized time string, or the original timeString if invalid.
 */
export function normalizeTimeInput(timeString) {
    if (!timeString) return dayjs().format(TIME_FORMAT)

    const trimmedTime = timeString.trim().toLowerCase()

    let parsed

    parsed = dayjs(trimmedTime, TIME_PARSE_FORMATS, true)

    if (parsed.isValid()) {
        return parsed.format("h:mm A")
    }

    return dayjs().format(TIME_FORMAT)
}
