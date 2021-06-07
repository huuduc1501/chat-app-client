import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components'
import Member from './SpecifyGroup';
import MyGroup from './ListGroup';

import { MemberWrap } from './SpecifyGroup'
import { useDispatch, useSelector } from 'react-redux';
import { getMe, logout } from '../reducers/user';
import { SignoutIcon } from './Icon';
import UpdateProfileModel from './UpdateProfileModel';

const SideBarWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 1rem;
    /* padding: 1.5rem 1rem; */
    background: ${props => props.theme.grey};
    width: 240px;
    height: 100vh;

    .my-profile {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-bottom:.4rem;
        display: flex;

    }
    .my-profile span {
        flex-grow: 2;
    }
    svg {
        width: 40px;
        height: 40px;
    }
    button {
        background: none;
        border: none;

    }
`

const SideBar = () => {
    const { isFetching, data: user } = useSelector(state => state.user)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isFetching)
            dispatch(getMe())
    }, [dispatch, isFetching])
    const { pathname } = useLocation()
    const groupId = pathname.slice(7)

    const [selected, setSelected] = useState(groupId ? true : false)
    useEffect(() => {
        if (!groupId)
            setSelected(false)
        else
            setSelected(true)
    }, [groupId])

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleOpen = async e => {
        setOpen(true)
    }
    if (isFetching)
        return <SideBarWrap />
    return (
        <>
            <SideBarWrap>
                <div className='list'>
                    {selected ? <Member /> : <MyGroup />}
                </div>
                <MemberWrap className='my-profile'>
                    <img src={user.avatar} alt='avatar' />
                    <span >{user.username}</span>
                    <button onClick={handleLogout} > <SignoutIcon /></button>
                </MemberWrap>
            </SideBarWrap>
            {open && <UpdateProfileModel setOpen={setOpen} />}
        </>
    )
};

export default SideBar;