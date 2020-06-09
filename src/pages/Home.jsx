import React , {useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'

import { changeData } from '../redux'

function Home() {
    const dispatch = useDispatch()
    const _exampleReducer = useSelector(state=>state.example)
    return (
        <div>
            <>
                <h1>{ _exampleReducer.ReduxCheck }</h1>
                <button onClick={()=>{dispatch(changeData())}} >Click to change </button>
            </>
        </div>
    )
}

export default Home
