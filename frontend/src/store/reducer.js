import { combineReducers } from "redux";
import snackbarReducer from "./slices/snackbar";
import accountReducer from "./account";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import themeReducer from "./slices/theme";
import topicsReducer from "./slices/topics";

const rootPersistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["account", "theme", "cart", "user"],
};

const reducer = combineReducers({
    account: accountReducer,
    snackbar: snackbarReducer,
    theme: themeReducer,
    topics: topicsReducer,
});

export default persistReducer(rootPersistConfig, reducer);
