   // Check if required values are present before attempting to add expense
 // Call addExpense function with the retrieved values
export default function expenseRoutes(expense_db) {


    async function home(req, res) {
        res.render('index', {
            totalExpense: await expense_db.categoryTotals()

        });
    }
    async function add(req, res) {
        const expenseDescription = req.body.textDescribe;
        const amount = req.body.textAmount;
        const selectCategory = req.body.categoryRadio;
    
      
        if (expenseDescription && amount && selectCategory) {
           
            await expense_db.addExpense(selectCategory, amount);
            res.redirect('/'); // Redirect to the home page after adding the expense
        } 
    }
    


  
 return{
    home,
    add
   

 }
}

