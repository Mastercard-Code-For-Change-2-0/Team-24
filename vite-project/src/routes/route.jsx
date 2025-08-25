import {createBrowserRouter} from "react-router-dom";
import RoleBasedSignup from "../component/Signup";
import LoginPage from "../component/Login";
import LoginAdmin from "../component/Login-admin";
// import Student from "../component/Student";
import StudentLayout from "./StudentLayout";
import Student_Profile from "../component/Student_Profile"; 
import AdminDashboard from "../component/AdminDashboard";
import Admin_Bulk from "../component/Admin_Bulk";
const router = createBrowserRouter([
    {
        path : '/',element:<RoleBasedSignup/>
    },
    {
        path : '/login',
        children:[
            {path :'student',element:<LoginPage/>},
            {path:"admin",element:<LoginAdmin/>},
            {path:"", element:<LoginPage/>}
        ]
    },
    {
        path:"/student",element: <StudentLayout />,
        children:[
                { path: "home", element: <div>Student Home</div> },
                { path: "profile", element: <Student_Profile/> },
                { path: "documents", element: <div>Documents</div> },
                { path: "notifications", element: <div>Notifications</div> },
                { path: "settings", element: <div>Settings</div> },
        ]   
    },
    {
        path:"/admin",
        children:[
                { path: "dash", element: <AdminDashboard/>},
                {path:"bulk",element:<Admin_Bulk/>},

        ]    
    }
])
export default router;