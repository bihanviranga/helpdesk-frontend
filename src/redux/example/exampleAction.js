import Axios from "axios"

export const changeData = () => {
    return dispatch => {
       dispatch({
            type:"CHANGE_DATA",
            payload: new Promise((resolve , reject)=>{
                setTimeout(()=>{
                    resolve("data Changecad ")
                },3000)
            })
        })
    }
}

export const getData = () => {
    return dispatch => {
        dispatch({
            type:"FETCH_POSTS_SUCCESS",
            payload: new Promise((resolve , reject)=>{
                Axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    const posts = response.data
                    resolve(posts)
                })
                .catch(err => {
                    const errMzg = err.message
                })
            })
        })
    }
}

