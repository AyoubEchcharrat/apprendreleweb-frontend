export const handlePendingEvent = (state) => {
    state.loading = true
    state.error = null
}


export const handleRejectedEvent = (state, { payload }) => {
    state.loading = false
    state.error = payload
}