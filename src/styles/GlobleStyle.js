import { createGlobalStyle } from 'styled-components'

const GlobleStyle = createGlobalStyle`
    html {
        font-size: 16px;
        box-sizing: border-box;
    }
    *, *:before, *::after {
        padding: 0;
        margin: 0;
        box-sizing: inherit;
    }
    body {
        font-size: 1rem;
        font-family: ${props => props.theme.font}, sans-serif;
        color: ${props => props.theme.primaryColor};
        background-color: ${props => props.theme.bg};
    }
    h1,h2,h3,h4,h5,h6 {
        font-weight: normal;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    input, textarea, button, video{
        outline: none;
        font-size: 1rem;
    }
    button {
        cursor: pointer;
        font-family: 'Fira Sans', sans-serif;
    }
    textarea {
        resize: none;
    }
    .pointer {
        cursor: pointer;
    }
    svg {
        cursor: pointer;
    }
`

export default GlobleStyle