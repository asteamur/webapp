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
  name: 'Parent',  
  props: {
      type_: String
  },
  data(){
    return {
   
    }
  },
  methods:{
    onSubmit(evt) {
        evt.preventDefault()
        const value = this.$store.state.tea[this.type_]
        this.$store.dispatch('tea/updateParent', {type: this.type_, value })
        //this.$emit('input', {...this.$store.state.tea[this.type_]})
    }
  },
  computed: {
    ...mapModel('tea', {
        _id: state => state[this.type_]._id,
        name: state => state[this.type_].name,
        email: state => state[this.type_].email
    })
  }
}
</script>

<style scoped lang="scss">


</style>
