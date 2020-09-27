<template>
<div class="polar-chart">
  <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
  <polar-chart v-else :chart-data="datacollection" :options="options"></polar-chart>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PolarChart from '@/components/polar-chart-layout/polar-area'

export default {
  name: 'polar-area-chart',
  components: {
    PolarChart
  },
  computed: {
    ...mapState(['isLoading', 'colors']),
    ...mapGetters(['purchases', 'labels', 'dollarsSpentPerItem', 'numberOfItemsPurchased', 'totalItemsPurchased']),
    angles () {
      return this.numberOfItemsPurchased.map((value) => {
        return this.calculatedAngle(value / this.totalItemsPurchased * 100)
      })
    },
    options () {
      return {
        elements: {
          arc: {
            angle: this.angles
          }
        },
        scale: {
          ticks: {
            z: 3
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 50,
            right: 50
          }
        }
      }
    },
    datacollection () {
      return {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.dollarsSpentPerItem
          }
        ]
      }
    }
  },
  methods: {
    calculatedAngle (percent) {
      return (2 * Math.PI) / (100 / percent)
    }
  }
}
</script>

<style>
.polar-chart {
  text-align: center;
  margin: 15px;
}
</style>
