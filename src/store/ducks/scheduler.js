import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
	addProcess: ["payload"],
	addAlgorithm: ["payload"],
	addQuantum: ["payload"],
	addMaxTime: ["payload"],
});

/**
 * Handlers
 */
const INITIAL_STATE = {
	process: [],
	algorithm: "",
	quantum: null,
	maxTime: null,
};

const addProcess = (state = INITIAL_STATE, action) => {
	return { ...state, process: action.payload };
};
const addAlgorithm = (state = INITIAL_STATE, action) => {
	return { ...state, algorithm: action.payload };
};
const addQuantum = (state = INITIAL_STATE, action) => {
	return { ...state, quantum: action.payload };
};
const addMaxTime = (state = INITIAL_STATE, action) => {
	return { ...state, maxTime: action.payload };
};

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
	[Types.ADD_PROCESS]: addProcess,
	[Types.ADD_PROCESS]: addAlgorithm,
	[Types.ADD_PROCESS]: addQuantum,
	[Types.ADD_PROCESS]: addMaxTime,
});
