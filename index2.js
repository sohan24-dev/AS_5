const allbtn = ["all", "open", "closed"];
const allContainer = ["containerAll", "containerOpen", "containerClosed"];

allbtn.forEach((clickBtn, index )=>{
    document.getElementById(clickBtn).onclick = () =>{
        allbtn.forEach( btnRemove => document.getElementById(btnRemove).classList.remove('btn-primary'));
        document.getElementById(clickBtn).classList.add('btn-primary')
    }
})


const containerAll = document.getElementById('containerAll')

async function issues() {
    const res =await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data =await res.json()
    displayAllIssues(data.data);
}
issues()


function displayAllIssues(issues){
    issues.forEach(issuescard =>{
        const card = document.createElement('div')
        card.classList = "card bg-base-100 shadow-sm"
        card.innerHTML = `
                <div class="w-96">
                    <div class="card-body space-y-2">
                        <div class="text-right">
                            <p
                                class=" font-medium text-xl bg-[#FEECEC] inline-block px-2 py-1 text-[#EF4444] rounded-sm">
                                ${issuescard.priority}</p>
                        </div>
                        <h2 class="card-title">
                            ${issuescard.title}
                        </h2>
                        <p class="text-[#b4b4c9]">${issuescard.description}
                        </p>
                        <div class="card-actions justify-left">
                            <div class="badge badge-outline bg-[#FEECEC] text-[#EF4444]">${issuescard.labels[0]}</div>
                            <div class="badge badge-outline text-[#D97706] bg-[#FFF8DB]">${issuescard.labels[1] || "empty" }</div>
                        </div>
                    </div>
                    <hr class="w-full  border-[#E4E4E7]">
                    <div class="m-4 space-y-2">
                        <p class="text-[#b4b4c9]">#by jodd</p>
                        <p class="text-[#b4b4c9]">data</p>
                    </div>
                </div>
        `
        containerAll.appendChild(card)
    })
}