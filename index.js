const signIn = document.querySelector(".signin");
const signUp = document.querySelector(".signup");

window.addEventListener("load", ()=>{
    const token = localStorage.getItem("jwt");

    if(token){
        location.href = "/pages/dashboard/index.html";
    }
});

signIn.addEventListener("click",()=>{
    location.href = "/pages/signin/index.html";
});

signUp.addEventListener("click",()=>{
    location.href = "/pages/signup/index.html";
});