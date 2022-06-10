import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;
`

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bacl
`

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DogsContainer = styled.div`
`



export default function App() {
  const [start, setStart] = useState(false)
  const [count, setCount] = useState(0)
  const [dogs, setDogs] = useState([])
  const [numberOfDogs, setNumberOfDogs] = useState([])
  const intervalRef = useRef(null);

  /** aqui popula o array de dogs */
  useEffect(() => {
    axios.get(`https://dog.ceo/api/breeds/image/random/${numberOfDogs}`)
      .then((response) => {
        setDogs(response.data.message)
      }).catch((error) => console.log(error))

    if (count === numberOfDogs) return pauseTimer()

  }, [count, numberOfDogs])

  function showTimer() {
    console.log('entrei aqui', count)
    setCount(prevState => prevState < numberOfDogs
      ? prevState + 1
      : prevState)
  }

  function startTimer() {
    setStart(true)
    intervalRef.current = setInterval(showTimer, 3000);
  }

  function pauseTimer() {
    setStart(false)
    setCount(0)
    setNumberOfDogs(0)
    clearInterval(intervalRef.current);
  }

  function showDogs() {
    return start && (
      <>
        <h1>{`Motivo ${count + 1}`}</h1>
        <img src={dogs[count]} alt='Doguinho' />
      </>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <TitleContainer>
          <h1>DE 1 A 10: Quantos motivos você precisa pra sorrir hoje?</h1>
          <h3>Preciso de {numberOfDogs} motivos, viu</h3>
        </TitleContainer>

        <SearchContainer>
          <input type="number" min={1} max={10} onChange={(e) => setNumberOfDogs(Number(e.target.value))} value={numberOfDogs} required />
          <button onClick={startTimer} disabled={start}>Clique aqui e descubra!</button>
        </SearchContainer>

        <DogsContainer>
          {showDogs()}
        </DogsContainer>
      </Container>
    </>
  )
}