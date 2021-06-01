import { useEffect, useRef, useState } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import SideBar from '../components/SideBar'
import ChatLog from '../pages/ChatLog'
import Container from '../styles/Container'

import socketClient from 'socket.io-client'
import Home from '../pages/Home'


const Index = () => {
    const [connected, setConnected] = useState(false)
    const socket = useRef()

    useEffect(() => {
        if (!socket.current) {
            socket.current = socketClient('http://localhost:5000', {
                autoConnect: true
            })

            setConnected(true)
            console.log('socket connect')
        }
        return () => socket.current.disconnect()
    }, [])

    return (
        <Router>
            <SideBar />
            <Container>
                <Switch>
                    <Route path='/group/:groupId'>
                        {connected ? <ChatLog socket={socket.current} /> : null}
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default Index;