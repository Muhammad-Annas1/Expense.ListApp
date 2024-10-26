"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaTrash } from "react-icons/fa";

type Expense = {
  description: string;
  amount: number;
};

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [showTotal, setShowTotal] = useState<boolean>(false);

  const addExpense = () => {
    if (!description || !amount) {
      alert('Please Fill In All Fields😊');
      return;
    }
    const newExpense = { description, amount: parseFloat(amount) };
    setExpenses((prev) => [...prev, newExpense]);
    setTotalAmount((prevTotal) => prevTotal + newExpense.amount);
    setDescription('');
    setAmount('');
  };

  const handleRemoveExpense = (index: number) => {
    const expenseToRemove = expenses[index].amount;
    setExpenses((prev) => prev.filter((_, i) => i !== index));
    setTotalAmount((prevTotal) => prevTotal - expenseToRemove);
  };

  return (
    <div className="p-4 bg-teal-100 max-h-full max-w-screen bg-center bg-cover">
      <Card className="mb-6 border-2 border-gray-600 rounded-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Add New Expense</CardTitle>
        </CardHeader>

        <CardContent>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded mb-2 w-full "
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
          <Button onClick={addExpense} className="bg-blue-500 text-white w-full hover:bg-blue-600 text-lg">
            Add Expense
          </Button>
        </CardContent>
      </Card>

      <Card className="border-2 border-gray-600 rounded-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Expense List</CardTitle>
          <CardDescription className="text-lg">List Of Expenses</CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            {expenses.length === 0 ? (
              <p className="text-lg font-normal">No Expenses Added Yet.</p>
            ) : (
              expenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                  <span>
                    {expense.description}: Pkr {expense.amount.toFixed(2)}
                  </span>
                  <button
                    className="text-red-500 hover:bg-red-100"
                    onClick={() => handleRemoveExpense(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center"> {/* Centering the button */}
          <p className="text-gray-800 text-center mt-4 text-lg">Manage Your Budget Wisely!</p>
          <Button
            onClick={() => setShowTotal(!showTotal)}
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 w-32 text-lg p-2"
          >
            {showTotal ? "Hide Total" : "Show Total"}
          </Button>
          {showTotal && (
            <p className="text-xl font-bold text-center mt-4">Total Amount: Pkr {totalAmount.toFixed(2)}</p>
          )}
        </CardFooter>
        <p className="text-center text-lg">&copy; 2024 | Build With❤️By Muhammad Annas</p>
      </Card>
    </div>
  );
};

export default ExpenseList;
