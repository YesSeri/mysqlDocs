import styled from "styled-components/macro";
import { ResultPane, ResultsContainer } from '../../../sharedStyles'

const Image = styled.img`
    border-radius: 10px;
    width: 100%;
    height: auto;
    max-width: 36rem;
`
const Link = styled.a`
    font-size: 1.1rem;
`

const MusicContainer = styled.div`
 	text-align: center;
`

export { ResultPane, ResultsContainer, Image, Link, MusicContainer }