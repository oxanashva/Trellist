import { formatDate, formatTime, createDate, combineDateAndTime } from "../../services/date.service"

import { useFocusOnStateChange } from "../../customHooks/useFocusOnStateChange"
import { useForm } from "../../customHooks/useForm"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

import CheckboxCheckIcon from "../../assets/images/icons/checkbox-check.svg?react"

export function DatePicker({ task, onClose, onUpdateTask }) {
    // TODO: implement start date support and range calendar

    const initialState = {
        isStartDateSet: task.start ? true : false,
        startDate: createDate(task.start),
        startDateInput: formatDate(task.start),
        isDueDateSet: true,
        dueDate: createDate(task.due, 1),
        dueDateInput: formatDate(task.due),
        dueTime: formatTime(task.dueTime),
    }

    const [fields, setFields, handleChange, handleBlur, handleDateInputChange, handleCalendarChange] = useForm(initialState)


    const {
        isStartDateSet,
        startDate,
        startDateInput,
        isDueDateSet,
        dueDate,
        dueDateInput,
        dueTime,
    } = fields

    const startDateInputRef = useFocusOnStateChange(isStartDateSet)
    const dueDateInputRef = useFocusOnStateChange(isDueDateSet)

    // TODO: normalize input if it remains focused on submit
    function onSubmit(e) {
        e.preventDefault()

        const finalDueDate = isDueDateSet ? combineDateAndTime(dueDate, dueTime) : null
        const finalStartDate = isStartDateSet ? combineDateAndTime(startDate, null) : null

        onUpdateTask(task.idBoard, {
            due: finalDueDate,
            dueTime: isDueDateSet ? dueTime : null,
            start: finalStartDate
        })
        onClose()
    }

    // TODO: implement submit on enter

    function onRemove() {
        onUpdateTask(task.idBoard, { due: null, dueTime: null, start: null })
        onClose()
    }

    // TODO: move renderCalendar to separate component
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
                            },
                            "& .MuiPickersArrowSwitcher-button": {
                                paddingInline: "5px",
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


            <div className="date-editor">
                <form onSubmit={onSubmit}>
                    <div className="calendar-container">
                        <div className="date-field-container">
                            <fieldset>
                                <legend className="picker-subtitle">Due Date</legend>
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
                                        onBlur={handleBlur}
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

                        {/* TODO: add start date support or implement range calendar */}
                        {/* <div className="divider"></div>

                        <div className="date-field-container">
                            <fieldset>
                                <legend className="picker-subtitle">Start Date</legend>
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
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {renderCalendar("startDate")}
                            </fieldset>
                        </div> */}
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
