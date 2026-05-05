import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const DATE_FORMAT = 'MM/DD/YYYY'
const TIME_FORMAT = 'h:mm A'

const DATE_PARSE_FORMATS = [
  'M/D/YYYY',
  'MM/D/YYYY',
  'M/DD/YYYY',
  'MM/DD/YYYY',
  'M/D/YY',
  'MM/D/YY',
  'M/DD/YY',
  'MM/DD/YY',
  'MM/DD',
  'M/D',
  'MM/D',
  'M/DD',
]

const TIME_PARSE_FORMATS = ['H:m', 'H:mm', 'h:m a', 'h:mm a', 'h:ma', 'h:mma', 'h:m A', 'h:mm A']

export function formatDate(dateValue: string | dayjs.Dayjs | null): string {
  if (!dateValue) return dayjs().format(DATE_FORMAT)
  return dayjs(dateValue).format(DATE_FORMAT)
}

export function formatTime(timeValue: string | null): string {
  if (!timeValue) {
    return dayjs().format(TIME_FORMAT)
  }

  const parsedTime = dayjs(timeValue, TIME_FORMAT)

  return parsedTime.isValid() ? parsedTime.format(TIME_FORMAT) : dayjs().format(TIME_FORMAT)
}

export function createDate(dateString: string | null, daysToAdd = 0): dayjs.Dayjs {
  return dateString ? dayjs(dateString) : dayjs().add(daysToAdd, 'day')
}

export function parseDateInput(dateInput: string): dayjs.Dayjs {
  return dayjs(dateInput, DATE_PARSE_FORMATS, true)
}

export function combineDateAndTime(
  dateObj: dayjs.Dayjs | null,
  timeString: string | null
): dayjs.Dayjs | null {
  if (!dateObj) return null
  if (!timeString) return dateObj.hour(0).minute(0).second(0).millisecond(0)

  const time = dayjs(timeString, TIME_FORMAT)
  return dateObj.hour(time.hour()).minute(time.minute()).second(0).millisecond(0)
}

export function normalizeDateInput(dateInput: string): string {
  if (!dateInput) {
    return dayjs().format(DATE_FORMAT)
  }

  const trimmedDate = dateInput.trim()
  const parsed = dayjs(trimmedDate, DATE_PARSE_FORMATS, true)

  if (parsed.isValid()) {
    return parsed.format(DATE_FORMAT)
  }

  return dayjs().format(DATE_FORMAT)
}

export function normalizeTimeInput(timeString: string): string {
  if (!timeString) return dayjs().format(TIME_FORMAT)

  const trimmedTime = timeString.trim().toLowerCase()
  const parsed = dayjs(trimmedTime, TIME_PARSE_FORMATS, true)

  if (parsed.isValid()) {
    return parsed.format('h:mm A')
  }

  return dayjs().format(TIME_FORMAT)
}
