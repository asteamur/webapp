import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('age', function(date){
    if(!date) return ''
    const years = dayjs().diff(dayjs(date), 'year')
    const months = dayjs().diff(dayjs(date), 'month') - 12*years
    if(months === 0){
      return years + " años"
    }else{
      return years + " años y " + months + " meses"
    }
})
