import {createBrowserRouter} from "react-router-dom";
import RoleBasedSignup from "../component/Signup";
import LoginPage from "../component/Login";
import LoginAdmin from "../component/Login-admin";
// import Student from "../component/Student";
import StudentLayout from "./StudentLayout";
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
        // children:[
        //     {index:true,element:<Student/>}
        // ]   
    }
])
export default router;