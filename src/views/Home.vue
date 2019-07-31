<template>
  <b-container>
    <b-row align-h="center">
      <b-col sm="8">
        <MSearch @input="searchChange($event)" />
        <hr>
        <div v-for="item in memorandums" :key="item._id">
          <Memorandum :_id="item._id" />
          <hr>
        </div>
        <b-pagination
          v-model="currentPage"
          total-rows="30"
          per-page="10"
    ></b-pagination>
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
  computed: {
    memorandums(){
      return this.$store.getters['memorandum/memorandums']
    }
  },
  methods: {  
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
