import React from 'react'

function UserLogin() {
    return (
        <div>
            <form>
                <input type="text" name="username" placeholder="User Name"/>
                <input type="password" name="password" placeholder="password"/>
                <button onClick={(e)=>{
                    e.preventDefault();
                }}>Login</button>
            </form>
        </div>
    )
}

export default UserLogin
