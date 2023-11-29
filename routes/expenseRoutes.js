export default function expenseRoutes(expense_db) {
    async function home(req, res) {
        res.render('index', {
            totalExpense: await expense_db.categoryTotals()

        });
    }
    async function add(){
    const expenseDescription = req.body.textDescribe;
    const amount = req.body.textAmount;
    const selectCategory = req.body.categoryRadio;

    await expense_db.addExpense()
    res.redirect('/')
    }


  
 return{
    home,
    add
   

 }
}
