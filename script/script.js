let logInBtn = document.getElementById('logInBtn');

logInBtn.addEventListener('click',()=>{
    let emailBox = document.getElementById('emailBox').value;
    let PassBox = document.getElementById('PassBox').value;
    console.log(emailBox, PassBox);
    if (emailBox === 'admin' && PassBox === 'admin123') {
        document.location.href = '../homePage.html';
    }else{
        alert('Please provide a valid Email & Pass');
    }
})
