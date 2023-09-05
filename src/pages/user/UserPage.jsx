import React from 'react'
import api from '@/apis/index'

export default function UserPage() {
    const getUsers = async ()=> {
        const res = await api.users.get()
        console.log(res)
    }

    getUsers()
  return (
    <div>UserPage</div>
  )
}
