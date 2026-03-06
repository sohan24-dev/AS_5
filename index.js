const password = document.getElementById('password')
let userName = document.getElementById('username')



document.getElementById('singInbtn').addEventListener('click',()=>{
if(userName.value.toLowerCase() === 'admin' && password.value.toLowerCase() === 'admin123'){
    window.location.href = "index2.html";
}
else{
    alert(" userName = admin and password = admin123 ")
}
})






