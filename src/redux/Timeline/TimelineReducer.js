const initialState = {
    timelines: []
}

const timelineReducer = (state = initialState, action) => {
    if (action.type == "FETCH_TICKET_TIMELINE_FULFILLED") {
        return {
            ...state,
            timelines: state.timelines.concat(action.payload)
        }
    } else {
        return state;
    }
}

export default timelineReducer;
