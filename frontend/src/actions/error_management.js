export const update_error = (response, state) => {
    if(typeof(response) =='string'){
        const json = JSON.parse(response)
        response = json
    }
    const keys = Object.keys(response)
    let ref = [...state]
    keys.forEach(key =>{
        ref.push([key, response[key]])
    })
    return ref
}


export const delete_error = (item, state) => {
    let ref = state.filter(x => x !== item)
    return ref
}
