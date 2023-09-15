import { combineReducers} from "redux";
import snackbarReducer from "./slices/snackbar";
import accountReducer from "./account";
import storage from "redux-persist/lib/storage";
import { persistReducer} from "redux-persist";
import themeReducer from "./slices/theme";
import roomsReducer from "./slices/rooms";
import filteredRoomsReducer from "./slices/filteredRooms";

const rootPersistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["account", "theme", "cart", "user" , "rooms"],
};

const reducer = combineReducers({
    account: accountReducer,
    snackbar: snackbarReducer,
    theme: themeReducer,
    rooms: roomsReducer,
    filteredRooms : filteredRoomsReducer,
});

export default persistReducer(rootPersistConfig, reducer);
