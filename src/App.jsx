import { useState } from 'react'
import './App.css'
import HelloWorld from './components/ListEmployeeComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HedarComponenet from './components/HedarComponenet'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <div id='root'>
          <header className='header'>
            <HedarComponenet />
          </header>
          <main className='content' >
            <Routes>
              <Route path="/" element={<ListEmployeeComponent />} />
              <Route path="/employees" element={<ListEmployeeComponent />} />
              <Route path="/add-employee" element={<EmployeeComponent />} />
              <Route path="edit-employee/:id" element={<EmployeeComponent />}></Route>
            </Routes>


          </main>
          <footer>
            <FooterComponent />
          </footer>
        </div>

      </BrowserRouter>



    </>
  )
}

export default App
