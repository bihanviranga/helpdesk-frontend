import React , {useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'

import { changeData , getData } from '../redux'

function Home() {
    const dispatch = useDispatch()
    const _exampleReducer = useSelector(state=>state.example)
    return (
        <div>
            <>
                <h1>{ _exampleReducer.ReduxCheck }</h1>
                <h1>{JSON.stringify( _exampleReducer.posts )}</h1>
                <button onClick={()=>{dispatch(changeData())}} >Click to change </button>
                <button onClick={()=>{dispatch(getData())}} >Click to getData </button>
            </>
        </div>
    )
}

export default Home
