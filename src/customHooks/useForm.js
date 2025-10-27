import { useState } from "react"
import {
    parseDateInput,
    formatDate,
    normalizeDateInput,
    normalizeTimeInput
} from "../services/date.service"

export const useForm = (initialState) => {
    const [fields, setFields] = useState(initialState)

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = checked
                break

            default: break
        }
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    function handleBlur({ target }) {
        const { name, value } = target

        if (name.toLowerCase().includes('time')) {
            const normalizedTime = normalizeTimeInput(value)

            if (normalizedTime !== value) {
                setFields((prevFields) => ({
                    ...prevFields,
                    [name]: normalizedTime,
                }))
            }
        }

        else if (name.toLowerCase().includes("date")) {
            const normalizedDateString = normalizeDateInput(value)

            if (normalizedDateString !== value) {
                const parsedDate = parseDateInput(normalizedDateString)

                if (parsedDate && parsedDate.isValid()) {
                    setFields(prev => ({
                        ...prev,
                        [`${name}Input`]: normalizedDateString,
                        [name]: parsedDate,
                    }))
                }
            }
        }
    }

    function handleDateInputChange(name, value) {
        const parsed = parseDateInput(value)

        setFields(prev => ({
            ...prev,
            [`${name}Input`]: value,
            ...(parsed && parsed.isValid() ? { [name]: parsed } : {}),
        }))
    }

    function handleCalendarChange(name, newDate) {
        setFields(prevFields => ({
            ...prevFields,
            [name]: newDate,
            [`${name}Input`]: formatDate(newDate),
        }))
    }


    return [fields, setFields, handleChange, handleBlur, handleDateInputChange, handleCalendarChange]
}