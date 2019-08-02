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
        itemSelected: '0'
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
        reset(state){
            state.items = {}
            state.itemList = []
            state.itemSelected = null
        },
        setSelected(state, _id){
            state.itemSelected = _id
        },
        newItem(state, item){
            state.items = {...state.items, [item._id]: item}
            state.itemList.push(item._id)
        },
        newItems(state, items){
            state.items = items
        },
        updateItem(state, item){
            state.items = {...state.items, [item._id]: {...state.items[item._id], ...item}}
        }
    },
    actions: {        
        
    }
}

export default teaModule