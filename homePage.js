// Innitial array declartion
let openArr = [];
let closeArr = [];
let allArr = [];
// Heading counter id selector
const totalIssue = document.getElementById('totalIssue');
// Toggling section managing section
const tabSwitch = id => {
    const idName = document.getElementById(id);
    const All = document.getElementById('All');
    const Open = document.getElementById('Open');
    const Close = document.getElementById('Close');
    if (id == 'All') {
        All.classList.remove('btn-primary', 'btn-outline');
        Open.classList.remove('btn-primary', 'btn-outline');
        Close.classList.remove('btn-primary', 'btn-outline');
        idName.classList.add('btn-primary');
        renderData(allArr);

    } else if (id == 'Open') {

        All.classList.remove('btn-primary', 'btn-outline');
        Open.classList.remove('btn-primary', 'btn-outline');
        Close.classList.remove('btn-primary', 'btn-outline');
        idName.classList.add('btn-primary');
        renderData(openArr);
        totalIssue.innerText = openArr.length;
    } else if (id == 'Close') {

        All.classList.remove('btn-primary', 'btn-outline');
        Open.classList.remove('btn-primary', 'btn-outline');
        Close.classList.remove('btn-primary', 'btn-outline');
        idName.classList.add('btn-primary');
        renderData(closeArr);
        totalIssue.innertext = closeArr.length;
    }

}
// Data fetching from api
const getDataFormApi = () => {
    lodingContainer(false) 
    let link = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(link)
        .then(res => res.json())
        .then(data => {
            const allData = data.data;
            openArr = allData.filter(i => i.status === 'open')
            closeArr = allData.filter(i => i.status === 'closed');
            allArr = allData.filter(i => i.status === 'closed' || i.status === 'open');

            renderData(allData);
        });
}
// Data rendering function
const renderData = data => {
    let section = document.getElementById('randerSection');
    section.innerHTML = ' ';
    totalIssue.innerText = data.length;
    data.forEach(element => {
        const { id, title, description, status, labels, priority, author, assignee, createdAt, updatedAt } = element;

        let div = document.createElement('div');
        div.setAttribute('onclick', `modalShower(${id})`)
        div.className = `border-t-4  ${status === 'open' ? 'border-green-600' : status === 'closed' ? 'border-purple-500' : ''} rounded-lg p-4 shadow-md`;
        div.innerHTML = `
        <div class="flex justify-between items-center mb-3">
                    <img src="${status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                    <button class=" py-[2px] ${priority === 'high' ? ' bg-red-100 text-red-500' : priority === 'medium' ? ' bg-yellow-100 text-yellow-600' : priority === 'low' ? 'bg-gray-200' : ''} rounded-full w-[80px]">${priority.toUpperCase()}</button>
                </div>
                <h2 class="text-[14px] font-semibold text-black mb-2 line-clamp-1">${title}</h2>
                <p class="text-[12px] font-normal text-gray-400 mb-3 line-clamp-2">${description}</p>
                <div class="labelsClass pb-4 border-b-2 border-gray-200 flex items-center gap-1"> 
                    ${labelsPrinter(labels)} 
                </div> 
                <div class="p-4 ">  
                    <p class="text-[12px] text-gray-600"># ${id} by ${author}</p>
                    <p class="text-[12px] text-gray-600">${updatedAt}</p>
                </div>
        `
        section.append(div);
        lodingContainer(true);
    });

}
// Labels array printer for every single array value.
const labelsPrinter = data => {
    return data.map(i => `<span class="cursor-pointer font-bold p-[2px] rounded-full 
        ${i === 'bug' ? "text-red-400 bg-red-200 border-2 border-red-200" :
            i === "good first issue" ? "text-green-400 bg-green-200 border-2 border-green-200" :
                i === 'help wanted' ? 'text-yellow-500 bg-yellow-100 border-2 border-yellow-200' :
                    i === 'enhancement' ? 'text-pink-400 bg-pink-200 border-2 border-pink-200' :
                        i === 'documentation' ? 'text-blue-400 bg-blue-200 border-2 border-blue-200' : ''}
                  text-[10px] ">${i=== 'bug'? '<i class="cursor-pointer text-[10px] fa-solid fa-bug"></i>':
                     i=== 'good first issue'? '<i class="fa-solid fa-circle-exclamation cursor-pointer text-[10px]"></i>': 
                i === 'help wanted'? '<i class="fa-solid fa-life-ring cursor-pointer text-[10px]"></i>': 
            i === 'enhancement' ? '<i class="fa-solid fa-wand-sparkles cursor-pointer text-[10px]"></i>':
        i === 'documentation' ? '<i class="fa-solid fa-file-lines cursor-pointer text-[10px]"></i>': 
    " "}${" "}${i.toUpperCase()}</span>`).join(' ');

}
// Modal single data fetching function 
const modalShower = async ids => {
    const link = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${ids}`;
    const res = await fetch(link)
    const data = await res.json();
    modalDisplay(data.data)
}
// Modal data rendering function 
const modalDisplay = data => {
    let modalBox = document.getElementById('modalRanderSection');
    modalBox.innerHTML = ' ';
    const { id, title, description, status, labels, priority, author, assignee, createdAt, updatedAt } = data;
    modalBox.innerHTML = `
                        <div>
                            <h2 class="font-bold text-[24px] mb-2">${title}</h2>
                            <div class="flex items-center gap-2 mb-6">
                                <button
                                    class="${status === 'open' ? "bg-green-500" : "bg-purple-500"} text-white outline-none rounded-full py-2 px-3 text-[12px]">${status === 'open' ? 'Opened' : 'Closed'}</button>
                                <p><i class="fa-solid fa-circle text-[10px] text-gray-400"></i> Opened by Fahim
                                    Ahmed <i class="fa-solid fa-circle text-[10px] text-gray-400"></i> ${createdAt}
                                </p>
                            </div>
                        </div>
                        <div class="mb-4 flex gap-2">
                             ${labelsPrinter(labels)}
                        </div>
                        <p class="text-gray-500 text-[16px] mb-6">${description}</p>
                        <div class="p-4 grid grid-cols-2 ">
                            <div class="flex flex-col gap-3">
                                <p class="text-[16px]   text-gray-500">Assignee:</p>
                                <p class="text-[16px] font-bold  ">${assignee}</p>
                            </div>
                            <div class="space-y-2">
                                <p class="text-[16px] text-gray-500">priority</p>
                                <button class="btn ${priority === 'high' ? ' bg-red-200 text-red-500' : priority === 'medium' ? ' bg-yellow-50 text-yellow-400' : priority === 'low' ? 'btn bg-gray-200' : ''} rounded-full w-[80px]">${priority.toUpperCase()}</button>
                            </div>
                        </div>  
                        <div class="modal-action">
                        <form method="dialog"> 
                            <button class="btn btn-primary">Close</button>
                        </form>
                    </div>
    `
    my_modal_1.showModal()

}
// Search btn implementation area.
document.getElementById('searchBTN').addEventListener('click', () => {
    let searchvalue = document.getElementById('searchvalue').value;
    if (searchvalue === '') {
        renderData(allArr);
        return;
    }
    const searchData = async () => {
        const link = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchvalue}`
        const req = await fetch(link);
        const res = await req.json();
        renderData(res.data);
    }
    searchData();
})
// Loading spinner Block && hidden area.
const lodingContainer = value => {
    if (value == false) {
        document.getElementById('loaderContainer').classList.remove('hidden');
        document.getElementById('randerSection').classList.add('hidden');
    } else if( value == true){
        document.getElementById('loaderContainer').classList.add('hidden');
        document.getElementById('randerSection').classList.remove('hidden'); 
    }
}
// Initial called data to render to webpage.
getDataFormApi();


