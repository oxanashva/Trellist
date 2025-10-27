import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

const DATE_FORMAT = "MM/DD/YYYY"
const TIME_FORMAT = "h:mm A"

const DATE_PARSE_FORMATS = ["M/D/YYYY", DATE_FORMAT]

/**
 * Parses a date value from an input string or formats an existing date object.
 * @param {string | dayjs.Dayjs | null} dateValue - The date string or object to format/parse.
 * @returns {string} The date formatted as "MM/DD/YYYY".
 */
export function formatDate(dateValue) {
    if (!dateValue) return dayjs().format(DATE_FORMAT);
    return dayjs(dateValue).format(DATE_FORMAT);
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

    const parsedTime = dayjs(timeValue, TIME_FORMAT);

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
    const parsed = dayjs(dateInput, DATE_PARSE_FORMATS, true)
    return parsed.isValid() ? parsed : null
}

/**
 * Gets a new dayjs object by updating an existing dayjs object with new time strings.
 * Used for the onSubmit function.
 * @param {dayjs.Dayjs} dateObj - The existing dayjs date object.
 * @param {string | null} timeString - The time string (e.g., "1:00 PM").
 * @returns {dayjs.Dayjs | null} The combined dayjs object or null if dateObj is null.
 */
export function combineDateAndTime(dateObj, timeString) {
    if (!dateObj) return null;
    if (!timeString) return dateObj.hour(0).minute(0).second(0).millisecond(0)

    const time = dayjs(timeString, TIME_FORMAT)
    return dateObj
        .hour(time.hour())
        .minute(time.minute())
        .second(0)
        .millisecond(0)
}

export function normalizeTimeInput(timeString) {
    if (!timeString) return dayjs().format(TIME_FORMAT)

    const trimmedTime = timeString.trim().toLowerCase()

    let parsed

    if (trimmedTime.includes('am') || trimmedTime.includes('pm')) {
        parsed = dayjs(timeString, ["h:m a", "h:mm a"], true);
        return parsed.isValid() ? parsed.format("h:mm A") : timeString
    }

    parsed = dayjs(trimmedTime, ["h", "h:m", "h:mm"], true)

    if (parsed.isValid()) {
        return parsed.format("h:mm A")
    }

    return timeString
};