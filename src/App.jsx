import styled from "styled-components"
import GlobalStyle from "./styles/GlobalStyles"
import Button from './ui/Button'
const H1 =styled.h1 `
  font-size: 30px;
  font-weight: 600;
  color: #787878;
  background-color: #f5f5f5;
  `



function App() {
  return (
    <>
      <GlobalStyle/>
      <div>
        <H1>Welcome to React</H1>
        <Button>Click me</Button>
      </div>
    </>
  )
}

export default App
