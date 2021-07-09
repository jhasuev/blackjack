import { createStore } from 'vuex'
const store = createStore({
  state: {
    cards: [

      // Clovers
      { name: "Clovers_2", scores: [ 2 ] },
      { name: "Clovers_3", scores: [ 3 ] },
      { name: "Clovers_4", scores: [ 4 ] },
      { name: "Clovers_5", scores: [ 5 ] },
      { name: "Clovers_6", scores: [ 6 ] },
      { name: "Clovers_7", scores: [ 7 ] },
      { name: "Clovers_8", scores: [ 8 ] },
      { name: "Clovers_9", scores: [ 9 ] },
      { name: "Clovers_10", scores: [ 10 ] },
      { name: "Clovers_10", scores: [ 10 ] },
      { name: "Clovers_Jack", scores: [ 10 ] },
      { name: "Clovers_King", scores: [ 10 ] },
      { name: "Clovers_Queen", scores: [ 10 ] },
      { name: "Clovers_A", scores: [ 1, 11 ] },
      
      // Hearts
      { name: "Hearts_2", scores: [ 2 ] },
      { name: "Hearts_3", scores: [ 3 ] },
      { name: "Hearts_4", scores: [ 4 ] },
      { name: "Hearts_5", scores: [ 5 ] },
      { name: "Hearts_6", scores: [ 6 ] },
      { name: "Hearts_7", scores: [ 7 ] },
      { name: "Hearts_8", scores: [ 8 ] },
      { name: "Hearts_9", scores: [ 9 ] },
      { name: "Hearts_10", scores: [ 10 ] },
      { name: "Hearts_10", scores: [ 10 ] },
      { name: "Hearts_Jack", scores: [ 10 ] },
      { name: "Hearts_King", scores: [ 10 ] },
      { name: "Hearts_Queen", scores: [ 10 ] },
      { name: "Hearts_A", scores: [ 1, 11 ] },
      
      // Pikes
      { name: "Pikes_2", scores: [ 2 ] },
      { name: "Pikes_3", scores: [ 3 ] },
      { name: "Pikes_4", scores: [ 4 ] },
      { name: "Pikes_5", scores: [ 5 ] },
      { name: "Pikes_6", scores: [ 6 ] },
      { name: "Pikes_7", scores: [ 7 ] },
      { name: "Pikes_8", scores: [ 8 ] },
      { name: "Pikes_9", scores: [ 9 ] },
      { name: "Pikes_10", scores: [ 10 ] },
      { name: "Pikes_10", scores: [ 10 ] },
      { name: "Pikes_Jack", scores: [ 10 ] },
      { name: "Pikes_King", scores: [ 10 ] },
      { name: "Pikes_Queen", scores: [ 10 ] },
      { name: "Pikes_A", scores: [ 1, 11 ] },
      
      // Tiles
      { name: "Tiles_2", scores: [ 2 ] },
      { name: "Tiles_3", scores: [ 3 ] },
      { name: "Tiles_4", scores: [ 4 ] },
      { name: "Tiles_5", scores: [ 5 ] },
      { name: "Tiles_6", scores: [ 6 ] },
      { name: "Tiles_7", scores: [ 7 ] },
      { name: "Tiles_8", scores: [ 8 ] },
      { name: "Tiles_9", scores: [ 9 ] },
      { name: "Tiles_10", scores: [ 10 ] },
      { name: "Tiles_10", scores: [ 10 ] },
      { name: "Tiles_Jack", scores: [ 10 ] },
      { name: "Tiles_King", scores: [ 10 ] },
      { name: "Tiles_Queen", scores: [ 10 ] },
      { name: "Tiles_A", scores: [ 1, 11 ] },
      
    ],
  },
  getters: {
    getCards: state => state.cards,
  },
})
export default store;
