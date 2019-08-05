<template>
  <div>
      <div>
          Padre: {{father.name}}          
      </div>
      <b-button variant="outline-primary" @click="unlink('father')">Desvincular</b-button>
      <div>
          Madre: {{mother.name}}          
      </div>    
      <b-button variant="outline-primary" @click="unlink('mother')">Desvincular</b-button>
    <b-form @submit="onSubmit" novalidate>
      <b-form-group
        id="input-group-email"
        label="Dirección de email:"
        label-for="input-email"
        :invalid-feedback="errors.first('email')"
        :state="!errors.has('email')"
      >
        <b-form-input
          v-validate="'required|email'"
          id="input-email"
          v-model="email"
          type="text"
          :state="!errors.has('email')"
          name="email"
          placeholder="Introduce el email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-name" label="Your Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="name"
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" 
      :disabled="errors.items.length > 0">
      Guardar
      </b-button>      
      <b-button style="float: right;"
        variant="outline-success" 
        :disabled="errors.has('email')"
        @click="sendPassword()">
        Enviar email
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapModel } from 'vuex-bound'
//import Parent from '@/components/parent/Parent.vue'

export default {
  name: 'DatasheetForm',  
  components: {
      //Parent
  },
  created(){
      if(this.$route.params._id){
          console.log('dispatch fetch datasheet')
      }
  },
  data(){
    return {

    }
  },
  methods:{
    sendPassword(){
        console.log('send password')
    },
    unlink(type){
        if(type === 'father'){
            this.father = {}
        }else{
            this.mother = {}
        }
        //this.$store.dispatch('tea/updateParent', {type, value: {} })
    },
    onSubmit(evt) {
        evt.preventDefault()
        console.log({...this.datasheet, 
                        father: this.datasheet.father._id,
                        mother: this.datasheet.mother._id
                        })
        //this.$store.dispatch
        //this.$emit('input', {...this.$store.state.tea.datasheet})
    }
  },
  computed: {
    datasheet(){
        return this.$store.state.tea.datasheet
    },  
    ...mapModel('tea', {
        _id: state => state.datasheet._id,
        name: state => state.datasheet.name,
        email: state => state.datasheet.email,
        father: state => state.datasheet.father,
        mother: state => state.datasheet.mother
    })
  },
  watch: {
      _id(newVal){
          this.$router.replace({params: {_id: newVal}})
      }
  }
}
</script>

<style scoped lang="scss">


</style>
