const submit=document.getElementById("expense-add");
const table=document.getElementById("expense-table");
const leaderboardtbl=document.getElementById("leaderboard-table");
const downloadListtbl=document.getElementById("download-table");


const message=document.getElementById('msg');
// const message1=document.getElementById('msg1');
const premiumbtn=document.getElementById('premiusm-btn');
const leaderboardbtn=document.getElementById('leaderboard-btn');
const pagination=document.getElementById('pagination');


submit.addEventListener('click',addexpense);
leaderboardbtn.addEventListener('click',showleaderboard);





// Prevent the default behavior of the click event on the select element
const selectElement = document.getElementById("rowPerPage");
console.log(selectElement.value);
selectElement.addEventListener("change", async () => {
  const selectedOption = selectElement.selectedOptions[0];
  console.log(`Selected option: ${selectedOption.value}`);  
  const rowsize=selectedOption.value;
  localStorage.setItem('pagesize',rowsize);
  const token=localStorage.getItem("user");

  const pageno=localStorage.getItem('pageno');
  const expensedata=await axios.get(`http://localhost:4000/getexpensedata?param1=${pageno}&param2=${rowsize}`,{headers: {"Authorization":token}});
        showPagination(
            expensedata.data.currentPage,
            expensedata.data.hasNextPage,
            expensedata.data.nextPage,
            expensedata.data.hasPreviousPage,
            expensedata.data.previousPage,
            expensedata.data.lastPage)
            table.innerHTML="";
        for (let index = 0; index < expensedata.data.expensedata.length; index++) {
        display(expensedata.data.expensedata[index]);
        }
  console.log(expensedata);

});

async function addexpense(event)
{
    try {
        // event.preventDefault();
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
            const token=localStorage.getItem("user");
                const adddata= await axios.post("http://localhost:4000/addexpense",expensedata,{headers: {"Authorization":token}});
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

const abc=88;
localStorage.setItem("abc",abc);
console.log(localStorage.getItem('abc'));
localStorage.setItem("abc",59);


window.addEventListener('DOMContentLoaded',async(event)=>{
    try {
        const pageno=1;   
        localStorage.setItem('pageno',pageno);
        const token=localStorage.getItem("user");
        var pageSize = localStorage.getItem('pagesize') || 5;
        // var pageno = localStorage.getItem('pageno') || 1;
        console.log("token"+token);
        console.log("i am window listner");
       const expensedata=await axios.get(`http://localhost:4000/getexpensedata?param1=${pageno}&param2=${pageSize}`,{headers: {"Authorization":token}});
        console.log(expensedata);
        console.log(expensedata.data.ispremiumuser);
        checkispremium(expensedata.data.ispremiumuser);

    
        if(expensedata.data.expensedata.length<=0)
        {
            message.innerHTML='<h1>No record found</h1>';
        }else
        {
            message.innerHTML='';
        }


        showPagination(
            expensedata.data.currentPage,
            expensedata.data.hasNextPage,
            expensedata.data.nextPage,
            expensedata.data.hasPreviousPage,
            expensedata.data.previousPage,
            expensedata.data.lastPage)
       for (let index = 0; index < expensedata.data.expensedata.length; index++) {
        display(expensedata.data.expensedata[index]);
       }
    } catch (error) {
        console.log(error);
        if(error.response)
        {
           console.error(error.response.data.msg);
        }
    }
    
})




function display(data)
{
//     const tbl1=`<tr>
//     <th>Expense</th>
//     <th>Choice</th>
//     <th>Description</th>
//     <th>Edit</th>
//     <th>Delete</th>
// </tr>`;
// table.innerHTML=tbl1;
    const tbl=` 
                <tr id=${data.id}>   
               <td hidden>${data.id}</td>
                <td>${data.expense}</td>
                <td>${data.choice}</td>
                <td>${data.description}</td>
                <td><button type="button" onclick=editexpense('${data.id}','${data.expense}','${data.expense}','${data.description}')>Edit</button></td>
                <td><button type="button" onclick=deletexpense('${data.id}')>Delete</button></td>

              <tr/>`
             
        table.innerHTML+=tbl;
        // table.innerHTML = "";
}


async function deletexpense(expenseid)
{
    try {
        const token=localStorage.getItem("user");
        const deletestatus= await axios.delete(`http://localhost:4000/deleteExpenseData/${expenseid}`,{headers: {"Authorization":token}});
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




function checkispremium(isuserpremium)
{
    
    if(isuserpremium)
    {
        document.getElementById("premiusm-btn").hidden = true;
        message1.style.display='block';
       // <input type="button" value="Premium" id="premiusm-btn"/>
    }
    else
    {
        message1.style.display='none';
        document.getElementById("premiusm-btn").hidden = false;
    }
}



let buttonclick=0;

async function showleaderboard()
{ 
    leaderboardtbl.style.display='block';
    try {
        leaderboardtbl.innerHTML='';
        if(buttonclick===0)
        {
            const token=localStorage.getItem("user");
            const expensedata=await axios.get("http://localhost:4000/getleaderboarddata",{headers: {"Authorization":token}});
            console.log("leaderboard data+"+expensedata.data.leaderedata[0].username);
            for (let index = 0; index < expensedata.data.leaderedata.length; index++) {
                // const element = expensedata.data[index];
                // console.log(expensedata.data[index].id);
                tbleleadboard(expensedata.data.leaderedata[index])
                
            }
            buttonclick=1;
            
        }else{
            buttonclick=0;
            leaderboardtbl.style.display='none'

        }
    } catch (error) {
        console.log(error);
    }
    
}



function tbleleadboard(data)
{
    const tbl=`<tr> 
                <td>${data.username}</td>
                <td>${data.totalexpense}</td>
              </tr>`
               leaderboardtbl.innerHTML+=tbl;
        //    tbl+=leaderboardtbl.innerHTML;
}

  function download()
{
    const token=localStorage.getItem("user");
    console.log(" i am download calling");
     axios.get("http://localhost:4000/downloaddata",{headers: {"Authorization":token}})
     .then((response)=>{
        if(response.status===200){
            console.log(response.data.fileurl);
            var a =document.createElement("a");  
            a.href=response.data.fileurl;
            a.download='expense.txt';
            a.click();
        }else{
            throw new Error(response.data.message);
        }
     })
     .catch(error=>{
        console.log(error)
     }) 
  
}

async function downloadAllFile()
{
    try {
        downloadListtbl.innerHTML='';
        const token=localStorage.getItem("user");
    const DownloadFilelist= await axios.get("http://localhost:4000/downloaddataAllFile",{headers: {"Authorization":token}})
       .then((response)=>{
            if(response.status===200){
                console.log(response);
                for (let index = 0; index < response.data.downloadFileData.length; index++) {
                    console.log('i am download data11');
                    downloadfiledata(response.data.downloadFileData[index]);
                }
            }
       })

    } catch (error) {
        console.log(error);
    }
}

function downloadfiledata(data)
{
    const tbl=`<tr> 
                <td>${data.downloaddate}</td>
                <td>${data.filename}</td>
                <td><button type="button" onclick=downloadFile('${data.filename}')>Download</button></td>
              </tr>`
              downloadListtbl.innerHTML+=tbl;
}

function downloadFile(fileUrl) {
    var url = fileUrl; // replace with your file URL
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Expense.pdf'; // replace with your desired file name
    a.click();
  }


  function showPagination(
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage
  )
  {
    //  table.innerHTML="";
    pagination.innerHTML='';
   if(hasPreviousPage){

    const btn2 =document.createElement('button')
    
    btn2.innerHTML = previousPage
    
    // btn2.addEventListener('click', () => getProducts(previousPage))
    btn2.addEventListener('click', function(event) {
        event.preventDefault();
        getProducts(previousPage);
      });
    
    pagination.appendChild(btn2)
    
    }
    
    const btn1 = document.createElement('button');
    
    btn1.innerHTML = `<h3>${currentPage}</h3>`
    
    // btn1.addEventListener('click', ()=>getProducts(currentPage))
    btn1.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.setItem('pageno',currentPage);
        getProducts(currentPage);
      });
    
    pagination.appendChild(btn1)


    if (hasNextPage) {

        const btn3= document.createElement('button')
        
        btn3.innerHTML = nextPage
        console.log('i am next page');
        // btn3.addEventListener('click', ()=>getProducts(nextPage))
        btn3.addEventListener('click', function(event) {
            event.preventDefault();
            getProducts(nextPage);
          });
        
        pagination.appendChild(btn3)
    
    }
}
    

async function getProducts (page){
    // page.preventDefault();
    var pageSize = localStorage.getItem('pagesize') || 5;
    localStorage.setItem('pageno',page);
    table.innerHTML="";
    const token=localStorage.getItem("user");
    console.log("hey i am page callin");
    const expensedata=await axios.get(`http://localhost:4000/getexpensedata?param1=${page}&param2=${pageSize}`,{headers: {"Authorization":token}})
        console.log(expensedata.data+"dddd");
        for (let index = 0; index <expensedata.data.expensedata.length; index++) {
            display(expensedata.data.expensedata[index]);
           }
         
         showPagination(
            expensedata.data.currentPage,
            expensedata.data.hasNextPage,
            expensedata.data.nextPage,
            expensedata.data.hasPreviousPage,
            expensedata.data.previousPage,
             expensedata.data.lastPage)
    

 }

    