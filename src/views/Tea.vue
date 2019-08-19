<template>
  <b-container>
    <b-row align-h="center">
      <search-box @input="changeQueryName"></search-box>
    </b-row>
    <b-row align-h="center">      
      <b-col sm="4">
        <h1>Usuarios</h1>
        <hr>
        <teaList :items="teas"/>        
      </b-col>
      <b-col sm="4">
        <h1>Acciones</h1>
        <hr>  
        <ActionList :selected="selected" type_="tea" />    
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import teaList from '@/components/tea/teaList.vue'
import ActionList from '@/components/action/ActionList.vue'
import SearchBox from '@/components/lib/SearchBox.vue'

export default {
  name: 'home',
  components: {
    teaList,
    ActionList,
    SearchBox
  },
  data(){
    return {
      
    }
  },
  computed: {
    teas(){
      return this.$store.getters['tea/teas']
    },
    selected(){
      return this.$store.getters['tea/selected']
    }
  },
  methods: {
    changeQueryName(q){
      this.$router.replace({query: {name: q}})
    }
  },
  created(){
    this.$store.dispatch('tea/fetch', this.$route.query)
  },
  watch: {
    '$route'(to){
      const query = to.query
      this.$store.dispatch('tea/fetch', query)
    }
  }
}
</script>

<style scoped lang="scss">

</style>