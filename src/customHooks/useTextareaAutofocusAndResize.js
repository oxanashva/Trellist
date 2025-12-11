import { useEffect, useRef } from 'react';

export const useTextareaAutofocusAndResize = (value, isEditing) => {
    const textareaRef = useRef(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [value, isEditing])

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.select()
            textareaRef.current.focus()
        }
    }, [isEditing])

    return textareaRef
}