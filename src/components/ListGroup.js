import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { getRecommendGroup } from '../reducers/recommendGroup';
import { getMe, addGroup } from '../reducers/user';
import { client } from '../utils';
import CreateChannel from './CreateChannel';

const ListGroupWrap = styled.div`

    /* display: flex;
    flex-direction:column;
    justify-content: center; */
    .group{
        margin-top: 1rem;
    }
    .group h3{
        margin-bottom: .5rem;
        padding:0 1rem;
    }
    .group-list {
        max-height: 35vh;
        overflow-y: auto;
    }
    .group-list::-webkit-scrollbar {
        width:4px;
    }
    .group-list::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .group-list::-webkit-scrollbar-thumb {
        background: #888;
    }
    .group-list::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


    .ruler {
        width: 100%;
        border-top: 2px solid ${props => props.theme.yellow};
        margin-bottom: 1rem;
    }

`
const GroupItemWrap = styled.div`
    :hover{
        background: ${props => props.theme.darkGrey};
    }
    padding: .3rem 1rem;

    margin-bottom: .2rem;
    a {
        display: flex;
        align-items:center;
    } 
    .avatar {
        width: 35px;
        height: 35px;
        border-radius: 4px;
        text-transform: uppercase;
        border:1px solid ${props => props.theme.yellow};
        margin-right: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

    }


`


const MyGroup = () => {
    const { isFetching: isF, data: { listGroups: joinedGroup } } = useSelector(state => state.user)
    const { isFetching, data: recommendGoup } = useSelector(state => state.recommend)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isF) {
            dispatch(getMe())
        }
    }, [dispatch, isF])
    useEffect(() => {
        dispatch(getRecommendGroup())
    }, [dispatch])
    const onHandleJoin = async group => {
        await client(`/group/${group.id}`, { method: 'post' })
        // const payload = {
        //     groupId: group.id,
        //     groupDetail: {
        //         name: group.name,
        //         description: group.description,
        //         createdAt: group.createdAt
        //     }
        // }
        dispatch(addGroup(group))
    }

    if (isFetching || isF)
        return null

    return (
        <ListGroupWrap>
            <CreateChannel />
            <div className='group'>
                <h3>Nhóm đã vào</h3>
                <div className='group-list'>
                    {joinedGroup?.map((group, index) => {
                        return <GroupItemWrap key={index} >
                            <NavLink to={`/group/${group.id}`} >
                                <div className='avatar'>
                                    {group.name[0]}
                                </div>
                                <span  >
                                    {group.name}
                                </span>
                            </NavLink>
                        </GroupItemWrap>
                    })}
                </div>
            </div>
            <div className='group'>
                <h3>Có thể bạn quan tâm</h3>
                <div className='group-list'>
                    {recommendGoup?.map((group, index) => {
                        return <GroupItemWrap key={index} onClick={() => onHandleJoin(group)}>
                            <NavLink to={`/group/${group.id}`}>
                                <div className='avatar'>
                                    {group.name[0]}
                                </div>
                                <span>
                                    {group.name}
                                </span>
                            </NavLink>
                        </GroupItemWrap>
                    })}
                </div>
            </div>
        </ListGroupWrap>
    );
};

export default MyGroup;