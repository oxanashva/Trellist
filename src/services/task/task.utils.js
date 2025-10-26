import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

export function getDueStatusBadge(dueDateString, dueTimeString = null, isClosed = false) {
    if (isClosed) {
        return {
            text: 'Complete',
            className: 'badge-closed'
        }
    }
    if (!dueDateString) {
        return null
    }

    let deadline = dayjs(dueDateString)

    if (dueTimeString) {
        const time = dayjs(dueTimeString, "h:mm A")
        deadline = deadline.hour(time.hour()).minute(time.minute()).second(0).millisecond(0)
    }

    const now = dayjs()

    if (deadline.isBefore(now)) {
        return {
            text: "Overdue",
            className: "badge-overdue"
        }
    }

    const hoursDiff = deadline.diff(now, "hour", true)

    if (hoursDiff <= 24) {
        return {
            text: "Due soon",
            className: "badge-due-soon"
        }
    }

    return null
}