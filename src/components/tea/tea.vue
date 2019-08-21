<template>
<div>
    <!--<div class="d-flex w-100 justify-content-between">
      -->
    <div>  
      <h5 class="mb-1"><b>{{item.name}}</b></h5>
      <small>{{item.dateOfBirth | age}}</small>
    </div>

    <p class="mb-1">
    {{item.head}}, {{item.center}}
    </p>

    <small>...</small>
</div>  
</template>

<script>

export default {
  name: 'tea',
  props: ['item'],
  data(){
    return {

    }
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">

</style>
