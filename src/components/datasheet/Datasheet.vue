<template>
  <div>
    <b-form @submit="onSubmit" novalidate>
      <b-form-group
        id="input-group-email"
        label="Dirección de email:"
        label-for="input-email"
        :invalid-feedback="errors.first('email')"
        :state="!errors.has('email')"
      >
      <!--:invalid-feedback="error('email').msg"
        :state="!error('email').hasgot"
        -->
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
    </b-form>
  </div>
</template>

<script>
import { mapModel } from 'vuex-bound'

export default {
  name: 'DatasheetForm',  
  created(){
      if(this.$route.params._id){
          console.log('dispatch fetch datasheet')
      }
  },
  data(){
    return {
      email2: ''
    }
  },
  methods:{
    onSubmit(evt) {
        evt.preventDefault()
        this.$emit('input', {...this.$store.state.tea.datasheet})
    },
    error2(name){        
        const v = this.$store.state.tea.datasheet[name]
        return {
            msg: 'Introduce un email válido',
            hasgot: !v || v !== 'miguel.alarcos@gmail.com'
        }
    }
  },
  computed: {
    ...mapModel('tea', {
        _id: state => state.datasheet._id,
        name: state => state.datasheet.name,
        email: state => state.datasheet.email
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
