import { combineReducers } from "redux";
import randomCharReducer from "./reducerRandomChar";
import charactersListReducer from './reducerCharactersList';
import charDetailsReducer from "./reducerCharDetails";
import reducerCharFull from "./reducerCharFull";

const rootReducer = combineReducers({
    randomChar: randomCharReducer,
    charactersList: charactersListReducer,
    charDetails: charDetailsReducer,
    charFull: reducerCharFull,
});

export default rootReducer;