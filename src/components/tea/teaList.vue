<template>
    <div>
        <b-list-group>
            <b-list-group-item :active="selected(item._id)" 
                href="#" class="flex-column align-items-start" 
                v-for="item in items" :key="item._id"
                 @click="setSelected(item._id)"
                >
                <Tea :item="item" />
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import Tea from './tea'

export default {
  name: 'teaList',
  components:{
      Tea
  },
  props: {
      items: Array
  },
  data(){
    return {

    }
  },
  computed:{
      
  },
  methods:{
    setSelected(_id){
        console.log(_id)
        this.$store.commit('tea/setSelected', _id)
    },
    selected(_id){
        return this.$store.getters['tea/selected'] == _id
    }
  }
}
</script>

<style scoped lang="scss">

</style>
