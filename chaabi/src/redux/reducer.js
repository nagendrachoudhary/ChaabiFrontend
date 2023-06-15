const initialState = {
    current_prompt: "",
    total_words_count: 0,
    timer_value: 300,
    prev_timer_value: 300,
    speed: 0,
    total_keys_pressed: 0,
    total_typos: 0,
    accuracy: 0,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_PROMPT":
            return {
                ...state,
                current_prompt: action.payload,
            }
        case "UPDATE_SCORE":

            // calculating accuracy (in %)
            const keysPressed = action.payload.keysPressed;
            const typos = action.payload.typos;

            const correctKeys = keysPressed - typos;

            let accuracy = Math.round((correctKeys / keysPressed) * 100);

            // updating total keys pressed
            let total_keys_pressed = state.total_keys_pressed + keysPressed;
            let total_typos = state.total_typos + typos;

            // calculating the typing speed (in wpm)
            let minutes = (-state.timer_value +state.prev_timer_value) / 60;

            let speed = Math.round(5 / minutes);

            // setting the current timer value as previous timer value for next time
            state.prev_timer_value = state.timer_value;

            return {
                ...state,
                accuracy,
                speed,
                total_keys_pressed,
                total_typos,
                total_words_count: state.total_words_count + 5,
            }
        case "UPDATE_TIMER":
            return {
                ...state,
                timer_value: action.payload,
            }
        case "START_NEW_GAME":
            return initialState;
        default:
            return state;
    }
}

export default reducer;