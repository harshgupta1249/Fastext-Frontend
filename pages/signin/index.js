const signinForm = document.querySelector(".signinForm");
const url = "https://fastext.herokuapp.com";

signinForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    const email = document.querySelector(".signin-email").value;
    const password = document.querySelector(".signin-password").value;

    fetch(`${url}/auth/signin`,{
        method:"POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email,password}),
    })
    .then((res)=>res.json())
    .then((data)=>{
        const{token}=data;

        if(token){
            localStorage.setItem("jwt", token);
            location.href = "/pages/dashboard/index.html";
        }else{
            alert("User does not exist");
            location.href = "/pages/signin/index.html";
        }
    })
    .catch((err)=>{
        console.log(err);
        alert("Something Unexpected occured ! Try Again..");
    });
});