<template>
  <b-container>
    <b-row align-h="center">      
      <b-col sm="8">
        <h1>Memorandum</h1>
        <em class="mt-3" style="float: right;">{{dateOfBirth | age}}</em>
        <h2>{{name}}</h2>        
        <b-button variant="outline-primary" @click="last7days()">Últimos 7 días</b-button>
        <b-button class="ml-2" variant="outline-primary" @click="lastmonth()">Último mes</b-button>
        <b-button style="float: right;" variant="outline-success" @click="newMemorandum">Nuevo</b-button>
        <hr>
        <MSearch @input="searchChange($event)" />
        <hr>
        <div v-for="item in memorandums" :key="item._id">
          <Memorandum :_id="item._id" />
          <hr>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Memorandum from '@/components/memorandum/Memorandum.vue'
import MSearch from '@/components/memorandum/Search.vue'

export default {
  name: 'home',
  components: {
    Memorandum,
    MSearch
  },
  data(){
    return {
      currentPage: 1,
      dateInit: null,
      dateEnd: null
    }
  },
  filters: {
    
  },
  computed: {
    dateOfBirth(){
      return this.tea && (this.tea.dateOfBirth || '')
    },
    name(){
      return this.tea && (this.tea.name || '')
    },
    tea(){
      return this.$store.getters['tea/teaById'](this.$route.params._id)
    },
    memorandums(){
      return this.$store.getters['memorandum/memorandums']
    }
  },
  methods: {
    newMemorandum(){
      this.$store.dispatch('memorandum/post', {tea_id: this.$route.params._id, text: ''})
    },
    last7days(){
      this.$router.push({query: {since: 7}})
      //const dateInit = dayjs().add(-7, 'day')
      //const dateEnd = dayjs()
      //this.$router.push({query: {dateInit: dateInit.format('YYYY-MM-DD'), 
                                 //dateEnd: dateEnd.format('YYYY-MM-DD')
                                 //}})
    },  
    lastmonth(){
      this.$router.push({query: {since: 30}})
      /*const dateInit = dayjs().add(-1, 'month')
      const dateEnd = dayjs()
      this.$router.push({query: {dateInit: dateInit.format('YYYY-MM-DD'), 
                                 dateEnd: dateEnd.format('YYYY-MM-DD')
                                 }})*/
    },  
    searchChange({dateInit, dateEnd}){
      this.$router.push({query: {dateInit, dateEnd}})
    }
  },
  created(){
    this.$store.dispatch('tea/fetchOne', this.$route.params._id)
    let { since, dateInit, dateEnd } = this.$route.query
    if(dateInit === undefined && dateEnd === undefined){
      since = since || 7
    }
    this.$store.dispatch('memorandum/fetch', {tea_id: this.$route.params._id, 
                                              since, dateInit, dateEnd})
  },
  watch: {
    '$route'(to){
      this.$store.dispatch('memorandum/fetch', to.query)
    }
  }
}
</script>

<style scoped lang="scss">

</style>