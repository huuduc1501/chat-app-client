import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components'
import Member from './SpecifyGroup';
import MyGroup from './ListGroup';

import { MemberWrap } from './SpecifyGroup'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../reducers/user';

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
    }
`

const SideBar = () => {
    const { isFetching, data: user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
    const { pathname } = useLocation()
    const groupId = pathname.slice(7)

    const [selected, setSelected] = useState(groupId ? true : false)
    useEffect(() => {
        if (!groupId)
            setSelected(false)
        else
            setSelected(true)
    }, [groupId])
    if (isFetching)
        return <SideBarWrap />
    return (
        <SideBarWrap>
            <div className='list'>
                {selected ? <Member /> : <MyGroup />}
            </div>
            <MemberWrap className='my-profile'>
                <img src={user.avatar} alt='avatar' />
                <span>{user.username}</span>
            </MemberWrap>
        </SideBarWrap>
    )
};

export default SideBar;