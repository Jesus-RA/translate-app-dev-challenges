const copyToClipboard = async (text) => {
    try{
        await navigator.clipboard.writeText(text);
    }catch(error){
        console.log({error});
        console.error(error.message)
    }
}

/**
 * Debounces a function execution to the given delay.
 * @param {function} func Function to execute
 * @param {Number} delay Miliseconds to delay the function execution
 * @returns {undefined}
 */
const debounce = (func, delay) => {
    let timeoutID;

    return function(...args){
        // If func trigger has been set, clear it
        if(timeoutID){
            clearTimeout(timeoutID);
        }

        // Set the func execution trigger
        timeoutID = setTimeout(() => func(), delay);
        // This creates the function trigger each time the debounce is executed,
        // so that, func will be executed once the delay finishes after the last debounce call.
    };
}

export { copyToClipboard, debounce };