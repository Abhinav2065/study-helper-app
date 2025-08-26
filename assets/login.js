const password = 'password'

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('password-form');
    const passInput = document.getElementById('password');


    form.addEventListener('submit', function(event){
        event.preventDefault();

        const passwordInput = passInput.value;
        

        if (ValidatePassowrd(passwordInput)) {
            console.log("Correct Password!");
            window.location.href = "app.html";
            
        }
        else {
            console.log("Incorrect Password");
            console.log("Please Try Again!")
            alert("Wrong Password!")
        }
    });
    

    function ValidatePassowrd(pass) {
        if (pass === password) {
            return true;
        }
        else {
            return false;
        }
    }
});