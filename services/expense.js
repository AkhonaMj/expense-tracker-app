// Create an addExpense function to insert/add an expense into the database's expense table.

//Create  allExpenses function to  get all expenses from the expense table.

//Create expensesForCategory to get expenses filtered by a specific categoryId from the expense table.

//Create a deleteExpense function that will be responsible for deleting expenses from the expense table based on the provided expenseId.

//Create a categoryTotals function to get  all the totals from the expense table


export default function expenseDB(db) {

    async function addExpense(categoryId, amount) {
      await db.none(
        "INSERT INTO expense (category_id, amount) VALUES($1, $2)",
        [categoryId, amount]
      );
    }
  
    async function allExpenses() {
      return await db.any("SELECT * FROM expense");
    }
  
    async function expensesForCategory(categoryId) {
      return await db.any("SELECT * FROM expense WHERE category_id = $1", [categoryId]);
    }
  
    async function deleteExpense(expenseId) {
      await db.none("DELETE FROM expense WHERE id = $1", [expenseId]);
    }
  
    async function categoryTotals(){
      return await db.any("SELECT category_id, SUM(amount) AS total FROM expense GROUP BY category_id");
    }
  
    return {
      addExpense,
      allExpenses,
      expensesForCategory,
      deleteExpense,
      categoryTotals
    };
  }
  