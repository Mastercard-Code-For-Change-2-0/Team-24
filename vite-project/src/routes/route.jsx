import {createBrowserRouter} from "react-router-dom";
import RoleBasedSignup from "../component/Signup";
import LoginPage from "../component/Login";
import LoginAdmin from "../component/Login-admin";
// import Student from "../component/Student";
import StudentLayout from "./StudentLayout";
import Student_Profile from "../component/Student_Profile"; 
const router = createBrowserRouter([
    {
        path : '/',element:<RoleBasedSignup/>
    },
    {
        path : '/login',
        children:[
            {path :'student',element:<LoginPage/>},
            {path:"professional",element:<LoginAdmin/>}
        ]
    },
    {
        path:"/student",element: <StudentLayout />,
        children:[
            {index:true,element:<Student_Profile/>},
        ]   
    }
])
export default router;