<template>
  <b-container>
    <b-row align-h="center">      
      <b-col sm="8">
        <h1>Memorandum</h1>
        <em class="mt-3" style="float: right;">8 años</em>
        <h2>Miguel Ángel Alarcos Torrecillas</h2>        
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
import dayjs from 'dayjs'
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
  computed: {
    memorandums(){
      return this.$store.getters['memorandum/memorandums']
    }
  },
  methods: {
    newMemorandum(){
      this.$store.dispatch('memorandum/newItem', {author: 'miguel', text: '', date: dayjs().unix()})
    },
    last7days(){
      const dateInit = dayjs().add(-7, 'day')
      const dateEnd = dayjs()
      this.$router.push({query: {dateInit: dateInit.format('YYYY-MM-DD'), 
                                 dateEnd: dateEnd.format('YYYY-MM-DD')
                                 }})
    },  
    lastmonth(){
      const dateInit = dayjs().add(-1, 'month')
      const dateEnd = dayjs()
      this.$router.push({query: {dateInit: dateInit.format('YYYY-MM-DD'), 
                                 dateEnd: dateEnd.format('YYYY-MM-DD')
                                 }})
    },  
    searchChange({dateInit, dateEnd}){
      this.$router.push({query: {dateInit, dateEnd}})
    }
  },
  watch: {
    '$route'(to){
      const {dateInit, dateEnd} = to.query
      this.$store.dispatch('memorandum/searchMemorandums', {dateInit, dateEnd})
    }
  }
}
</script>

<style scoped lang="scss">

</style>