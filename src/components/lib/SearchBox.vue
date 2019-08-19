<template>
  <div>
    <b-form-input 
        v-model="query" 
        @input="change($event)"      
        placeholder="Escribe el nombre">
    </b-form-input>
  </div>
</template>

<script>
import { Subject } from 'rxjs'
import { debounceTime, filter } from 'rxjs/operators'

export default {
    data(){
        return {
            query: ''
        }
    },
    created(){
        this.source = new Subject()
        this.source.pipe(
            filter((x) => x.length >= 3),
            debounceTime(2000),
        ).subscribe((x) => this.$emit('input', x))
    },
    methods: {
        change(value){
            this.source.next(value)
        }
    },
    destroyed(){
        this.source.unsubscribe()
    }
}
</script>