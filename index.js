const redux = require('redux');

const initial_data = {
    '0_0': "",
    '0_1': "",
    '0_2': "",
    '1_0': "",
    '1_1': "",
    '1_2': "",
    '2_0': "",
    '2_1': "",
    '2_2': "",
    "current_player": "X",
    "current_state": "playing"
};

const reducer = (state = initial_data, action) => {
    return state;
};

const store = redux.createStore(reducer);

const debug = () => {
    let data = store.getState();
    console.log((data["0_0"] || " ") + "|" + (data["0_1"] || " ") + "|" + (data["0_2"] || " "));
    console.log("------");
    console.log((data["1_0"] || " ") + "|" + (data["1_1"] || " ") + "|" + (data["1_2"] || " "));
    console.log("------");
    console.log((data["2_0"] || " ") + "|" + (data["2_1"] || " ") + "|" + (data["2_2"] || " "));
    console.log("");
    console.log("");
};

const action_place = (pos) => {
    return {
        "type": "PLACE",
        "data": pos
    }
};

debug();
store.dispatch(action_place("0_0"));
debug();
store.dispatch(action_place("1_0"));
debug();
store.dispatch(action_place("0_1"));
debug();
store.dispatch(action_place("1_1"));
debug();
store.dispatch(action_place("0_2"));
debug();