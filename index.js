const redux = require('redux');

const TOKEN_NONE = "";
const TOKEN_X = "X";
const TOKEN_O = "O";

const STATE_PLAYING = "playing";
const STATE_END_X = "end_x";
const STATE_END_O = "end_o";
const STATE_END_DRAW = "end_draw";

const ACTION_TYPE_PLACE = "PLACE";
const ACTION_TYPE_RESET = "RESET";

const initial_data = {
    '0_0': TOKEN_NONE,
    '0_1': TOKEN_NONE,
    '0_2': TOKEN_NONE,
    '1_0': TOKEN_NONE,
    '1_1': TOKEN_NONE,
    '1_2': TOKEN_NONE,
    '2_0': TOKEN_NONE,
    '2_1': TOKEN_NONE,
    '2_2': TOKEN_NONE,
    "start_player": TOKEN_X,
    "current_player": TOKEN_X,
    "current_state": STATE_PLAYING,
    "winning_line": ["0_0", "0_1", "0_2"]
};

const possible_slots = ["0_0", "0_1", "0_2", "1_0", "1_1", "1_2", "2_0", "2_1", "2_2"];
const win_conditions = [
    ["0_0", "0_1", "0_2"],
    ["1_0", "1_1", "1_2"],
    ["2_0", "2_1", "2_2"],
    ["0_0", "1_0", "2_0"],
    ["0_1", "1_1", "2_1"],
    ["0_2", "1_2", "2_2"],
    ["0_0", "1_1", "2_2"],
    ["0_2", "1_1", "2_0"],
];

const reducer = (state = initial_data, action) => {
    if (state.current_state === STATE_PLAYING) {
        if (action.type === ACTION_TYPE_PLACE) {
            if (possible_slots.indexOf(action.data) >= 0) {
                if (state[action.data] === TOKEN_NONE) {
                    state = {...state};
                    state[action.data] = state.current_player;
                    state.current_player = state.current_player === TOKEN_X ? TOKEN_O : TOKEN_X;
                    // check winning condition
                    const winning_line = win_conditions.find(([a, b, c]) => {
                        return state[a] !== TOKEN_NONE && state[a] === state[b] && state[b] === state[c];
                    });
                    if (winning_line) {
                        const winner = state[winning_line[0]];
                        if (winner === TOKEN_X) state.current_state = STATE_END_X;
                        else state.current_state = STATE_END_O;
                    } else {
                        // check draw condition
                        const unfilled = possible_slots.find((slot) => state[slot] === TOKEN_NONE);
                        if (!unfilled) {
                            state.current_state = STATE_END_DRAW;
                        }
                    }
                }
            }
        }
    }
    if (action.type === ACTION_TYPE_RESET) {
        const new_start_player = state.start_player === TOKEN_X ? TOKEN_O : TOKEN_X;
        state = {...initial_data};
        state.start_player = new_start_player;
        state.current_player = state.start_player;
    }
    return state;
};

const store = redux.createStore(reducer);

const action_place = (pos) => {
    return {
        "type": ACTION_TYPE_PLACE,
        "data": pos
    }
};

const action_reset = () => {
    return {
        "type": ACTION_TYPE_RESET
    }
};


const debug = (data) => {
    console.log("");
    console.log("  0  1  2");
    console.log("");
    console.log("0 " + (data["0_0"] || " ") + "|" + (data["0_1"] || " ") + "|" + (data["0_2"] || " "));
    console.log("  ------");
    console.log("1 " + (data["1_0"] || " ") + "|" + (data["1_1"] || " ") + "|" + (data["1_2"] || " "));
    console.log("  ------");
    console.log("2 " + (data["2_0"] || " ") + "|" + (data["2_1"] || " ") + "|" + (data["2_2"] || " "));
    console.log("");
    if (data.current_state !== STATE_PLAYING) {
        console.log(data.current_state);
    } else {
        console.log(`Current turn is ${data.current_player}`)
    }
    console.log("");
};

// debug();
// store.dispatch(action_place("0_0"));
// debug();
// store.dispatch(action_place("1_0"));
// debug();
// store.dispatch(action_place("0_1"));
// debug();
// store.dispatch(action_place("1_1"));
// debug();
// store.dispatch(action_place("0_2"));
// debug();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (store) => {
    debug(store.getState());
    rl.question('> ', (answer) => {
        if (answer === 'reset') {
            store.dispatch(action_reset());
        } else if (possible_slots.indexOf(answer) >= 0) {
            store.dispatch(action_place(answer));

        } else {
            console.log("Type in \"0_0\" for topleft corner or \"reset\" to reset (no quote)")
        }
        ask(store)
    });
};
ask(store);

//
// let x = [
//     {
//         id: 1,
//         name: "x"
//     },
//     {
//         id: 2,
//         name: "y"
//     }
// ];
//
// console.log(x);
// x = x.map((l) => {
//     if (l.id === 2) {
//         return {
//             id: 2,
//             name: "new"
//         }
//     } else {
//         return l;
//     }
// });
// console.log(x);
//
// console.log(x.filter(x => x.name === 'new'));
//
// console.log(x.filter(x => {
//     return x.name === 'new'
// }));
//
// const z = (x) => {
//     return {
//         'a': 1
//     }
// };
//
// const z2 = (x) => {
//     'a': 1
// }
//
// const y = (x) => ({
//     'a': 1
// });
//
// function x(a, b) {
//     console.log(this, a, b);
// }
//
// x();
//
// const x2 = x.bind("123");
//
// x2();
//
//
// x.apply("123", [4, 5]);
//
// x(...[4, 5]);
//
// function connect_server(url, id, password) {
//     console.log(url, id, password)
// }
//
// let param = [
//     "http://asdsdsa.dasd.das/",
//     "yyy",
//     "zzz"
// ];
//
// connect_server(param[0],param[1],param[2]);
// connect_server(...param);
//
// function log(...args) {
//     console.log(args);
// }
//
// log(1,2,3,4,5);