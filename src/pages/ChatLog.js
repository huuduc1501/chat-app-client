import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components'
import useInput from '../hooks/useInput';
import { addNewMess, getAllChat, outRoom } from '../reducers/groupChat';
import { client } from '../utils';

const ChatLogWrap = styled.div`
    height: 100vh;
    width: 95%;
    margin: 0 auto;
    padding: 1rem 2rem 4rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content:flex-end;

    .chatlog {
        overflow-y: auto;
        scroll-behavior: smooth;
    }
    .chatlog::-webkit-scrollbar {
        width:4px;
    }
    .chatlog::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .chatlog::-webkit-scrollbar-thumb {
        background: #888;
    }
    .chatlog::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


`
const MessageWrap = styled.div`
    width: 75%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;

    img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        margin-right: 1rem;
    }
    .content span{ 
        color:#d1b2b2;
        margin-right: 1rem;
    }
    .content p {
        margin-top: .5rem;
    }

    /* ${props => props.isMine && css`
        justify-content: flex-end;
        margin-left: 25%;
    `} */
`
const InputChat = styled.div`
    width:100%;
    position: absolute;
    left: 0;
    padding:1rem 2rem;
    bottom: 0;
    input {
        width:100%;
        padding: .4rem 4rem .4rem 1rem;
        border-radius: 4px;
    }
    button {
        position:absolute;
        right:2.3rem;
        padding:.3rem .5rem;
        border-radius: 4px;
        background: ${props => props.theme.yellow};
        margin-top: 3px;
        border: none;
    }

`

const ChatLog = ({ socket }) => {
    const { groupId } = useParams()
    const { isFetching, data: chatLogs } = useSelector(state => state.groupChat)
    const dispatch = useDispatch()
    const messInput = useInput()
    const scrollBarRef = useRef()

    useEffect(() => {
        dispatch(getAllChat(groupId))
        return () => dispatch(outRoom())
    }, [dispatch, groupId])
    useEffect(() => {
        // socket.connect()
        socket.emit('join', groupId)
        console.log('join')

        return () => socket.off('newMessage')

    }, [socket, groupId])
    useEffect(() => {
        socket.on(`newMessage`, newMess => {
            console.log(newMess.message)
            dispatch(addNewMess(newMess))
            if (scrollBarRef.current)
                scrollBarRef.current.scrollTop = scrollBarRef.current.scrollHeight

        })
    }, [dispatch, socket])


    const handleSendMess = async (e) => {
        console.log('send')
        const { data: newMess } = await client(`/groupChat/${groupId}`, { body: { message: messInput.value } })
        socket.emit('newMessage', newMess)
        messInput.setValue('')
    }
    const handleEnter = (e) => {
        if (e.keyCode === 13)
            return handleSendMess()
        return
    }

    if (isFetching)
        return null
    return (
        <ChatLogWrap>
            <div ref={scrollBarRef} className='chatlog'>
                {chatLogs?.map(chatlog => {
                    return <MessageWrap isMine={chatlog.isMine}>
                        <img src={chatlog.User.avatar} alt='avatar' />
                        <div className='content'>
                            <span>{chatlog.User.username}</span>
                            <span>{chatlog.createdAt}</span>
                            <p>{chatlog.message}</p>
                        </div>

                    </MessageWrap>
                })}
            </div>
            <InputChat>
                <input type='text'
                    value={messInput.value}
                    onChange={messInput.onChange}
                    onKeyUp={handleEnter}
                    placeholder='Nhập tin nhắn ở đây' />
                <button type='button' onClick={handleSendMess}>Gửi</button>
            </InputChat>
        </ChatLogWrap>
    );
};

export default ChatLog;