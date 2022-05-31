// ! ACTION
// Initialisation des variables
const BUY_PHONE = 'BUY_PHONE';
const BUY_TABLET = 'BUY_TABLET';
const BUY_TV = 'BUY_TV';

// Mise en place d'une action
function buyPhone () {
    return {type: BUY_PHONE};
};
// Mise en place d'une autre action
function buyTablet () {
    return {type: BUY_TABLET};
};
// Mise en place d'une autre action
function buyTv () {
    return {type: BUY_TV};
};

//! REDUCER
const mobilityInitialState = {
    phones: 5,
    tablets: 10,
};

const homeInitialState = {
    tvs: 20
};

const mobilityReducer = (state = mobilityInitialState, action) => {

    switch (action.type) {

        case BUY_PHONE:
            return {
                ...state,
                phones: state.phones - 1
            };
            break; 

        case BUY_TABLET:
            return {
                ...state,
                tablets: state.tablets - 1
            } 

        default: return state
    }
};

const homeReducer = (state = homeInitialState, action) => {

    switch (action.type) {

        case BUY_TV:
            return {
                ...state,
                tvs: state.tvs - 1
            };

        default: return state
    }
};

// ! STORE
const rootReducer = Redux.combineReducers({
    mobility: mobilityReducer,
    home: homeReducer
})
const store = Redux.createStore(rootReducer);

// store.getState() => Rattachement du state dans un élément du DOM
const availablePhones = document.getElementById('countPhone');
availablePhones.innerHTML = store.getState().mobility.phones;
const availableTablets = document.getElementById('countTablet');
availableTablets.innerHTML = store.getState().mobility.tablets;
const availableTvs = document.getElementById('countTv');
availableTvs.innerHTML = store.getState().home.tvs;
console.log(store.getState());

// store.dispatch() => Lancer le dispatch de l'action
document.getElementById('buy-phone').addEventListener('click', function () {
    store.dispatch(buyPhone());
});
document.getElementById('buy-tablet').addEventListener('click', function () {
    store.dispatch(buyTablet());
})
document.getElementById('buy-tv').addEventListener('click', function () {
    store.dispatch(buyTv());
})

// store.suscribe() => listener qui modifie au changement du state
store.subscribe(() => {
    availablePhones.innerHTML = store.getState().mobility.phones;
    availableTablets.innerHTML = store.getState().mobility.tablets;
    availableTvs.innerHTML = store.getState().home.tvs;
    console.log('updated stocks', store.getState());
})