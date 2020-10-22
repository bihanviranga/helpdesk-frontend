const initialState = {
    timelines: []
}

const timelineReducer = (state = initialState, action) => {
    if (action.type == "FETCH_TICKET_TIMELINE_FULFILLED") {
        const index = state.timelines.findIndex(tl => tl.ticketId === action.payload.ticketId);
        let newTimelines = [...state.timelines];

        if (index == -1) {
            newTimelines = 	newTimelines.concat(action.payload);
        } else {
            newTimelines[index] = action.payload;
        }

        return {
            ...state,
            timelines: newTimelines
        }
    } else {
        return state;
    }
}

export default timelineReducer;
