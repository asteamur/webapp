<template>
  <b-container>
    <b-row align-h="center">      
      <b-col sm="8">
        <h1>Hoja de datos de usuario</h1>
        <h2>Miguel Ángel Alarcos Torrecillas</h2>
        <DatasheetForm @input="saveDatasheet($event)" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import DatasheetForm from '@/components/datasheet/Datasheet.vue'

export default {
  name: 'datasheet',
  components: {
      DatasheetForm
  },
  data(){
    return {

    }
  },
  computed: {

  },
  methods: {
      saveDatasheet(form){
          console.log(form)
      }
  },
  created(){
  },
  watch: {
    '$route'(){

    }
  }
}
</script>

<style scoped lang="scss">

</style>