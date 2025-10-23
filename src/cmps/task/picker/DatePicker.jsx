import { useState } from "react"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

import CheckboxCheckIcon from "../../../assets/images/icons/checkbox-check.svg?react"
import CheckboxUncheckIcon from "../../../assets/images/icons/checkbox-uncheck.svg?react"

export function DatePicker({ info, onUpdate }) {
    const [schedule, setSchedule] = useState({
        isStartDateSet: false,
        startDate: dayjs(),
        startDateInput: dayjs().format("MM/DD/YYYY"),
        isDueDateSet: true,
        dueDate: dayjs().add(1, 'day'),
        dueDateInput: dayjs().format("MM/DD/YYYY"),
        dueTime: dayjs().format("h:mm A"),
    })

    const {
        isStartDateSet,
        startDate,
        startDateInput,
        isDueDateSet,
        dueDate,
        dueDateInput,
        dueTime,
    } = schedule

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleDateInputChange = (name, value) => {
        const parsed = dayjs(value, ["M/D/YYYY", "MM/DD/YYYY"], true)

        setSchedule(prev => ({
            ...prev,
            [`${name}Input`]: value,
            ...(parsed.isValid() ? { [name]: parsed } : {}),
        }))
    }

    const handleCalendarChange = (name, newDate) => {
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: newDate,
            [`${name}Input`]: newDate.format("MM/DD/YYYY"),
        }))
    }

    function renderCalendar(name) {
        const dateValue = name === "startDate" ? startDate : dueDate

        return (
            <div className="calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={dateValue}
                        onChange={(newDate) => handleCalendarChange(name, newDate)}
                        views={["year", "month", "day"]}
                        showDaysOutsideCurrentMonth
                        sx={{
                            width: "unset",
                            fontSize: "0.875rem",
                            "& .MuiPickersDay-root": {
                                fontSize: "0.875rem",
                            },
                            "& .MuiMonthCalendar-root, .MuiYearCalendar-root": {
                                width: "unset",
                            },
                            "& .MuiPickersCalendarHeader-label": {
                                fontSize: "0.875rem",
                                fontWeight: "600",
                            },
                            "& .MuiSvgIcon-root": {
                                height: "1.125rem",
                            }
                        }}
                    />
                </LocalizationProvider>
            </div>
        )
    }

    return (
        <section className="date-picker">
            <header className="picker-header">
                <h2 className="picker-title">Dates</h2>
            </header>


            <div className="date-range">
                <div className="start-date">
                    {renderCalendar("startDate")}
                    <fieldset>
                        <legend>Start Date</legend>
                        <label htmlFor="start-checkbox">
                            <input
                                type="checkbox"
                                id="start-checkbox"
                                name="isStartDateSet"
                                checked={isStartDateSet}
                                onChange={handleChange}
                            />
                            <span>
                                {isStartDateSet ? (
                                    <CheckboxCheckIcon width={16} height={16} fill="currentColor" />
                                ) : (
                                    <CheckboxUncheckIcon width={16} height={16} fill="currentColor" />
                                )}
                            </span>
                        </label>
                        <input
                            type="text"
                            className="start-input"
                            name="startDate"
                            value={isStartDateSet ? startDateInput : ""}
                            placeholder="M/D/YYYY"
                            onChange={(e) => handleDateInputChange("startDate", e.target.value)}
                        />
                    </fieldset>
                </div>
                <div className="due-date">
                    {renderCalendar("dueDate")}
                    <fieldset>
                        <legend>Due Date</legend>
                        <label htmlFor="due-checkbox">
                            <input
                                type="checkbox"
                                id="due-checkbox"
                                name="isDueDateSet"
                                checked={isDueDateSet}
                                onChange={handleChange}
                            />
                            <span>
                                {isDueDateSet ? (
                                    <CheckboxCheckIcon width={16} height={16} fill="currentColor" />
                                ) : (
                                    <CheckboxUncheckIcon width={16} height={16} fill="currentColor" />
                                )}
                            </span>
                        </label>
                        <input
                            type="text"
                            className="due-input"
                            name="dueDate"
                            value={isDueDateSet ? dueDateInput : ""}
                            placeholder="M/D/YYYY"
                            onChange={(e) => handleDateInputChange("dueDate", e.target.value)}
                        />
                        <input
                            type="text"
                            className="due-input"
                            name="dueTime"
                            value={isDueDateSet ? dueTime : ""}
                            placeholder="hh:mm a"
                            onChange={handleChange}
                        />
                    </fieldset>
                </div>
            </div>
        </section>
    )
}
