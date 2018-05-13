// run the login modal
function loginMod() {
    $('#myModal').modal('show');
    console.log('modal function ran');
}

function main() {
    // run login modal if directed to the login route
    if (window.location.href === 'https://groupstrengthsf.com:3000/login') {
        loginMod();
    } 
}

main();