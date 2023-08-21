import { useState } from "react"

const Register = ({setToken}) => {
    const [alert, setAlert] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        })
        const data = await result.json()
        
        if (data.token) {
            setAlert("")
            setToken(data.token)
        } else {
            setAlert(<p>No Such User</p>)
        }
    }
    return (
        <>
            {alert}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register