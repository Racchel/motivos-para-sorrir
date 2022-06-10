import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  line-height: 40px;
  background-color: rgba(245 245 245	);
  background-image: url('https://i.pinimg.com/originals/8f/fc/30/8ffc30bd71b68a21c1f3ea3f876d120c.png');
  opacity: 0.2;
`

const TitleContent = styled.h1`
  position: absolute;
  top: 60px;
  text-align: center;
`

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 50px;
    padding: 5px 7px;
    margin: 0 10px;
  }

  button {
    margin: 0 10px;
    padding: 5px 7px;
    border: none;
    cursor: pointer;
  }

  button: hover {
    background-color: rgba(0,0,0,0.3);
  }
`
const Card = styled.div`
  width: 500px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const Image = styled.div`
  width: 100%;
  height: 400px;
  background-image: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const TitleImage = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
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
      }).catch((error) => {
        console.log(error)
      })

    if (count === numberOfDogs) return pauseTimer()

  }, [count, numberOfDogs])

  function showTimer() {
    console.log('entrei aqui', count)
    setCount(prevState => prevState < numberOfDogs
      ? prevState + 1
      : prevState)
  }

  function startTimer() {

    if (numberOfDogs !== 0 && !Array.isArray(numberOfDogs)) {
      setStart(true)
      intervalRef.current = setInterval(showTimer, 3000);
    } else {
      console.log('entrou no else')
      alert('Escolhe ao menos um motivo, pessoinha')
    }
  }

  function pauseTimer() {
    setStart(false)
    setCount(0)
    setNumberOfDogs(0)
    clearInterval(intervalRef.current);
  }

  function showDogs() {
    return start && (
      <Card>
        <TitleImage>Motivo {count + 1}</TitleImage>
        <Image image={dogs[count]} />
      </Card>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <TitleContainer />
        <TitleContent>DE 0 A 10: Quantos motivos você precisa pra sorrir hoje?</TitleContent>

        <SearchContainer>
          <form onSubmit={() => startTimer()}>
            <label>Preciso de
              <input type="number"
                required
                min={1} max={10}
                value={numberOfDogs}
                onChange={(e) => setNumberOfDogs(Number(e.target.value))}
              />
              motivos, viu!
            </label>
            <button onClick={() => startTimer()} disabled={start}> Quero ver!  </button>
          </form>
        </SearchContainer>

        <DogsContainer>
          {showDogs()}
        </DogsContainer>
      </Container>
    </>
  )
}