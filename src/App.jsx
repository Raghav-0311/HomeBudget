import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// liberary
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main, { mainLoader } from "./layouts/Main"; // import Main layout component

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard"; // import Dashboard component
import Error from "./pages/Error"; // import Error component
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage"; // import ExpensesPage component
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage"; // import BudgetPage component

// Actions
import { logoutAction } from "./actions/logout"; // import logout action
import { deleteBudget } from "./actions/deleteBudget"; // import deleteBudget action




/* IMPLEAMENTING ROUTER */
const router = createBrowserRouter([
  {
    path: "/", //path where you look at
    element: <Main />, // element / component that you want to load
    loader: mainLoader, // load data from the following loader function
    errorElement: <Error />, // if there is an error display our error componet
    children: [
      {
        path: "/", //path where you look at
        element: <Dashboard />, // element / component that you want to load
        loader: dashboardLoader, // load data from the following loader function
        action: dashboardAction,
        errorElement: <Error /> // if there is an error display our error componet
      },
      {
        path: "expenses", 
        element: <ExpensesPage />, 
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id", 
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
