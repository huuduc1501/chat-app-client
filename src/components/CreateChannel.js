import React, { useState } from 'react';
import CreateChannelModel from './CreateChannelModel';
import styled from 'styled-components'

import addIcon from '../assets/add.svg'


const Wrap = styled.div`
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 1rem;

    img {
        width: auto;
        height: 100%;
        object-fit: cover;
    }
`

const CreateChannel = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Wrap >
                <h3>Channel</h3>
                <img className='pointer' src={addIcon} alt='add Icon' onClick={() => setOpen(true)} />
            </Wrap>
            {open && <CreateChannelModel setOpen={setOpen} />}
        </>
    );
};

export default CreateChannel;