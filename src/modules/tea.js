import { updateModel } from 'vuex-bound'

const teaModule = {
    
    namespaced: true,
    state: {
        items: {
            '0': {
                _id: '0',
                name: 'Miguel Ángel Alarcos Torrecillas',
                age: 8,
                head: 'Cartagena',
                center: 'CEIP Jacinto Benavente'
            },
            '1': {
                _id: '1',
                name: 'Verónica Alarcos Torrecillas',
                age: 12,
                head: 'Murcia',
                center: 'CEIP Nuestra Señora de la Salud'
            }
        },
        itemList: ['0', '1'],
        itemSelected: null,
        datasheet: {
            email: 'hola@hola.es',
            father: {
                name: 'diego',
                _id: 'xxx'
            },
            mother: {
                name: 'paquita',
                _id: 'yyy'
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
            state.datasheet = {}
        },
        resetDatasheet(state){
            state.datasheet = {}
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