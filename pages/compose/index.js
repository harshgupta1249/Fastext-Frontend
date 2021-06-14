const msgForm = document.querySelector(".message-form");
const home = document.querySelector(".home");
const url="https://fastext.herokuapp.com";
const token = localStorage.getItem("jwt");
msgForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    const receiver = document.querySelector(".email").value;
    const message = document.querySelector(".msg").value;
    
    fetch(`${url}/msg/send`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            authorization: token,
        },
        body: JSON.stringify({receiver, message}),
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.message){
            alert("Message sent succesfully");
            location.href = "/pages/dashboard/index.html";

        }
    })
    .catch((err)=>{
        console.log(err);
        alert("Error sending msg");
        
    });
});

home.addEventListener("click",()=>{
    location.href="/pages/dashboard/index.html";
});