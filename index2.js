const allbtn = ["all", "open", "closed"];
const allContainer = ["containerAll", "containerOpen", "containerClosed"];

allbtn.forEach((clickBtn, index )=>{
    document.getElementById(clickBtn).onclick = () =>{
        allbtn.forEach( btnRemove => document.getElementById(btnRemove).classList.remove('btn-primary'));
        document.getElementById(clickBtn).classList.add('btn-primary')
    }
})