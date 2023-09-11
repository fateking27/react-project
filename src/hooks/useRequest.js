import { useState } from 'react'
import api from "@/apis";

const useRequest = () => {
    const [user, setUser] = useState([]);

    const getUsersAsync = async () => {
        const res = await api.users.get()
        if (res.code == 1) {
            setUser(res.data)
        }
    }
    return { getUsersAsync, user }
}

export default useRequest