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
          <h3>Padre:</h3>
          <table>
          <tr><td>Nombre:</td><td>{{father.name}}</td></tr> 
          <tr><td>Teléfono:</td><td>{{father.phone}}</td></tr>
          <tr><td></td><td>
            <b-button style="float: right;" variant="outline-primary" @click="unlink('father')">Desvincular</b-button>          
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
          <h3>Madre:</h3>
          <table>
          <tr><td>Nombre:</td><td>{{mother.name}}</td></tr> 
          <tr><td>Teléfono:</td><td>{{mother.phone}}</td></tr>
          <tr><td></td><td>
            <b-button style="float: right;" variant="outline-primary" @click="unlink('mother')">Desvincular</b-button>          
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
          v-validate="'required|email'"
          id="input-email"
          v-model="email"
          type="text"
          :state="!errors.has('email')"
          name="email"
          placeholder="Introduce el email"
        ></b-form-input>
        <!--          autocomplete="email"-->
      </b-form-group>

<!-- -->
      <b-form-group
        id="input-group-password"
        label="password:"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          type="password"
          name="password"
          placeholder="Introduce tu password"
        ></b-form-input>
        <!--autocomplete="password"-->
      </b-form-group>

<!-- -->
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
    <!-- -->

    <!--  -->
    </div>
</template>

<script>
import { mapModel } from 'vuex-bound'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

export default {
  name: 'DatasheetForm',  
  components: {
      VueBootstrapTypeahead
  },
  created(){
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
