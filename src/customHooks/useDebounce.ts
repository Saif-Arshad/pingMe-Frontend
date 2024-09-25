import { useState, useEffect } from 'react';

function useDebounce(value: any, delay: any) {
    const [debouncedValue, setDebouncedValue] = useState(
        typeof value === 'string' ? value.toLowerCase() : value
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(
                typeof value === 'string' ? value.toLowerCase() : value
            );
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
