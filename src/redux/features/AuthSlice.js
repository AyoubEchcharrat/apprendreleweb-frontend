"use client"

import { createSlice } from "@reduxjs/toolkit";
import { handlePendingEvent, handleRejectedEvent } from './utils'
import {loginUser} from './AuthActions'

const userToken = typeof window !== 'undefined' && localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')).userToken
  : null;

const initialState = {
    loading: false,
    userProfile: {
        email: null,
        id: null,
    },
    userToken,
    error: null,
    success: false,
    dataLoad:true
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            console.log(userToken)
            localStorage.setItem('user',JSON.stringify({userToken : null}))
            state.loading = false
            state.userProfile = {
                email: null,
                id:null,
            }
            state.userToken = null
            state.error = null
        },
        refreshUserDatas : (state) => {
            state.dataLoad = true
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, handlePendingEvent),
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.loading = false
            state.userProfile.email = payload.email
            state.userToken = payload.userToken
            state.dataLoad = false
        }),
        builder.addCase(loginUser.rejected, handleRejectedEvent)
    }
});

export const {
logout,
refreshUserDatas
} = authSlice.actions;
export default authSlice.reducer;