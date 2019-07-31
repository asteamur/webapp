<template>
  <div>
    <em>{{date}}</em>
    <div v-if="!edit" class=marco>
      <div class="text">
        {{text}}
      </div>  
      <b-button class="over" variant="success" @click="setEdit()">Editar</b-button>
    </div>
    <div v-if="edit" class="marco">
      <b-form-textarea        
        rows="6"
        max-rows="6"
        v-model="text"
      >  
      </b-form-textarea>      
      <b-button class="bsave" variant="success" @click="save()">Guardar</b-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Memorandum',
  props: {
    _id: String
  },
  data(){
    return {
      //edit: false
    }
  },
  methods:{
    setEdit(){
      this.$store.commit('memorandum/setEdit', this._id)
    },
    save(){
      this.$store.commit('memorandum/setEdit', null)
    }
  },
  computed: {
    edit(){
      return this._id === this.$store.state.memorandum.edit
    },
    item(){
      return this.$store.state.memorandum.items[this._id]
    },
    author(){
      return this.item.author
    },
    date(){
      return dayjs.unix(this.item.date).format('DD/MM/YYYY')
    },
    text: {
      get(){
        return this.item.text
      },
      set(value){
        this.$store.commit('memorandum/updateItem', {_id: this._id, text: value})
      }
    }
  }
}
</script>

<style scoped lang="scss">

.marco {
  position: relative;
}

.over {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}

.text:hover + .over {
  display: block;
}

.over:hover {
  display: block;
}

.bsave {
  position: absolute;
  bottom: 0;
  right: 0;
}

</style>
