import LoginPage from './component/Login'
import RoleBasedSignup from './component/Signup'
import { RouterProvider } from 'react-router-dom'
import router from './routes/route'
function App() {

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
