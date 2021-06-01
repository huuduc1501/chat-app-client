import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { getAllUser } from '../reducers/groupUser';

import { AddIcon } from './Icon'
import { Link } from 'react-router-dom';

const ListMemberWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;

    .group-info{
        padding:0 1rem;
    }
    .group-info >h2 {
        margin-bottom: .3rem;
    }
    .group-member {
        margin-top: 1rem;
    }
    .group-member > h3 {
        padding: 0 1rem;
    }
    .member-list {
        overflow-y: auto;
    }
`
export const MemberWrap = styled.div`
    :hover{
        background: ${props => props.theme.darkGrey};
    }
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: .3rem;
    gap: 1rem;
    padding: .3rem 1rem;

    img {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        object-fit: cover;
    }
`

const Member = () => {
    const { isFetching, data: group } = useSelector(state => state.groupUser)
    const { location: { pathname } } = useHistory()
    let groupId = pathname.slice(7)

    const dispatch = useDispatch()
    useEffect(() => {
        if (groupId)
            dispatch(getAllUser(groupId))
    }, [dispatch, groupId])

    if (isFetching)
        return null
    return (
        <ListMemberWrap>
            <Link to='/'>
                <AddIcon />
            </Link>
            <div className='group-info'>
                <h2>{group.name}</h2>
                <p>{group.description}</p>
            </div>
            <div className='group-member'>
                <h3>Thành viên</h3>
                <div className='member-list'>
                    {group.groupMembers?.map((member, index) => {
                        return <MemberWrap key={index}>
                            <img src={member.avatar} alt='avatar' />
                            <span>{member.username}</span>
                        </MemberWrap>
                    })}
                </div>
            </div>

        </ListMemberWrap>
    );
};

export default Member;