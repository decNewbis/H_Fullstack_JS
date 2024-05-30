export function debounce(func, delay) {
    let timeoutId;
    return function(...arg) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...arg)
        }, delay)
    }
}
