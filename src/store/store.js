import { createStore, combineReducers,applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { chatContainer } from "./chatContainer";
import { userInfo } from "./userContainer";
import Chats from "./messages";

const rootReducer = combineReducers({
  chatContainer,
  userInfo,
  Chats
});

export const store = createStore(rootReducer,applyMiddleware(thunk));
