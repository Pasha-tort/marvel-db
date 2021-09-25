import { combineReducers } from "redux";
import randomCharReducer from "./reducerRandomChar";
import charactersListReducer from './reducerCharactersList';
import charDetailsReducer from "./reducerCharDetails";
import reducerCharFull from "./reducerCharFull";
import reducerComicsFull from "./reducerComicsFull";
import reducerComicsDetails from "./reducerComicsDetails";
import reducerComicsList from "./reducerComicsList";

const rootReducer = combineReducers({
    randomChar: randomCharReducer,
    charactersList: charactersListReducer,
    charDetails: charDetailsReducer,
    charFull: reducerCharFull,
    comicsList: reducerComicsList,
    comicsDetails: reducerComicsDetails,
    comicsFull: reducerComicsFull,
});

export default rootReducer;