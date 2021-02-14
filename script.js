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

// var header_height = $('#header').height();
// document.querySelector('.banner').style.height = ($(window).height() -header_height).toString() + "px";
// console.log($(window).height());
// console.log(document.querySelector('.banner').style.height);

function makeSearchStringCorrectForm(searchText){
    searchText = searchText.split(" ");
    var result = "";
    for (i in searchText){
        result = result + searchText[i] + "%20";
    }
    result = result.substr(0, result.length-3);

    return result;
}

function getNews(searchText){

    searchText = makeSearchStringCorrectForm(searchText);

    var banner_sub = document.querySelector(".banner_sub_content");
    banner_sub.innerHTML = "";

    console.log(searchText);

    var url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q="
    url = url + searchText;
    url = url + "&pageNumber=1&pageSize=24&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null";
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "eedc981b57msh96e2bb005cd2468p1bfa18jsnaf705a644510",
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
        }
    };

    console.log(url);

    var maxLenForHeading = 60;
    var maxLenForAbout = 450;

    document.querySelector(".banner_sub_content").style.display="none";
    document.querySelector(".banner").style.background = "rgb(255, 255, 255)";
    document.querySelector(".loader_container").style.display="block";

    $.ajax(settings).done(function (response) {
        var value = response.value;

        console.log(response)

        console.log($(window).width())

        if($(window).width() > 700){
            document.querySelector(".banner_sub_content").style.display="grid";
        }else{
            document.querySelector(".banner_sub_content").style.display="block";
        }

        document.querySelector(".banner").style.background = "rgba(226, 226, 226, 0.2)";
        document.querySelector(".loader_container").style.display="none";

        value.forEach(function (elem){

            var title = elem.title
            var description = elem.description;
            var datePublished = elem.datePublished;
            var imgUrl = elem.image.url;
            var url = elem.url;

            var banner_sub = document.querySelector(".banner_sub_content");
        
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
                title_splited = title.split(" ");
                title = "";
                for(i in title_splited){
                    var new_str = title_splited[i];
                    if (title.length + new_str.length < maxLenForHeading){
                        title = title + " " + new_str;
                    }else{
                        break;
                    }
                }
                title = title + " ..."
            }

            if(description.length > maxLenForAbout){
                description_splited = description.split(" ");
                description = "";
                for(i in description_splited){
                    var new_str = description_splited[i];
                    if (description.length + new_str.length < maxLenForAbout){
                        description = description + " " +new_str;
                    }else{
                        break;
                    }
                }
                description = description + " ..."
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
}

var categoryButtons = document.querySelectorAll('.news_topic_container h3');

categoryButtons.forEach(function (item) {
    console.log(item);
    item.addEventListener('click', function (){
        getNews(item.innerHTML);
    })
})



function checkOffset() {
    if($('.current_news_head_container').offset().top
        + $('.current_news_head_container').height() 
        >= $('#footer').offset().top - 10){

        $('.banner_main_content').css({
            'position': 'relative'
        });

        $('.current_news_head_container').css({
            'position': 'absolute',
            'bottom': 0,
            'top': 'auto'
        });
    }
    if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top){
        $('.banner_main_content').css({
            'position': 'initial'
        });
        $('.current_news_head_container').css({
            'position': 'fixed',
            'bottom': 'auto',
            'top': 100
        });
    }
}


$(document).scroll(function() {
    if($(document).width() > 1100){
        checkOffset();
    }
});

