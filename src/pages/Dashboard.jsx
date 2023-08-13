import React from 'react'

// helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from '../helpers'

// React-Router-DOM imports
import { Link, useLoaderData } from 'react-router-dom';

// component imports
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

// Library imports
import { toast } from 'react-toastify';





// loader (loader function)
export function dashboardLoader () {
    const userName = fetchData("userName"); //fetch data from local storage
    const budgets = fetchData("budgets"); //look in the local storage and load budget
    const expenses = fetchData("expenses"); //look in the local storage and load expenses
    return { userName, budgets, expenses }; // return data
}

// Action
export async function dashboardAction({ request }) {
    await waait();
    const data = await request.formData();
    // console.log({data, request}); //Tested
    //const userName = data.get("userName"); //Captured form input - Alternate way
    // console.log(userName); // Tested
    const { _action, ...values } = Object.fromEntries(data); // Captured form data object
    //console.log(formData); //Tested
    //console.log(_action); //Tested

    //new user submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome ${values.userName}`)
        } catch (e) {
            throw new Error("There was a problem creating your account.");
        }
    }

    if (_action === "createBudget") {
        try {
            // create budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            });

            return toast.success("Budget created!"); 
        } catch (e) {
            throw new Error("There was a problem creating your budget.")
        }
    }

    if (_action === "createExpense") {
        try {
            createExpense({  // create an expense
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            }) 
            return toast.success(`Expense ${values.newExpense} created!`);
        } catch (e) {
            throw new Error("There was a problem creating your expense.");
        }
    }

    if (_action === "deleteExpense") {
        try {
            deleteItem({  // delete item
                key: "expenses",
                id: values.expenseId
            });
            return toast.success("Expense deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
    }
    
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData(); //whatever data is present in our loader save it in a variable

  return (
    <>
        {userName ? (
            <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>

                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0
                        ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => (
                                            <BudgetItem key = {budget.id} budget = {budget} />
                                        ))
                                    }
                                </div>

                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table 
                                                expenses={expenses
                                                    .sort((a, b) => b.createdAt - a.createdAt)
                                                    .slice(0, 8)
                                                } 
                                            />
                                            {
                                                expenses.length > 8 && (
                                                    <Link
                                                        to="expenses"
                                                        className='btn btn--dark'
                                                    >
                                                        View all expenses
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                        : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
                    
                </div>
            </div>
        ) : <Intro />}
    </>
  )
}

export default Dashboard
