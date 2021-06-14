const signupForm = document.querySelector(".signupForm");
const url = "https://fastext.herokuapp.com";

signupForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    const name = document.querySelector(".signup-name").value;
    const email = document.querySelector(".signup-email").value;
    const password = document.querySelector(".signup-password").value;

    fetch(`${url}/auth/signup`, { 
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
    body : JSON.stringify({name,email,password}),
    })
    .then((res)=>res.json())
    .then((data)=>{
        const {token} = data;

        if(token){
            localStorage.setItem("jwt", token);
            location.href = "/pages/dashboard/index.html";
        }else{
            alert("User not registered");
            location.href = "/pages/signup/index.html";
        }
    }).catch((err) =>{
        console.log(err);
        alert("Something unexpected occured! Sign up again");
        
    });

});