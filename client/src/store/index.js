import Vue from 'vue'
import Vuex from 'vuex'
import PurchaseService from '@/services/purchaseService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    purchases: [],
    isLoading: false,
    colors: ['#b3045d', '#e4b847', '#9fd041', '#72bf76', '#6d9fe4', '#381d8e', '#6e0081', '#7a5000', '#404040'],
    editDialogOpen: false,
    editIndex: -1,
    defaultItem: {
      description: '',
      numberPurchased: 0,
      price: 0
    },
    editedItem: {
      description: '',
      numberPurchased: 0,
      price: 0
    }
  },

  mutations: {
    setPurchases (state, data) {
      state.purchases = data
    },
    setLoading (state, status) {
      state.isLoading = status
    },
    setDialog (state, status) {
      state.editDialogOpen = status
    },
    setEditIndex (state, value) {
      state.editIndex = value
    },
    setEditItem (state, item) {
      state.editedItem = item
    }
  },

  actions: {
    getPurchases (context) {
      context.commit('setLoading', true)
      return PurchaseService.getPurchases().then((data) => {
        context.commit('setPurchases', data)
        context.commit('setLoading', false)
      })
    },
    deletePurchase (context, item) {
      return PurchaseService.deletePurchase(item.id)
    },
    editPurchase (context, item) {
      context.commit('setEditItem', item)
    },
    closeDialog ({ commit, state }) {
      commit('setDialog', false)
      commit('setEditItem', state.defaultItem)
      commit('setEditIndex', -1)
    },
    saveUpdatedItem (context) {
      const forApiObj = context.state.editedItem
      delete forApiObj.color
      delete forApiObj.dollarsPercentPercent
      delete forApiObj.numberPurchasedPercent
      return PurchaseService.editPurchase(forApiObj.id, forApiObj)
    },
    saveNewPurchase (context) {
      return PurchaseService.saveNewPurchase(context.state.editedItem)
    }
  },

  getters: {
    purchases: (state) => {
      return Object.values(state.purchases)
    },
    labels: (state, getters) => {
      return getters.purchases.map(item => item.description)
    },
    dollarsSpentPerItem: (state, getters) => {
      return getters.purchases.map(item => item.price)
    },
    totalDollarsSpent: (state, getters) => {
      return getters.dollarsSpentPerItem.reduce((a, b) => a + b)
    },
    numberOfItemsPurchased: (state, getters) => {
      return getters.purchases.map(item => item.numberPurchased)
    },
    totalItemsPurchased: (state, getters) => {
      return getters.numberOfItemsPurchased.reduce((a, b) => a + b)
    }
  }
})
