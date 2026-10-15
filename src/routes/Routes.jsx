import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BrowseBooks from "../pages/BrowseBooks";
import BooksDetails from "../pages/BooksDetails";
import MyReserved from "../pages/MyReserved";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/UserProfile";
import ChangePassword from "../pages/ChangePassword";
import AdminLayout from "../layout/AdminLayout";
import BookManage from "../pages/admin/BookManage";
import EditBook from "../pages/admin/EditBook";
import IssueBook from "../pages/admin/IssueBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
          path:"/signup",
          element:<SignUp/>
        },
        {
          path:"/books",
          element:<BrowseBooks/>
        },
        {
          path:"/books/:id",
          element:<PrivateRoute><BooksDetails/></PrivateRoute>
        },
        {
          path:"reserve/my",
          element:<PrivateRoute><MyReserved/></PrivateRoute>
        },
        {
          path:'user/profile',
          element:<PrivateRoute><UserProfile/></PrivateRoute>
        },
        {
          path:"/change-password",
          element:<PrivateRoute><ChangePassword/></PrivateRoute>
        }
    ]
  },
  {
    path:"/admin",
    element:<AdminLayout/>,
    children:[
      {
        path:"book-manage",
        element:<BookManage/>
      },
      {
        path:"edit-book/:id",
        element:<EditBook/>
      },
      {
        path:"issue-book",
        element:<IssueBook/>
      }
    ]
  }
]);

export default router