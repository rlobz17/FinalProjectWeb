


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


var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=taylor%20swift&pageNumber=1&pageSize=10&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "eedc981b57msh96e2bb005cd2468p1bfa18jsnaf705a644510",
		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
	}
};



var maxLenForHeading = 90;
var maxLenForAbout = 130;

$.ajax(settings).done(function (response) {
	var value = response.value;

    console.log(response)

    console.log($(window).width())

    if($(window).width() > 700){
        document.querySelector(".banner_sub_content").style.display="grid";
    }else{
        document.querySelector(".banner_sub_content").style.display="block";
    }
    document.querySelector(".loader_container").style.display="none";

    value.forEach(function (elem){

        var title = elem.title
        var description = elem.description;
        var datePublished = elem.datePublished;
        var imgUrl = elem.image.url;
        var url = elem.url;

        const banner_sub = document.querySelector(".banner_sub_content");
    
        var new_row = document.createElement('div');
        new_row.setAttribute("class", "hot_topic");
    
        var img = document.createElement('img');
        img.setAttribute("src", imgUrl);
        new_row.appendChild(img);
        
        var content_top = document.createElement('div');
        content_top.setAttribute('class', 'hot_topic_content_top');

        var content_bot = document.createElement('div');
        content_bot.setAttribute('class', 'hot_topic_content_bot');
    
        var h2 = document.createElement('h2');
        var h3 = document.createElement('h3');
        var p = document.createElement('p');

        var readMoreButton = document.createElement('a');
    
        readMoreButton.setAttribute('href', url);

        if(title.length > maxLenForHeading){
            title = title.substr(0, maxLenForHeading) + "..."
        }

        if(description.length > maxLenForAbout){
            description = description.substr(0, maxLenForAbout) + "..."
        }

        datePublished = datePublished.split("T");
        datePublishedTime = datePublished[1].split(":");
        datePublished = datePublished[0] + " " + datePublishedTime[0] + ":" + datePublishedTime[1];
        
        h2.innerHTML = title
        h3.innerHTML = datePublished
        p.innerHTML = description
        readMoreButton.innerHTML = "Read More";
    
        content_top.appendChild(h2);
        content_bot.appendChild(h3);
        content_bot.appendChild(p);
        
        new_row.appendChild(content_top);
        new_row.appendChild(content_bot);
        new_row.appendChild(readMoreButton);
        banner_sub.appendChild(new_row);
    })


});

