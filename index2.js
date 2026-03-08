const allbtn = ["all", "open", "closed"];
let currentTab = "all"
const allContainer = ["containerAll", "containerOpen", "containerClosed"];
const spinner = document.getElementById('spinner')
// Click items 
allbtn.forEach((clickBtn, index) => {
    document.getElementById(clickBtn).onclick = () => {
        showSpinner()
        setTimeout(() => {
            currentTab = clickBtn
            upDatecount(currentTab)
            allbtn.forEach(btnRemove =>
                document.getElementById(btnRemove).classList.remove('btn-primary')
            );
            document.getElementById(clickBtn).classList.add('btn-primary');
            allContainer.forEach(show =>
                document.getElementById(show).classList.add("hidden")
            );
            document.getElementById(allContainer[index]).classList.remove("hidden");
            hideSpinner()
        }, 200);
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
    upDatecount(currentTab)
    // console.log(data.data.id);
}
issues()



// allContainer 
function displayAllIssues(issues) {
    containerAll.innerHTML = '';
    showSpinner()
    issues.forEach(issuescard => {
        let bordercolor = ""
        let img = '';
        let textColor = ''
        if (issuescard.status.toLowerCase() === "open") {
            bordercolor = "border-t-4 border-[#00A96E]"
            img = "assets/Open-Status.png"
        }
        else if (issuescard.status.toLowerCase() === "closed") {
            bordercolor = "border-t-4 border-[#A855F7]"
            img = "assets/Closed- Status .png"
        }
        if(issuescard.priority.toLowerCase()=== 'high'){
            textColor = ('bg-[#FEECEC] text-[#EF4444]')
        }
        else if(issuescard.priority.toLowerCase()=== 'medium'){
            textColor = ('bg-[#FFF6D1] text-[#F59E0B]')
        }
        else if(issuescard.priority.toLowerCase()=== 'low'){
            textColor = ('bg-[#EEEFF2] text-[#9CA3AF]')
        }
        const card = document.createElement('div')
        card.classList = `card bg-base-100 shadow-sm ${bordercolor}`
        card.innerHTML = `
                <div class="" onclick="OpenDetails(${issuescard.id})">
                    <div class="card-body space-y-2">
                        <div class="flex justify-between ">
                        <img src="${img}" alt="">
                            <div><p
                                class=" font-medium text-xl  inline-block px-2 py-1 ${textColor} rounded-sm">
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
        hideSpinner()
    })
}

// open container 
const containerOpen = document.getElementById('containerOpen')
function filterOpenIssues(open) {
    containerOpen.innerHTML = '';
    // showSpinner()
    const openIssues = open.filter(issue =>
        issue.status.toLowerCase() === "open"
    );
    openIssues.forEach(openiss => {
        let textColor = ''
         if(openiss.priority.toLowerCase()=== 'high'){
            textColor = ('bg-[#FEECEC] text-[#EF4444]')
        }
        else if(openiss.priority.toLowerCase()=== 'medium'){
            textColor = ('bg-[#FFF6D1] text-[#F59E0B]')
        }
        else if(openiss.priority.toLowerCase()=== 'low'){
            textColor = ('bg-[#EEEFF2] text-[#9CA3AF]')
        }
        const opens = document.createElement('div');
        opens.className = "card bg-base-100 shadow-sm border-t-4 border-[#00A96E]";
        opens.innerHTML = `
                <div class="" onclick="OpenDetails(${openiss.id})">
                    <div class="card-body space-y-2">
                        <div class="flex justify-between ">
                        <img src="assets/Open-Status.png" alt="">
                           <div> <p
                                class=" font-medium text-xl inline-block  px-2 py-1 ${textColor} rounded-sm ">
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
        // hideSpinner()
    })
    // console.log(opens);
};

// closed container 

const containerClosed = document.getElementById('containerClosed')
function filterClosedIssues(closedIss) {
    containerClosed.innerHTML = '';
    // showSpinner()
    const closedIsses = closedIss.filter(close => close.status.toLowerCase() === "closed")
    // console.log(closedIsses);
    closedIsses.forEach(closeissues => {
        let textColor = ''
         if(closeissues.priority.toLowerCase()=== 'high'){
            textColor = ('bg-[#FEECEC] text-[#EF4444]')
        }
        else if(closeissues.priority.toLowerCase()=== 'medium'){
            textColor = ('bg-[#FFF6D1] text-[#F59E0B]')
        }
        else if(closeissues.priority.toLowerCase()=== 'low'){
            textColor = ('bg-[#EEEFF2] text-[#9CA3AF]')
        }
        const closed = document.createElement('div')
        closed.className = "card bg-base-100 shadow-sm border-t-4 border-[#A855F7]"
        closed.innerHTML = `
       <div class="" onclick="OpenDetails(${closeissues.id})">
                    <div class="card-body space-y-2">
                        <div class="flex  justify-between ">
                        <img src="assets/Closed- Status .png" alt="">
                            <div><p
                                class=" font-medium text-xl inline-block px-2 py-1 rounded-sm ${textColor}">
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
        // hideSpinner()
    })
    // console.log(containerClosed.children.length);

}

// input for search 
const inputSearch = document.getElementById('issuesInput')

inputSearch.addEventListener('input', () => {
    const value = inputSearch.value.trim().toLowerCase()
    // console.log(value);
    if (value.length > 0) {
        showSpinner()
        async function search() {
            const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`)
            const data = await res.json()
            const datas = data.data;
            // console.log(data);
            const filtered = datas.filter(searchvalue =>
                searchvalue.title.toLowerCase().includes(value)
            );
            displayAllIssues(filtered)
            // upDatecount("all")
            filterClosedIssues(filtered)
            filterOpenIssues(filtered)
            upDatecount(currentTab)
            hideSpinner()
        };
        search()
    }
    else { issues() }
})

// count() .............
const countAll = document.getElementById('count-issues')

function upDatecount(type) {
    if (type === "all") {
        countAll.innerText = containerAll.children.length
    }
    else if (type === "open") {
        countAll.innerText = containerOpen.children.length
    }
    else if (type === "closed") {
        countAll.innerText = containerClosed.children.length
    }
}


// spinner ...............

function showSpinner() {
    spinner.classList.remove('hidden')
    containerAll.classList.add('hidden')
    containerOpen.classList.add('hidden')
    containerClosed.classList.add('hidden')
}

function hideSpinner() {
    spinner.classList.add('hidden')

    if (currentTab === "all") {
        containerAll.classList.remove('hidden')
    }
    else if (currentTab === "open") {
        containerOpen.classList.remove('hidden')
    }
    else if (currentTab === "closed") {
        containerClosed.classList.remove('hidden')
    }
}

// Model details ......................................
const issueModel = document.getElementById('issues-details-modal')
const modeltitle = document.getElementById('modeltitle')
const modelStatus = document.getElementById('modelStatus')
const modelName = document.getElementById('modelName')
const modelDate = document.getElementById('modelDate')
const modelLabels1 = document.getElementById('modelLabels1')
const modelLabels2 = document.getElementById('modelLabels2')
const modelDes = document.getElementById('modelDes')
const modelAss = document.getElementById('modelAss')
const modelprio = document.getElementById('modelprio')



async function OpenDetails(issueId) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data = await res.json()
    // console.log(data.data);
    const Modeldetail = data.data;
    modeltitle.textContent = Modeldetail.title
    modelStatus.textContent = Modeldetail.status
    modelName.textContent = Modeldetail.author
    modelDate.textContent = Modeldetail.createdAt
    modelLabels1.textContent = Modeldetail.labels[0]
    modelLabels2.innerHTML = Modeldetail.labels[1] ? `<p class="badge badge-outline text-[#D97706] bg-[#FFF8DB]">${Modeldetail.labels[1]}</p>` : ''
    modelDes.textContent = Modeldetail.description
    modelAss.textContent = Modeldetail.assignee
    modelprio.textContent = Modeldetail.priority
    issueModel.showModal()

}

