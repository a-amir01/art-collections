
export async function dispatchNewPage(page) {
    return (dispatch) => {
        dispatch({ type: "NEW_PAGE", payload: page });
    };
}