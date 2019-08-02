<template>
<div>
    <div>  
      <h5 class="mb-1"><b>{{item.title}}</b></h5>
    </div>
    <p class="mb-1">
    {{item.description}}
    </p>
</div>  
</template>

<script>
export default {
  name: 'action',
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
