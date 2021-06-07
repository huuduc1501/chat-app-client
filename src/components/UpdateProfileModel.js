import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components'
import useInput from '../hooks/useInput';
import { client, upload } from '../utils';

const openModel = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`

const UpdateProfileWrap = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, 0.7);
    animation: ${openModel} 0.5s ease-in-out;
    

    .update-profile {
        width: 500px;
        border-radius: 4px;
        background: ${props => props.theme.grey};
        margin: 48px auto;
        padding: 1rem 2rem;
        gap: 1.4rem;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
    }
    .update-profile input {
        padding: .3rem .8rem;
        border-radius: 4px;
        border: none;
    }
    .update-profile button {
        padding: .4rem .6rem;
        text-transform: uppercase;
        align-self: flex-end;
        background: ${props => props.theme.red};
        border: none;
        border-radius: 4px;
        color: white;
    }

`

const UpdateProfileModel = ({ setOpen }) => {
    const { data: user } = useSelector(state => state.user)
    const [avatar, setAvatar] = useState(user.avatar)
    const nameInput = useInput('')
    const handleAvatar = async e => {
        const file = e.target.files[0]
        setAvatar(await upload('image', file))
    }
    const onHandleSubmit = async e => {
        e.preventDefault()
        const payload = {
            name: nameInput.value,
            avatar: avatar
        }
        const { success } = client('/user', { method: 'put', body: payload })
        if (success) {
            setOpen(false)
        }

    }
    return (
        <UpdateProfileModel>
            <div className='update-profile'>
                <div>
                    <label for='avatar-up'>
                        <img src={avatar} alt='avatar' />
                    </label>
                    <input type='file' id='avatar-up' accept='image/*' onChange={handleAvatar} style={{ display: 'none' }} />
                </div>
                <input type='text' placeholder='Tên người dùng' value={nameInput.value} onChange={nameInput.onChange} />
                <button onClick={onHandleSubmit}></button>
            </div>
        </UpdateProfileModel>
    );
};

export default UpdateProfileModel;