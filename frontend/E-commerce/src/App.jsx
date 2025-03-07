import AdminPage from "./assets/components/adminpage"
import CustomerPage from "./assets/components/customerpage"
import Login from "./assets/components/login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <header>
      <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login></Login>}/>
      <Route path='/cust' element={<CustomerPage></CustomerPage>}/>
      <Route path='/admin' element={<AdminPage></AdminPage>}/>
    </Routes>
    </BrowserRouter>
    </div>
    </header>
  )
}

export default App
