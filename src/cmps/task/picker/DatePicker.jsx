import { useState } from 'react'

import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { makeId } from "../../../services/util.service"

export function DatePicker({ info, onUpdate }) {
    const [value, setValue] = useState(dayjs())

    const id = 'date-' + makeId()

    const formattedValue = value ? value.format('M/D/YYYY') : ''

    return (
        <section className="date-picker">
            <header className="picker-header">
                <h2 className="picker-title">Dates</h2>
            </header>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    views={['year', 'month', 'day']}
                    showDaysOutsideCurrentMonth
                />
            </LocalizationProvider>

            <label htmlFor={id}>{info.label || 'Date:'}</label>
            <input
                type="text"
                id={id}
                value={formattedValue}
                placeholder="M/D/YYYY"
                onChange={(ev) => {
                    onUpdate(ev.target.value)
                }} />
        </section>
    )
}
