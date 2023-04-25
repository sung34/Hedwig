import React, { useState, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import CustomButton from '@/components/CustomButton'
import { UseMutateFunction } from 'react-query'
import { AuthResponse, SignInRequest } from '@/types/Auth'
import { AxiosError } from 'axios'

interface LoginFormProps {
    mutate: UseMutateFunction<AuthResponse, AxiosError, SignInRequest>
}

function LoginForm({ mutate: login }: LoginFormProps) {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const onLoginBtnClick = () => {
        login(loginData)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <TextField style={{ width: '78vw' }} label="email" name="email" value={loginData.email} onChange={onChange} />
            <TextField style={{ width: '78vw' }} type="password" label="password" name="password" value={loginData.password} onChange={onChange} />
            <CustomButton size={'large'} onClick={onLoginBtnClick}>
                먹이주기
            </CustomButton>
        </div>
    )
}

export default LoginForm
