import { useState } from "react"

import { useFocusOnStateChange } from "../../../customHooks/useFocusOnStateChange"

import { formatDate, formatTime, createDate, parseDateInput, combineDateAndTime, normalizeTimeInput } from "../../../services/date.service"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

import CheckboxCheckIcon from "../../../assets/images/icons/checkbox-check.svg?react"

export function DatePicker({ task, onUpdate, onClose }) {
    const [schedule, setSchedule] = useState({
        isStartDateSet: task.start ? true : false,
        startDate: createDate(task.start),
        startDateInput: formatDate(task.start),
        isDueDateSet: true,
        dueDate: createDate(task.due, 1),
        dueDateInput: formatDate(task.due),
        dueTime: formatTime(task.dueTime),
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
        const { name, type, checked } = e.target
        let value = e.target.value

        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    function handleBlur({ target }) {
        const { name, value } = target

        if (name === 'dueTime') {
            const normalizedTime = normalizeTimeInput(value)

            if (normalizedTime !== value) {
                setSchedule((prevFields) => ({
                    ...prevFields,
                    [name]: normalizedTime,
                }))
            }
        }
    }

    const handleDateInputChange = (name, value) => {
        const parsed = parseDateInput(value)

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
            [`${name}Input`]: formatDate(newDate),
        }))
    }

    function onSubmit(e) {
        e.preventDefault()

        const finalDueDate = isDueDateSet ? combineDateAndTime(dueDate, dueTime) : null
        const finalStartDate = isStartDateSet ? combineDateAndTime(startDate, null) : null

        onUpdate(task._id, {
            due: finalDueDate,
            dueTime: isDueDateSet ? dueTime : null,
            start: finalStartDate
        })
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
                                    onBlur={handleBlur}
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
