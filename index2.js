const allbtn = ["all", "open", "closed"];
const allContainer = ["containerAll", "containerOpen", "containerClosed"];
// Click items 
allbtn.forEach((clickBtn, index) => {
    document.getElementById(clickBtn).onclick = () => {
        allbtn.forEach(btnRemove =>
            document.getElementById(btnRemove).classList.remove('btn-primary')
        );
        document.getElementById(clickBtn).classList.add('btn-primary');
        allContainer.forEach(show =>
            document.getElementById(show).classList.add("hidden")
        );
        document.getElementById(allContainer[index]).classList.remove("hidden");
    }
});


const containerAll = document.getElementById('containerAll')
// all api 
async function issues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    displayAllIssues(data.data);
    filterOpenIssues(data.data);
    filterClosedIssues(data.data);
}
issues()

// allContainer 
function displayAllIssues(issues) {
    containerAll.innerHTML = '';
    issues.forEach(issuescard => {
        let bordercolor = ""
        let img = '';
        if (issuescard.status.toLowerCase() === "open") {
            bordercolor = "border-t-4 border-[#00A96E]"
            img = "assets/Open-Status.png"
        }
        else if (issuescard.status.toLowerCase() === "closed") {
            bordercolor = "border-t-4 border-[#A855F7]"
            img = "assets/Closed- Status .png"
        }
        const card = document.createElement('div')
        card.classList = `card bg-base-100 shadow-sm ${bordercolor}`
        card.innerHTML = `
                <div class="">
                    <div class="card-body space-y-2">
                        <div class="flex justify-between ">
                        <img src="${img}" alt="">
                            <div><p
                                class=" font-medium text-xl bg-[#FEECEC] inline-block px-2 py-1 text-[#EF4444] rounded-sm">
                                ${issuescard.priority}</p></div>
                        </div>
                        <h2 class="card-title">
                            ${issuescard.title}
                        </h2>
                        <p class="text-[#b4b4c9]">${issuescard.description}
                        </p>
                        <div class="card-actions justify-left">
                            <div class="badge badge-outline bg-[#FEECEC] text-[#EF4444]">${issuescard.labels[0]}</div>
                            <div class="">${issuescard.labels[1] ? `<div class="badge badge-outline text-[#D97706] bg-[#FFF8DB]">${issuescard.labels[1]}</div>` : ""}</div>
                        </div>
                    </div>
                    <hr class="w-full  border-[#E4E4E7]">
                    <div class="m-4 space-y-2">
                        <p class="text-[#b4b4c9]">#by ${issuescard.author}</p>
                        <p class="text-[#b4b4c9]">${issuescard.createdAt}</p>
                    </div>
                </div>
        `
        containerAll.appendChild(card)
    })
}

// open container 
const containerOpen = document.getElementById('containerOpen')
function filterOpenIssues(open) {
    containerOpen.innerHTML = '';
    const openIssues = open.filter(issue =>
        issue.status.toLowerCase() === "open"
    );
    openIssues.forEach(openiss => {
        const opens = document.createElement('div');
        opens.className = "card bg-base-100 shadow-sm border-t-4 border-[#00A96E]";
        opens.innerHTML = `
                <div class="">
                    <div class="card-body space-y-2">
                        <div class="flex justify-between ">
                        <img src="assets/Open-Status.png" alt="">
                           <div> <p
                                class=" font-medium text-xl bg-[#FEECEC] inline-block  px-2 py-1 text-[#EF4444] rounded-sm ">
                                ${openiss.priority}</p></div>
                        </div>
                        <h2 class="card-title">
                            ${openiss.title}
                        </h2>
                        <p class="text-[#b4b4c9]">${openiss.description}
                        </p>
                        <div class="card-actions justify-left">
                            <div class="badge badge-outline bg-[#FEECEC] text-[#EF4444]">${openiss.labels[0]}</div>
                            <div class="">${openiss.labels[1] ? `<div class="badge badge-outline text-[#D97706] bg-[#FFF8DB]">${openiss.labels[1]}</div>` : ""}</div>
                        </div>
                    </div>
                    <hr class="w-full  border-[#E4E4E7]">
                     <div class="m-4 space-y-2">
                        <p class="text-[#b4b4c9]">#by ${openiss.author}</p>
                        <p class="text-[#b4b4c9]">${openiss.createdAt}</p>
                    </div>
                </div>
        `
        containerOpen.appendChild(opens)
    })
    // console.log(opens);
};

// closed container 

const containerClosed = document.getElementById('containerClosed')
function filterClosedIssues(closedIss) {
    containerClosed.innerHTML = '';
    const closedIsses = closedIss.filter(close => close.status.toLowerCase() === "closed")
    // console.log(closedIsses);
    closedIsses.forEach(closeissues => {
        const closed = document.createElement('div')
        closed.className = "card bg-base-100 shadow-sm border-t-4 border-[#A855F7]"
        closed.innerHTML = `
       <div class="">
                    <div class="card-body space-y-2">
                        <div class="flex  justify-between ">
                        <img src="assets/Closed- Status .png" alt="">
                            <div><p
                                class=" font-medium text-xl bg-[#FEECEC] inline-block px-2 py-1 text-[#EF4444] rounded-sm">
                                ${closeissues.priority}</p></div>
                        </div>
                        <h2 class="card-title">
                            ${closeissues.title}
                        </h2>
                        <p class="text-[#b4b4c9]">${closeissues.description}
                        </p>
                        <div class="card-actions justify-left">
                            <div class="badge badge-outline bg-[#FEECEC] text-[#EF4444]">${closeissues.labels[0]}</div>
                            <div class="">${closeissues.labels[1] ? `<div class="badge badge-outline text-[#D97706] bg-[#FFF8DB]">${closeissues.labels[1]}</div>` : ""}</div>
                        </div>
                    </div>
                    <hr class="w-full  border-[#E4E4E7]">
                     <div class="m-4 space-y-2">
                        <p class="text-[#b4b4c9]">#by ${closeissues.author}</p>
                        <p class="text-[#b4b4c9]">${closeissues.createdAt}</p>
                    </div>
                </div>
    `
        containerClosed.appendChild(closed)
    })

}

// input for search 
const inputSearch = document.getElementById('issuesInput')

inputSearch.addEventListener('input', () => {
    const value = inputSearch.value.trim().toLowerCase()
    // console.log(value);
    if( value.length > 0){
    async function search() {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`)
        const data = await res.json()
        const datas = data.data;
        // console.log(data);
        const filtered = datas.filter(searchvalue => 
            searchvalue.title.toLowerCase().includes(value)
        );
            displayAllIssues(filtered)
            filterClosedIssues(filtered)
            filterOpenIssues(filtered)

    };
    search()
    }
    else{issues()}
})

