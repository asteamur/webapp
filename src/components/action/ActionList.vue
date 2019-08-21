<template>
    <div>
        <b-list-group>
            <b-list-group-item 
                href="#" class="flex-column align-items-start" 
                v-for="item in items" :key="item._id"
                 @click="actionSelected(item)"
                 :disabled="item.dependsOnSelected && !selected"
                >
                <Action :item="item" />
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import Action from './Action.vue'
import actions from './actions'

export default {
  name: 'actionList',
  components:{
      Action
  },
  props: ['type_', 'selected'],
  data(){
    return {

    }
  },
  computed:{
      items(){
          return actions[this.type_].filter( (x) => x.roles.includes(this.$store.state.role))
      }
  },
  methods:{
    actionSelected(item){
        if(item.dependsOnSelected && !this.selected){
            return
        }
        if(item.params === false){ //probar a quitarla
            this.$router.push({name: item.action.name})    
        }else{
            let params = {}
            let query = {}
            if(item.dependsOnSelected){
                params = {_id: this.selected}
            }
            if(item.query){
                query = {...item.query()}
            }
            this.$router.push({name: item.action.name, params, query})    
        }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
