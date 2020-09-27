<template>
  <v-app>
    <polar-chart-layout></polar-chart-layout>
  </v-app>
</template>

<script>
import PolarChartLayout from '@/components/polar-chart-layout/polar-chart-layout'

export default {
  name: 'App',
  components: {
    PolarChartLayout
  }
}
</script>
