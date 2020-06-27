import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
	addProcess: ["payload"],
	addAlgorithm: ["payload"],
	addQuantum: ["payload"],
	addMaxTime: ["payload"],
	addProcessQty: ["payload"]
});

/**
 * Handlers
 */
const INITIAL_STATE = {
	process: [],
	algorithm: "",
	quantum: null,
	maxTime: null,
	processQty: null
};

const addProcess = (state = INITIAL_STATE, action) => {
	return { ...state, process: [...state.process, action.payload] };
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
const addProcessQty = (state = INITIAL_STATE, action) => {
	return { ...state, processQty: action.payload };
};

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
	[Types.ADD_PROCESS]: addProcess,
	[Types.ADD_ALGORITHM]: addAlgorithm,
	[Types.ADD_QUANTUM]: addQuantum,
	[Types.ADD_MAX_TIME]: addMaxTime,
	[Types.ADD_PROCESS_QTY]: addProcessQty,
});
