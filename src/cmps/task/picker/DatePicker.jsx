import { useState } from "react"

import { useFocusOnStateChange } from "../../../customHooks/useFocusOnStateChange"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

import CheckboxCheckIcon from "../../../assets/images/icons/checkbox-check.svg?react"

export function DatePicker({ task, onUpdate, onClose }) {
    const [schedule, setSchedule] = useState({
        isStartDateSet: task.start ? true : false,
        startDate: task.start ? dayjs(task.start) : dayjs(),
        startDateInput: task.start ? dayjs(task.start).format("MM/DD/YYYY") : dayjs().format("MM/DD/YYYY"),
        isDueDateSet: true,
        dueDate: task.due ? dayjs(task.due) : dayjs().add(1, 'day'),
        dueDateInput: task.due ? dayjs(task.due).format("MM/DD/YYYY") : dayjs().add(1, 'day').format("MM/DD/YYYY"),
        dueTime: (task.dueTime && task.dueTime) || dayjs().format("h:mm A"),
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

    const startDateInputRef = useFocusOnStateChange(isStartDateSet)
    const dueDateInputRef = useFocusOnStateChange(isDueDateSet)

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

    function onSubmit(e) {
        e.preventDefault()
        onUpdate(task._id, { due: dueDate, dueTime, start: startDate })
        onClose()
    }

    function onRemove() {
        onUpdate(task._id, { due: null, dueTime: null, start: null })
        onClose()
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
                            height: "unset",
                            "& .MuiPickersSlideTransition-root": {
                                minHeight: "200px",
                            },
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

    const startCheckIconClass = isStartDateSet ? "check-icon checked" : "check-icon unchecked"
    const dueCheckIconClass = isDueDateSet ? "check-icon checked" : "check-icon unchecked"

    return (
        <section className="date-picker">
            <header className="picker-header">
                <h2 className="picker-title">Dates</h2>
            </header>


            <div className="date-range">
                <form onSubmit={onSubmit}>
                    <div className="date-field-container">
                        <fieldset>
                            <legend>Due Date</legend>
                            <div className="date-input-with-toggle">
                                <label htmlFor="due-checkbox" className="date-checkbox">
                                    <input
                                        type="checkbox"
                                        id="due-checkbox"
                                        name="isDueDateSet"
                                        checked={isDueDateSet}
                                        onChange={handleChange}
                                    />
                                    <span className={dueCheckIconClass}>
                                        <CheckboxCheckIcon width={16} height={16} fill={isDueDateSet ? "#ffffff" : "transparent"} />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    ref={dueDateInputRef}
                                    className="date-input"
                                    name="dueDate"
                                    value={isDueDateSet ? dueDateInput : ""}
                                    disabled={!isDueDateSet}
                                    placeholder="M/D/YYYY"
                                    onChange={(e) => handleDateInputChange("dueDate", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="date-input"
                                    name="dueTime"
                                    value={isDueDateSet ? dueTime : ""}
                                    disabled={!isDueDateSet}
                                    placeholder="hh:mm a"
                                    onChange={handleChange}
                                />
                            </div>
                            {renderCalendar("dueDate")}
                        </fieldset>
                    </div>
                    <div className="divider"></div>
                    <div className="date-field-container">
                        <fieldset>
                            <legend>Start Date</legend>
                            <div className="date-input-with-toggle">
                                <label htmlFor="start-checkbox" className="date-checkbox">
                                    <input
                                        type="checkbox"
                                        id="start-checkbox"
                                        name="isStartDateSet"
                                        checked={isStartDateSet}
                                        onChange={handleChange}
                                    />
                                    <span className={startCheckIconClass}>
                                        <CheckboxCheckIcon width={16} height={16} fill={isStartDateSet ? "#ffffff" : "transparent"} />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    ref={startDateInputRef}
                                    className="date-input"
                                    name="startDate"
                                    value={isStartDateSet ? startDateInput : ""}
                                    disabled={!isStartDateSet}
                                    placeholder="M/D/YYYY"
                                    onChange={(e) => handleDateInputChange("startDate", e.target.value)}
                                />
                            </div>
                            {renderCalendar("startDate")}
                        </fieldset>
                    </div>
                    <div className="action-btns">
                        <button
                            className="btn-primary"
                            type="submit"
                        >
                            Save
                        </button>
                        <button
                            className="btn-secondary"
                            type="button"
                            onClick={onRemove}
                        >
                            Remove
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
