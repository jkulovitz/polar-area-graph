<template>
    <v-data-table
      :headers="headers"
      :items="tableMetrics"
      :loading="isLoading"
      hide-default-footer
      :options.sync="options"
      dense
      class="polar-area-table"
    >
      <template v-slot:[`item.description`]="{ item }">
        <v-avatar :color="item.color" size="12" tile></v-avatar>
        {{item.description}}
      </template>

      <template v-slot:[`item.numberPurchasedPercent`]="{ item }">
        {{Math.round(item.numberPurchasedPercent)}}%
      </template>

      <template v-slot:[`item.dollarsPercentPercent`]="{ item }">
        {{Math.round(item.dollarsPercentPercent)}}%
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editPurchaseInTable(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deletePurchaseFromTable(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:[`footer`]="{ props }">
        <v-btn outlined small class="mt-5" @click="addPurchase()">Add New Purchase</v-btn>
        <v-data-footer
          :pagination="props.pagination"
          :options="options"
          items-per-page-text="$vuetify.dataTable.itemsPerPageText"
          @update:options="updateOptions($event)"
          class="modified-footer"
        ></v-data-footer>
      </template>
    </v-data-table>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'polar-area-table',
  data: () => ({
    headers: [
      { text: 'Description', value: 'description' },
      { text: 'Number Purchased', value: 'numberPurchased' },
      { text: 'Number Purchased %', value: 'numberPurchasedPercent' },
      { text: 'Total Price', value: 'price' },
      { text: 'Total Price %', value: 'dollarsPercentPercent' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    options: {
      page: 1,
      itemsPerPage: 10
    }
  }),
  computed: {
    ...mapState(['isLoading', 'colors']),
    ...mapGetters(['purchases', 'dollarsSpentPerItem', 'totalDollarsSpent', 'numberOfItemsPurchased', 'totalItemsPurchased']),
    tableMetrics () {
      var metrics = this.purchases.map((obj, key) => {
        const newObj = obj
        newObj.color = this.colors[key]
        newObj.numberPurchasedPercent = this.numberOfItemsPurchased[key] / this.totalItemsPurchased * 100
        newObj.dollarsPercentPercent = this.dollarsSpentPerItem[key] / this.totalDollarsSpent * 100
        return newObj
      })
      return metrics
    }
  },
  methods: {
    ...mapActions(['deletePurchase', 'getPurchases', 'editPurchase']),
    ...mapMutations(['setDialog', 'setEditIndex']),
    updateOptions (val) {
      this.options = val
    },
    deletePurchaseFromTable (item) {
      this.deletePurchase(item).then(() => {
        this.getPurchases()
      })
    },
    editPurchaseInTable (item) {
      this.setEditIndex(this.purchases.indexOf(item))
      this.editPurchase(item)
      this.setDialog(true)
    },
    addPurchase () {
      this.setEditIndex(-1)
      this.setDialog(true)
    }
  }
}
</script>

<style scoped>
.polar-area-table {
  width: 60%;
  margin: 15px auto;
}
.theme--light.v-data-table .v-data-footer.modified-footer{
  border-top: none;
  float: right;
}
</style>
