import React, { useState } from 'react';
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import useInput from '../hooks/useInput'
import { signup } from '../reducers/user'
import { upload } from '../utils';

export const StyledAuth = styled.div`
    width: 350px;
    padding:3rem 1.5rem;
    background:${props => props.theme.grey};
    border-radius: 4px;
    margin: 8% auto;

    h2 {
        margin-bottom: 1.2rem;
    }

    input {
        width: 100%;
        padding: .7rem 1.5rem;
        border-radius: 3px;
        border: 1px solid ${(props) => props.theme.black};
        background: ${props => props.theme.black};
        color: ${props => props.theme.primaryColor};
        margin-bottom: 1.5rem;
    }
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button {
        background: ${props => props.theme.red};
        letter-spacing: 1.1px;
        padding:.4rem 1rem;
        border:  1px solid ${(props) => props.theme.red};
        border-radius: 3px;
        color: ${props => props.theme.primaryColor};
        text-transform: uppercase;
    }

    label {
        margin: 1rem auto;

    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
    }

`

const Signup = ({ setAuth }) => {
    const [avatar, setAvatar] = useState('https://res.cloudinary.com/dpmxnehes/image/upload/v1622450374/chat-app/avatar_gw4qvc.png')
    const dispatch = useDispatch()

    const username = useInput('')
    const password = useInput('')
    const rePassword = useInput('')
    const email = useInput('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username.value.trim()
            || !password.value.trim()
            || !rePassword.value.trim()
            || !email.value.trim()) {
            return toast.error('Vui lòng nhập đầy đủ thông tin!')
        }
        if (password.value !== rePassword.value)
            return toast.error('Mật khẩu không trùng khớp')

        if (username.value.length < 3)
            return toast.error('Tên phải nhiều hơn 3 kí tự!')

        const re = /^[a-z0-9\x20]+$/i
        if (!re.exec(username.value))
            return toast.error('Vui lòng không dùng tên có kí tự đặc biệt')

        const payload = {
            username: username.value,
            password: password.value,
            email: email.value,
            avatar,
        }

        dispatch(signup({ payload }))
        toast.dark('Thành công')
    }

    const handleAvatar = async e => {
        const file = e.target.files[0]
        console.log(file)
        if (file) {
            setAvatar(await upload('image', file))
        }
    }
    return (
        <StyledAuth>
            <h2>Đăng kí</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for='avatar-up'>
                        <img src={avatar} alt='avatar' />
                    </label>
                    <input type='file' id='avatar-up' accept='image/*' onChange={handleAvatar} style={{ display: 'none' }} />
                </div>

                <input type='text' placeholder='Tên người dùng' value={username.value} onChange={username.onChange} />
                <input type='password' placeholder='Mật khẩu' value={password.value} onChange={password.onChange} />
                <input type='password' placeholder='Nhập lại mật khẩu' value={rePassword.value} onChange={rePassword.onChange} />
                <input type='email' placeholder='Email' value={email.value} onChange={email.onChange} />
                <div>
                    <span className='pointer' onClick={() => setAuth('LOGIN')} >Đăng nhập</span>
                    <button type='submit'>Đăng kí</button>
                </div>
            </form>
        </StyledAuth>
    );
};

export default Signup;