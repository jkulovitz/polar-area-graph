<template>
    <v-dialog width="600" v-model="dialogOpen">
      <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="editedItem.numberPurchased" label="Number Purchased" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="editedItem.price" label="Price" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="px-3">
              <v-col>
                <v-btn outlined block @click="closeDialog">Cancel</v-btn>
              </v-col>
              <v-col>
                <v-btn depressed block color="primary" @click="saveItem">Save</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'edit-dialog',
  computed: {
    ...mapState(['editedItem', 'editIndex', 'editDialogOpen']),
    formTitle () {
      return this.editIndex === -1 ? 'New Item' : 'Edit Item'
    },
    dialogOpen: {
      get () {
        return this.editDialogOpen
      },
      set () {
        this.closeDialog()
      }
    }
  },
  methods: {
    ...mapActions(['closeDialog', 'saveUpdatedItem', 'getPurchases', 'saveNewPurchase']),
    saveItem () {
      if (this.editIndex === -1) {
        this.saveNewPurchase().then(() => {
          this.getPurchases()
        })
      } else {
        this.saveUpdatedItem().then(() => {
          this.getPurchases()
        })
      }
      this.closeDialog()
    }
  }
}
</script>

<style>

</style>
