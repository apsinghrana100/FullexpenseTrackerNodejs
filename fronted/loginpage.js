const loginbutton=document.getElementById('login-btn');
// const submit=document.getElementById("submit-btn");
const message=document.getElementById("msg");
// submit.addEventListener('click',signup);
loginbutton.addEventListener('click',loginpage);

function goToPage() {
    window.location.href = "signinpage.htm";
  }

async function loginpage(event)
{
    event.preventDefault();
    const emailid=document.getElementById("user-email").value;
    const password=document.getElementById("user-password").value;
    try {  
        
             if(emailid!==undefined && password!=="" && password!==undefined)
             {
                const userdetail={
                    emailid,
                    password
                };
                const promise= await axios.post("http://localhost:4000/loginpage",userdetail);
                
                    if(promise.data=== "Login Successfull") {
                        message.style.backgroundColor="green";
                        cleardata();
                    } else{
                        message.style.backgroundColor="red";
                    }
                    
                    message.innerText=promise.data;
                    setTimeout(() => {
                        message.style.display = "none";
                    }, 3000);

                    message.style.display = "block";
           
             }else{
                    console.log("some Field are might be empty");
                    message.style.backgroundColor="red";
                    message.innerText="some Field are might be empty";
                   setTimeout(() => {
                      message.style.display="none";
                  }, 3000);
                  message.style.display = "block";
             }
    } catch (error) {
        console.log(error);
    }
}

function cleardata()
{
    const emailid=document.getElementById("user-email").value="";
    const password=document.getElementById("user-password").value="";
};