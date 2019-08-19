<template>
<div>
    <!--<div class="d-flex w-100 justify-content-between">
      -->
    <div>  
      <h5 class="mb-1"><b>{{item.name}}</b></h5>
      <small>{{age(item)}}</small>
    </div>

    <p class="mb-1">
    {{item.head}}, {{item.center}}
    </p>

    <small>...</small>
</div>  
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'tea',
  props: ['item'],
  data(){
    return {

    }
  },
  methods:{
    age(item){
      const years = dayjs().diff(dayjs(item.dateOfBirth), 'year')
      const months = dayjs().diff(dayjs(item.dateOfBirth), 'month') - 12*years
      if(months === 0){
        return years + " años"
      }else{
        return years + " años y " + months + " meses"
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
