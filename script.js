


const ham_button = document.querySelector('.ham_button');
const times_button = document.querySelector('.times_button');

const navigation_bar = document.getElementById('navigation_bar');

ham_button.addEventListener('click', function (){
    if(ham_button.className !== ""){
        ham_button.style.display = "none";
        times_button.style.display = "block";
        navigation_bar.classList.add("show_navigation");
    }
})

times_button.addEventListener('click', function (){
    if(ham_button.className !== ""){
        times_button.style.display = "none";
        ham_button.style.display = "block";
        navigation_bar.classList.remove("show_navigation");
    }
})