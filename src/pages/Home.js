import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import useInput from '../hooks/useInput'
import { client } from '../utils/index'

const HomeWrap = styled.div`
    padding: 2rem 1.5rem;
    margin: 0 auto;
    width: 95%;
    .search{

    }
    .search-input {
        width: 50%;
        /* margin: 0 auto; */
        margin-bottom: 2rem;
        padding-right:.5rem;
    }
    .search-input input {
        padding: .4rem 1rem;
        border-radius: 4px;
        border: none;
        width: 100%;
    }
    .search-log {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
`
const GroupWrap = styled.div`
    padding: .5rem 1rem;
    border: 1px solid black;
    border-radius:4px;
    display: flex;

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
    .info a:hover {
        text-decoration: underline;
        margin-bottom: 1rem;
    }
    .info p {
        margin-top: 1rem;
    }
`

const Home = () => {
    const searchInput = useInput('')
    const resultRef = useRef([])


    const handleSearch = async e => {
        // e.preventDefault()
        if (e.keyCode === 13) {
            if (!searchInput.value.trim())
                return toast.dark('Vui lòng nhập từ khóa tìm kiếm!')
            const { data: groups } = await client(`/group/search?searchTerm=${searchInput.value}`)
            resultRef.current = groups
            searchInput.setValue('')
        }

    }
    return (
        <HomeWrap>
            <div className='search'>
                <div className='search-input'>
                    <input
                        type='text'
                        maxLength={20}
                        placeholder='Tìm kiếm nhóm'
                        value={searchInput.value}
                        onChange={searchInput.onChange}
                        onKeyDown={handleSearch}
                    />
                </div>
                <div className='search-log'>
                    {resultRef.current?.map(group => {
                        return <GroupWrap >
                            <div className='avatar'>
                                {group.name[0]}
                            </div>
                            <div className='info'>
                                <Link to={`/group/${group.id}`}>{group.name}</Link>
                                <p>{group.description}</p>
                            </div>

                        </GroupWrap>
                    })}
                </div>
            </div>
        </HomeWrap>
    );
};

export default Home;