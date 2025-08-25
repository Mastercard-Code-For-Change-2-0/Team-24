import {createBrowserRouter} from "react-router-dom";
import RoleBasedSignup from "../component/Signup";
import LoginPage from "../component/Login";
import LoginAdmin from "../component/Login-admin";
// import Student from "../component/Student";
import StudentLayout from "./StudentLayout";
import Student_Profile from "../component/Student_Profile";
import Student_Analytics from "../component/Student_Analytics";
import Student_Documents from "../component/Student_Documents";
import Student_Dashboard from "../component/Student_Dashboard";
import Student_Settings from "../component/Student_Settings";
import Student_Notifications from "../component/Student_Notifications";
import Homepage from "../component/Homepage";
import Impact_Stories from "../component/Impact_Stories";
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
                { path: "", element: <Student_Dashboard/> },
                { path: "home", element: <Homepage/> },
                { path: "profile", element: <Student_Profile/> },
                { path: "analytics", element: <Student_Analytics/> },
                { path: "impact", element: <Impact_Stories/> },
                { path: "documents", element: <Student_Documents/> },
                { path: "notifications", element: <Student_Notifications/> },
                { path: "settings", element: <Student_Settings/> },
        ]
    },
    {
        path:"/admin",
        children:[
                { path: "dash", element: <AdminDashboard/>},
                {path:"bulk",element:<Admin_Bulk/>},
        ]
    },
    {
        path:"/clerk",
        children:[
                {path:"dashboard",element:<Admin_Bulk/>},
        ]
    }
])
export default router;