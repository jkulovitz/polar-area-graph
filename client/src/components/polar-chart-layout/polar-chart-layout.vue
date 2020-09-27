<template>
  <div>
    <polar-area-chart></polar-area-chart>
    <polar-area-table></polar-area-table>
    <edit-dialog></edit-dialog>
  </div>
</template>

<script>
import PolarAreaChart from '@/components/polar-chart-layout/polar-area-chart'
import PolarAreaTable from '@/components/polar-chart-layout/polar-area-table'
import EditDialog from '@/components/polar-chart-layout/edit-dialog'

export default {
  name: 'polar-chart-layout',
  components: {
    PolarAreaChart,
    PolarAreaTable,
    EditDialog
  }
}
</script>

<style>

</style>
