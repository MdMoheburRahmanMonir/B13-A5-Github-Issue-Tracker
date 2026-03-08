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