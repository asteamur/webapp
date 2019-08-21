<template>
  <div>
    <em class="text-success">{{date}}</em>
    <em class="author text-info">{{author}}</em>
    <div v-if="!edit" class=marco>
      <div class="text">
        {{text}}
      </div>  
      <b-button v-if="isAuthor"
        class="over" variant="success" @click="setEdit()">Editar</b-button>
    </div>
    <div v-if="edit" class="marco">
      <b-form-textarea    
        autofocus
        @input="change"    
        rows="6"
        max-rows="6"
        v-model="text"
      >  
      </b-form-textarea>      
      <b-button class="bsave" variant="success" @click="save(true)">Guardar</b-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

export default {
  name: 'Memorandum',
  props: {
    _id: String
  },
  created(){
    this.source = new Subject()
    this.source.pipe(
    debounceTime(2000),
    ).subscribe(() => this.save(false))
  },
  destroyed(){
    this.source.unsubscribe()
  },
  data(){
    return {
      //edit: false
    }
  },
  methods:{
    change(value){
      this.source.next(value)
    },
    setEdit(){
      this.$store.commit('memorandum/setEdit', this._id)
    },
    save(end){
      const text = this.text
      this.$store.dispatch('memorandum/patch', {_id: this._id,
                                                memorandum: {text}, 
                                                end})
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
      return this.item.updatedBy || this.item.createdBy
    },
    isAuthor(){
      return this.author === this.$store.state.userId
    },
    date(){
      return dayjs(this.item.updatedAt || this.item.createdAt).format('DD/MM/YYYY')
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

.author{
  float: right;
}

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
