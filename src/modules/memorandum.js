import axios from 'axios'

let counter = 100

const memorandumModule = {
    
    namespaced: true,
    state: {
        edit: null,
        items: {
            
        },
        itemList: [],
        new: {}
    },
    getters: {
        memorandums(state){
            return state.itemList.map(x => state.items[x]).sort((a, b) => b.date - a.date)
        }
    },
    mutations: {
        reset(state){
            console.log('reseting...')
            state.edit = null
            state.items = {}
            state.itemList = []
            state.new = {}
        },
        setEdit(state, id){
            state.edit = id
        },
        updateNewItem(state, item){
            state.new = item
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
        newItem({ commit }, item){
            item._id = '' + counter
            counter += 1
            commit('newItem', item)
            commit('setEdit', item._id)
        },
        async fetch({commit, rootState}, query){
            try{
                const response = await axios.get('/api/private/memorandum', {
                    headers: { Authorization: "Bearer " + rootState.JWT },
                    params: {fields: ['text', 'createdBy', 'updatedBy', 'createdAt'], ...query}
                })
                commit('newItems', response.data)
            }catch(err){
                console.log(err.response.data)
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        updateMemorandum({ commit }, end){
            commit('setToast', {text: 'Datos guardados con éxito', variant: 'success'}, {root: true})
            if(end){
                commit('setEdit', null)
            }
        },
        async post({commit, rootState}, payload){
            try{
                const response = await axios.post('/api/private/memorandum', payload, {headers:  
                    {Authorization: "Bearer " + rootState.JWT}})
                commit('newItem', {...payload, ...response.data})
                commit('setEdit', response.data._id)
                commit('setToast', {text: 'Datos guardados con éxito', variant: 'success'}, {root: true})
            }catch(err){
                //commit('setToast', {text: 'error 500', variant: 'error'}, {root: true})
                console.log(err)
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        async patch({commit, rootState}, {_id, memorandum, end}){
            try{
                const response = await axios.patch('/api/private/memorandum/' + _id, memorandum, {headers:  
                    {Authorization: "Bearer " + rootState.JWT}})
                commit('updateItem', response.data)
                if(end){
                    commit('setEdit', null)
                }
                commit('setToast', {text: 'Datos actualizados con éxito', variant: 'success'}, {root: true})
            }catch(err){
                console.log(err)
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        }
    }
}

export default memorandumModule