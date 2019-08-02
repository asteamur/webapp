<template>
  <b-container>
    <b-row align-h="center">      
      <b-col sm="4">
        <h1>Usuarios</h1>
        <hr>
        <teaList :items="teas"/>        
      </b-col>
      <b-col sm="4">
        <h1>Acciones</h1>
        <hr>  
        <ActionList type_="tea" />    
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import teaList from '@/components/tea/teaList.vue'
import ActionList from '@/components/action/ActionList.vue'

export default {
  name: 'home',
  components: {
    teaList,
    ActionList
  },
  data(){
    return {
      
    }
  },
  computed: {
    teas(){
      return this.$store.getters['tea/teas']
    }
  },
  methods: {
    
  },
  created(){
    
  },
  watch: {
    
  }
}
</script>

<style scoped lang="scss">

</style>