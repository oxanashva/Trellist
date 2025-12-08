import { useEffect, useRef } from 'react';


export const useFocusOnStateChange = (shouldFocus) => {
    const elementRef = useRef(null)

    useEffect(() => {
        if (shouldFocus && elementRef.current) {
            elementRef.current.focus()
        }
    }, [shouldFocus])

    return elementRef;
}