const memorandumModule = {
    
    namespaced: true,
    state: {
        edit: null,
        items: {
            '0': {
                _id: '0',
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'miguel',
                date: 1318781876
            },
            '1': {
                _id: '1',
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'toy',
                date: 1318781876
            }
        },
        itemList: ['0', '1'],
        new: {}
    },
    getters: {
        memorandums(state){
            return state.itemList.map(x => state.items[x])
        }
    },
    mutations: {
        reset(state){
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
        insertItem(state, item){
            state.items = {...state.items, [item._id]: item}
            state.itemList.push(item._id)
        },
        insertItems(state, items){
            state.items = items
        },
        updateItem(state, item){
            state.items = {...state.items, [item._id]: {...state.items[item._id], ...item}}
        }
    },
    actions: {
        searchMemorandums(ctx, {dateInit, dateEnd}){
            console.log(dateInit, dateEnd)
        }
    }
}

export default memorandumModule