<template>
<div>
    <b-row>
        <b-col md="2">
            <span>Fecha inicio</span>
        </b-col>
        <b-col md="3">  
            <b-form-input type="date" v-model="dateInit"></b-form-input>
        </b-col>
        <b-col md="2">
            <span>Fecha fin</span>
        </b-col>
        <b-col md="3">
            <b-form-input type="date" v-model="dateEnd"></b-form-input>          
        </b-col>
        <b-col md="2">
            <b-button variant="outline-primary" @click="search">Buscar</b-button>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
  name: 'MemorandumSearch',
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
