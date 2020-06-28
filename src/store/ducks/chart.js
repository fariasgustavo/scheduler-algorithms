import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
    showChart: ["payload"],
    showSelectAlgorithm: ["payload"]
});

/**
 * Handlers
 */
const INITIAL_STATE = {
    showChart: false,
    showSelectAlgorithm: false,
};

const showChart = (state = INITIAL_STATE, action) => {
	return { ...state, showChart: action.payload };
};

const showSelectAlgorithm = (state = INITIAL_STATE, action) => {
	return { ...state, showSelectAlgorithm: action.payload };
};

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
    [Types.SHOW_CHART]: showChart,
    [Types.SHOW_SELECT_ALGORITHM]: showSelectAlgorithm,
});
