


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

/*
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=taylor%20swift&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "eedc981b57msh96e2bb005cd2468p1bfa18jsnaf705a644510",
		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

*/