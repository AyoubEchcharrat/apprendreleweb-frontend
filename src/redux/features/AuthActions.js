import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = "https://apprendreleweb-backend-61895b6b6b58.herokuapp.com"

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const data = await axios.post(
                `${backendURL}/api/auth/login`,
                { email, password },
                config
            )
            console.log(data)
            const defineUser = {
                userToken:data.data.userToken
            }
            localStorage.setItem('user', JSON.stringify(defineUser))
            return ({ data, email })
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)