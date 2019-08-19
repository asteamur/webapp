<template>
  <div>
      <div>
           <vue-bootstrap-typeahead
                :data="parents"
                placeholder="buscar padre"
                v-model="query"
                :serializer="s => s.name"
                @hit="father = $event"
            />
          <h3>Padre</h3>
          <table>
          <tr><td>Nombre:</td><td>{{father.name}}</td></tr> 
          <tr><td>Teléfono:</td><td>{{father.phone}}</td></tr>
          <tr><td></td><td>
            <b-button v-if="father.name" style="float: right;" variant="outline-primary" @click="unlink('father')">Desvincular</b-button>          
          </td></tr>
          </table>
      </div>
      
      <div>
          <vue-bootstrap-typeahead
                :data="parents"
                placeholder="buscar madre"
                v-model="query"
                :serializer="s => s.name"
                @hit="mother = $event"
            />
          <h3>Madre</h3>
          <table>
          <tr><td>Nombre:</td><td>{{mother.name}}</td></tr> 
          <tr><td>Teléfono:</td><td>{{mother.phone}}</td></tr>
          <tr><td></td><td>
            <b-button v-if="mother.name" style="float: right;" variant="outline-primary" @click="unlink('mother')">Desvincular</b-button>          
          </td></tr>
          </table> 
      </div>        
      <hr/>
    <b-form @submit="onSubmit" novalidate autocomplete="off">
      <b-form-group
        id="input-group-email"
        label="Dirección de email:"
        label-for="input-email"
        :invalid-feedback="errors.first('email')"
        :state="!errors.has('email')"
      >
        <b-form-input
          v-validate="'email'"
          id="input-email"
          v-model="email"
          type="text"
          :state="!errors.has('email')"
          name="email"
          placeholder="Introduce el email"
        ></b-form-input>
        <!--          autocomplete="email"-->
      </b-form-group>

      <b-form-group
        :invalid-feedback="errors.first('name')"
        :state="!errors.has('name')" 
        id="input-group-name" 
        label="Nombre:" 
        label-for="input-name">
        <b-form-input 
          v-validate.initial="'required'"
          name="name"
          :state="!errors.has('name')"
          id="input-name"
          v-model="name"
          placeholder="Introduce el nombre de usuario"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-birth" label="Fecha de nacimiento:" label-for="input-birth">
        <datepicker :initialView="'year'" v-model="dateOfBirth"></datepicker>
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
    <!-- 
    <LoginForm />
     -->
    </div>
</template>

<script>
import { mapModel } from 'vuex-bound'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
//import LoginForm from '@/components/login/Login.vue'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'DatasheetForm',  
  components: {
      VueBootstrapTypeahead,
      //LoginForm,
      Datepicker
  },
  created(){
      this.$store.commit('tea/resetDatasheet')
      if(this.$route.params._id){
          console.log('dispatch fetch datasheet')
      }
  },
  data(){
    return {
        query: '',
        parents: [
            {
                _id: 'xxx', 
                name: 'diego alarcos',
                phone: '616210432'
            },
            {
                _id: 'yyy', 
                name: 'paquita torrecillas',
                phone: '968894049'
            }
        ]
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
        this.$store.dispatch('tea/postTEA', {...this.datasheet, 
                        father: this.datasheet.father._id,
                        mother: this.datasheet.mother._id
                        })
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
        dateOfBirth: state => state.datasheet.dateOfBirth,
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
