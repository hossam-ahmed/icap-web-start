import "./App.css";
import { Button } from "./shared/Button/Button.tsx";

function App() {

  return (
    <>
      <span className='dev-content'>Welcome to iCAP - WEB</span>

      <br />
      Buttons
      <Button variant="primary" className='outlined' disabled>
        Click me!
      </Button>
    </>
  )
}

export default App
