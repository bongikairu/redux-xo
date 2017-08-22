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