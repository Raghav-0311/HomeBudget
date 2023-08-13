import React from 'react'

// React Router DOM imports
import { useLoaderData } from 'react-router-dom';

// helper imports
import { deleteItem, fetchData } from '../helpers';

// Component imports
import Table from '../components/Table';

// Library imports
import { toast } from 'react-toastify';


// loader (loader function)
export function expensesLoader () {
    const expenses = fetchData("expenses"); //look in the local storage and load expenses
    return { expenses }; // return data
}

// action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

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


const ExpensesPage = () => {
    const { expenses } = useLoaderData();
  return (
    <div className='grid-lg'>
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0
        ? (
            <div className="grid-md">
                <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                <Table expenses={expenses} />
            </div>
        )
        : <p>No Expenses to show</p>
      }
    </div>
  )
}

export default ExpensesPage
