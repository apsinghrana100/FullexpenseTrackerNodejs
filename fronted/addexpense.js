
const submit=document.getElementById("expense-add");
const table=document.getElementById("expense-table");
const message=document.getElementById('msg');

submit.addEventListener('click',addexpense);

async function addexpense(event)
{
    try {
        const expense=document.getElementById("expens-money").value;
        const description=document.getElementById("expense-des").value;
        const choice=document.getElementById("drop-choice").value;

        if(expense!=='' && expense!==undefined && description!=='' && description!==undefined && choice!=='' && choice!==undefined)
        {
            const expensedata={
                expense,
                description,
                choice
            }
                const adddata= await axios.post("http://localhost:4000/addexpense",expensedata);
                if(adddata)
                {
                    console.log(adddata.data.msg);
                    location.reload();
                }
            
        }else{
            console.log("something went wrong or Field might be empty");
        }
        
    } catch (error) {
         console.log(error);
         if(error.response)
         {
            console.log(error.response.data);
         }
    }
}

window.addEventListener('DOMContentLoaded',async(event)=>{
    try {
        console.log("i am window listner");
       const expensedata=await axios.get("http://localhost:4000/getexpensedata");
    //    console.log(expensedata.data.expensedata[0]);
        if(expensedata.data.expensedata.length<=0)
        {
            message.innerHTML='<h1>No record found</h1>';
        }else
        {
            message.innerHTML='';
        }

       for (let index = 0; index < expensedata.data.expensedata.length; index++) {
        display(expensedata.data.expensedata[index]);
       }
    } catch (error) {
        Console.log(error);
        if(error.response)
        {
           console.error(error.response.data.msg);
        }
    }
    
})

function display(data)
{
    const tbl=`<tr id=${data.id}>
               <td hidden>${data.id}</td>
                <td>${data.expense}</td>
                <td>${data.choice}</td>
                <td>${data.description}</td>
                <td><button type="button" onclick=editexpense('${data.id}','${data.expense}','${data.expense}','${data.description}')>Edit</button></td>
                <td><button type="button" onclick=deletexpense('${data.id}')>Delete</button></td>

              <tr/>`

        table.innerHTML+=tbl;
}

async function deletexpense(expenseid)
{
    try {
        const deletestatus= await axios.put(`http://localhost:4000/deleteExpenseData/${expenseid}`);
        if(deletestatus.data.success)
        {
            console.log(deletestatus.data.msg);
            location.reload();
        }
    } catch (error) {
        console.log(error);
        if(error.response)
        {
            console.error(error.response.data.msg)
        }
    }
}