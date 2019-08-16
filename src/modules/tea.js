import axios from 'axios'
import { updateModel } from 'vuex-bound'

const teaModule = {
    
    namespaced: true,
    state: {
        items: {
            
        },
        itemList: [],
        itemSelected: null,
        datasheet: {
            email: null,
            name: null,
            father: {
            },
            mother: {
            }
        }
    },
    getters: {
        teas(state){
            return state.itemList.map(x => state.items[x])
        },
        selected(state){
            return state.itemSelected
        },
        itemSelected(state){
            return state.items[state.itemSelected]
        }
    },
    mutations: {
        ...updateModel(),
        updateFather(state, value){
            state.datasheet.father = value
        },
        updateMother(state, value){
            state.datasheet.mother = value
        },
        reset(state){
            state.items = {}
            state.itemList = []
            state.itemSelected = null
            state.datasheet = {
                father: {},
                mother: {}
            }
        },
        resetDatasheet(state){
            state.datasheet = {
                father: {},
                mother: {}
            }
        },
        setSelected(state, _id){
            state.itemSelected = _id
        },
        newItem(state, item){
            state.items = {...state.items, [item._id]: item}
            state.itemList.push(item._id)
        },
        newItems(state, items){
            state.items = items.reduce((obj, v)=>{
                obj[v._id] = v
                return obj
            },{})
            state.itemList = items.map(x => x._id)
        },
        updateItem(state, item){
            state.items = {...state.items, [item._id]: {...state.items[item._id], ...item}}
        }
    },
    actions: {   
        async postTEA({commit, rootState}, datasheet){
            console.log(datasheet, rootState.JWT)
            try{
                const response = await axios.post('/api/private/tea', datasheet, {headers:  
                    {Authorization: "Bearer " + rootState.JWT}})
                console.log(response.data._id)    
                commit('newItem', {...datasheet, _id: response.data._id})
                commit('setToast', {text: 'Datos guardados con éxito', variant: 'success'}, {root: true})
            }catch(err){
                //commit('setToast', {text: 'error 500', variant: 'error'}, {root: true})
                console.log(err.response.data)
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },     
        updateParent({commit}, {type, value}){
            if(type === 'father'){
                commit('updateFather', value)
            }else{
                commit('updateMother', value)
            }
        },
        setSelected({commit}, _id){
            commit('resetDatasheet')
            commit('memorandum/reset', null, {root: true})
            commit('setSelected', _id)
        }
    }
}

export default teaModule