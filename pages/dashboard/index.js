const sendMsg = document.querySelector(".create");
const logout = document.querySelector(".logout");
const mainContainer = document.querySelector(".main-container");

const url="https://fastext.herokuapp.com";

const token = localStorage.getItem("jwt");

sendMsg.addEventListener("click",()=>{
    location.href = "/pages/compose/index.html";
});

let msgData = [];

const createMsg = (array) =>{
    mainContainer.innerHTML ="";

    if(array.length === 0){
      mainContainer.innerHTML = `<div class="no-msg">Horraah...NO Messages !</div>`;
    }
    else{

    array.forEach((obj) => {
        const {sender, time, message} = obj;
        const id=obj.id;

        const section = document.createElement("div");
        section.classList.add("container");
        section.id = id;

        const insideHTML = `<div class="info"><div class="email">${sender}</div><div class="time">${time}</div></div><div class="message">${message}</div><div class="delete"><a id="${id}" onclick="delMsg(this.id)"><img src="/assets/delete.png" alt="delete"></a></div>`;
        section.innerHTML = insideHTML;
        mainContainer.appendChild(section);
    });
  }
};

function delMsg(msgId){
  fetch(`${url}/msg/del/${msgId}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
      authorization : token,
    },
  }).then((res)=>res.json())
  .then(data=>{
    alert(data.message);
    location.reload();
  }).catch(err=>{
    console.log(err);
    alert("Server error");
  });
}

window.addEventListener("load",()=>{

    if (token) {
      fetch(`${url}/msg/get`, {
        method: "GET",
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          msgData = data.data;
          createMsg(data.data);
        })
        .catch((err) => {
          alert("Error Fetching data");
          console.log(err);
        });
    }
  
  });

logout.addEventListener("click",()=>{
    localStorage.removeItem("jwt");
    location.href = "/";
});
