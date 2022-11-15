import {createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import About from "../pages/About/About";
import AddQuestions from "../pages/AddQuestions/AddQuestions";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Filter from "../pages/Filter/Filter";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import MyQuestions from "../pages/MyQuestions/MyQuestions";
import Registration from "../pages/Registration/Registration";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                loader: () => fetch('https://bcs-viva-server.vercel.app/questions'),
                element: <Home></Home>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/filter",
                element: <Filter></Filter>
            },
            {
                path: "/my-questions",
                element: <PrivateRoutes><MyQuestions></MyQuestions></PrivateRoutes>
            },
            {
                path: "/add-questions",
                element: <PrivateRoutes><AddQuestions></AddQuestions></PrivateRoutes>
            },
        ],
        errorElement: <ErrorPage></ErrorPage>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Registration></Registration>
    },
]);

export default router;