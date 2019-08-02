<template>
    <div>
        <b-list-group>
            <b-list-group-item 
                href="#" class="flex-column align-items-start" 
                v-for="item in items" :key="item._id"
                 @click="actionSelected(item)"
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
  props: ['type_'],
  data(){
    return {

    }
  },
  computed:{
      items(){
          return actions[this.type_].filter( (x) => x.roles.includes(this.$store.state.rol))
      }
  },
  methods:{
    actionSelected(item){
        let params = {}
        if(this.type_ === 'tea'){
            params = {_id: this.$store.state.userId}
        }
        this.$router.push({name: item.action.name, params})
    }
  }
}
</script>

<style scoped lang="scss">

</style>
