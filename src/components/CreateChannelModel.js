import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components'

import useInput from '../hooks/useInput'
import { client } from '../utils';
import { addGroup } from '../reducers/user'
import { toast } from 'react-toastify';

const openModel = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`

const CreateChannelWrap = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, 0.7);
    animation: ${openModel} 0.5s ease-in-out;
    

    .new-channel {
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
    .new-channel input,.new-channel textarea {
        padding: .3rem .8rem;
        border-radius: 4px;
        border: none;
    }
    .new-channel button {
        padding: .4rem .6rem;
        text-transform: uppercase;
        align-self: flex-end;
        background: ${props => props.theme.red};
        border: none;
        border-radius: 4px;
        color: white;
    }
    .new-channel textarea {
        height:200px;
    }

`

const CreateChannelModel = ({ setOpen }) => {
    const nameInput = useInput()
    const describeInput = useInput()
    const dispatch = useDispatch()
    const handleSubmit = async e => {
        let payload = {
            name: nameInput.value,
            description: describeInput.value
        }
        const { data: group } = await client('/group', { body: payload })
        // let modifyGroup = {
        //     groupId: group.id, groupDetail: {
        //         name: group.name,
        //         description: group.description,
        //         createdAt: group.createdAt
        //     }
        // }
        dispatch(addGroup(group))
        setOpen(false)
        if (group)
            toast('tạo thành công!')
    }
    return (
        <CreateChannelWrap>
            <div className='new-channel'>
                <h2>Nhóm mới</h2>
                <input type='text' value={nameInput.value} onChange={nameInput.onChange} placeholder='Tên nhóm' />
                <textarea value={describeInput.value} onChange={describeInput.onChange} placeholder='Mô tả nhóm' />
                <button type='button' onClick={handleSubmit}>Tạo mới</button>
            </div>
        </CreateChannelWrap>
    )
};

export default CreateChannelModel;