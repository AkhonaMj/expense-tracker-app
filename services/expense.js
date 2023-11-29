export default function expenseDB(db) {

  async function addExpense(categoryId, amount) {
    await db.oneOrNone(
      "INSERT INTO expense (category_id, amount) VALUES($1, $2)",
      [categoryId, amount]
    );
  }
  async function allExpenses() {
    await db.any("SELECT * FROM expense");
  }

  async function expensesForCategory(categotyId) {
    await db.any("SELECT * FROM expense WHERE categoty_id = $1", [categotyId]);
  }

  async function deleteExpense(expenseId) {
    await db.any("DELETE FROM expense WHERE id = $1", [expenseId]);
  }

  async function categoryTotals(){
    await db.any("SELECT * FROM expense WHERE total = $1")

  }
  return {
    addExpense,
    allExpenses,
    expensesForCategory,
    deleteExpense,
    categoryTotals
  };
}
