<template>
<div>
    <b-row>
        <b-col>  
            <datepicker v-model="dateInit" placeholder="fecha inicio"></datepicker>
        </b-col>
        <b-col>
            <datepicker v-model="dateEnd" placeholder="fecha fin"></datepicker>
        </b-col>
        <b-col>
            <b-button variant="outline-primary" @click="search">Buscar</b-button>
        </b-col>
    </b-row>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'MemorandumSearch',
  components:{
    Datepicker
  },
  data(){
    return {
      dateInit: null,
      dateEnd: null
    }
  },
  methods:{
    search(){
        this.$emit('input', {dateInit: this.dateInit, dateEnd: this.dateEnd})
    }
  }
}
</script>

<style scoped lang="scss">

</style>
