import React from 'react';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { StyledAuth } from './Signup'
import useInput from '../hooks/useInput'
import { login } from '../reducers/user';

const Login = ({ setAuth }) => {

    const dispatch = useDispatch()

    const password = useInput('')

    const email = useInput('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!password.value.trim()
            || !email.value.trim()) {
            return toast.error('Vui lòng nhập đầy đủ thông tin!')
        }
        const payload = {
            password: password.value,
            email: email.value,
        }

        dispatch(login({ payload }))
    }
    return (
        <StyledAuth>
            <h2>Đăng nhập</h2>

            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email.value} onChange={email.onChange} />
                <input type='password' placeholder='Nhập lại mật khẩu' value={password.value} onChange={password.onChange} />
                <div >
                    <span className='pointer' onClick={() => setAuth('SIGNUP')} >Đăng kí</span>
                    <button type='submit' >Đăng nhập</button>
                </div>
            </form>
        </StyledAuth>
    )
}

export default Login;