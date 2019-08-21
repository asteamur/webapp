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
            email: '',
            name: '',
            dateOfBirth: null,
            father: {
            },
            mother: {
            }
        }
    },
    getters: {
        teaById: state => _id => state.items[_id],
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
                name: '',
                email: '',
                dateOfBirth: null,
                father: {},
                mother: {}
            }
        },
        resetDatasheet(state){
            state.datasheet = {
                name: '',
                email: '',
                dateOfBirth: null,
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
            state.itemSelected = null
        },
        updateItem(state, item){
            state.items = {...state.items, [item._id]: {...state.items[item._id], ...item}}
        },
        updateDatasheet(state, datasheet){
            datasheet.father = undefined
            datasheet.mother = undefined
            state.datasheet = datasheet
        }
    },
    actions: {   
        async fetchOne({commit, rootState}, _id){
            try{
                const response = await axios.get('/api/private/tea/' + _id, {
                    headers: { Authorization: "Bearer " + rootState.JWT },
                    params: {fields: ['name', 'dateOfBirth', 'center']}
                })
                commit('updateDatasheet', response.data)
                commit('newItems', [response.data])
            }catch(err){
                console.log(err.response.data)
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        async fetch({commit, rootState}, query){
            try{
                const response = await axios.get('/api/private/tea', {
                    headers: { Authorization: "Bearer " + rootState.JWT },
                    params: {fields: ['name', 'dateOfBirth', 'center'], ...query}
                })
                commit('newItems', response.data)
            }catch(err){
                console.log(err.response.data)
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        async post({commit, rootState}, datasheet){
            try{
                const response = await axios.post('/api/private/tea', datasheet, {headers:  
                    {Authorization: "Bearer " + rootState.JWT}})
                console.log(response.data._id)    
                commit('newItem', {...datasheet, _id: response.data._id})
                commit('setToast', {text: 'Datos guardados con éxito', variant: 'success'}, {root: true})
            }catch(err){
                //commit('setToast', {text: 'error 500', variant: 'error'}, {root: true})
                console.log(err)
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        async patch({commit, rootState}, {_id, datasheet}){
            try{
                await axios.patch('/api/private/tea/' + _id, datasheet, {headers:  
                    {Authorization: "Bearer " + rootState.JWT}})
                commit('setToast', {text: 'Datos actualizados con éxito', variant: 'success'}, {root: true})
            }catch(err){
                console.log(err)
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