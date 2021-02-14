var ham_button = document.querySelector('.ham_button');
var times_button = document.querySelector('.times_button');

var navigation_bar = document.getElementById('navigation_bar');
var navigationExpanded = false;

ham_button.addEventListener('click', function (){
    if(ham_button.className !== ""){
        ham_button.style.display = "none";
        times_button.style.display = "block";
        navigation_bar.classList.add("show_navigation");
        navigationExpanded = true;
    }
})

times_button.addEventListener('click', function (){
    if(ham_button.className !== ""){
        times_button.style.display = "none";
        ham_button.style.display = "block";
        navigation_bar.classList.remove("show_navigation");
        navigationExpanded = false;
    }
})

var moreAboutButton = document.getElementById('moreAboutButton');

moreAboutButton.addEventListener('click', function (){
    window.scrollTo(0, document.body.scrollHeight);
});


var categoriesExpandbutton = document.getElementById('categoriesExpandbutton');
var categoriesShrinkbutton = document.getElementById('categoriesShrinkbutton');
var categories = document.querySelector(".current_news_head");
var breakAfterCategory = document.getElementById('breakAfterCategory'); 


categoriesExpandbutton.addEventListener('click', function (){
    categoriesShrinkbutton.style.display = "block";
    categoriesExpandbutton.style.display = "none";
    categories.style.display = "block";
    breakAfterCategory.style.display = "block";
});

categoriesShrinkbutton.addEventListener('click', function (){
    categoriesExpandbutton.style.display = "block";
    categoriesShrinkbutton.style.display = "none";
    categories.style.display = "none";
    breakAfterCategory.style.display = "none";
});

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

var loaded = false;
var selectedCategory = null;

function getNews(searchText){

    loaded = false;

    if(navigationExpanded){
        navigation_bar.classList.remove("show_navigation");
        navigationExpanded = false;
        times_button.style.display = "none";
        ham_button.style.display = "block";
    }

    removeCircleOnCategory();

    makeBannerRightSize();
    window.scrollTo(document.body.scrollHeight, 0);


    searchText = makeSearchStringCorrectForm(searchText);

    var banner_sub = document.querySelector(".banner_sub_content");
    banner_sub.innerHTML = "";
    
    // console.log("1");

    // console.log(searchText);

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

    var maxLenForHeading = 60;
    var maxLenForAbout = 450;
    
    
    // console.log("2");
    document.querySelector(".banner_sub_content").style.display="none";
    document.querySelector(".banner").style.background = "rgb(255, 255, 255)";
    // console.log("3");

    document.querySelector(".loader_container").style.display="block";
    // console.log("4");

    $.ajax(settings).done(function (response) {
        
        window.scrollTo(document.body.scrollHeight, 0);
        // console.log("5");

        $('.banner_main_content').css({
            'position': 'initial'
        });
        $('.current_news_head_container').css({
            'position': 'fixed',
            'bottom': 'auto',
            'top': 100
        });

        var value = response.value;

        // console.log(response)

        // console.log($(window).width())

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
            img.setAttribute("onerror", "this.onerror=null; this.src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6d6e8c81320215.5cfc0173c7a87.jpg'");
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

        // console.log("7");
        loaded = true;
        makeBannerRightSize();
        // console.log("8");

    });
}


function removeCircleOnCategory(){
    if(selectedCategory != null){
        selectedCategory.style.background = "inherit";
        selectedCategory = null;
    }
}

var categoryButtons = document.querySelectorAll('.news_topic_container');

categoryButtons.forEach(function (item) {
    var children = item.children;
    var textChild = children[1];
    var circleChild = children[2];
    textChild.addEventListener('click', function (){
        getNews(textChild.innerHTML);
        selectedCategory = circleChild;
        selectedCategory.style.background = "rgb(219, 255, 166)";
    })
})

document.getElementById("homeText").addEventListener('click', function (){
    getNews("World");
})

document.getElementById("georgiaText").addEventListener('click', function (){
    getNews("Tbilisi");
})

document.getElementById("usaText").addEventListener('click', function (){
    getNews("USA");
})

document.getElementById("searchText").addEventListener('click', function (){
    document.getElementById("searchTextContainer").style.display = "none";
    document.getElementById("searchFieldContainer").style.display = "block";
})



var searchField = document.getElementById("searchField");

function getInputAndSearch(){
    searchText = searchField.value;
    searchField.value = "";
    getNews(searchText);
}


$("#searchField").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        getInputAndSearch();
    }
});

document.getElementById("searchIcon").addEventListener('click', getInputAndSearch)

document.getElementById("clearIcon").addEventListener('click', function (){
    searchField.value = "";
    document.getElementById("searchTextContainer").style.display = "block";
    document.getElementById("searchFieldContainer").style.display = "none";
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
    if($(document).scrollTop() + window.innerHeight <= $('#footer').offset().top){
        $('.banner_main_content').css({
            'position': 'initial'
        });
        $('.current_news_head_container').css({
            'position': 'fixed',
            'bottom': 'auto',
            'top': 100
        });
    }

    $('.current_news_head_container').css({
        'height' : $(window).height
    });
}


$(document).scroll(function() {
    if($(document).width() > 1100){
        checkOffset();
    }
});


var loader_container = document.querySelector('.loader_container');
function makeBannerRightSize(){
    // console.log("I am here1");
    var header_height = $('#header').height();
    if(!loaded){
        // console.log("I am here2");
        if($(window).width() > 1100){
            // console.log("I am here3");
            // console.log(document.querySelector('.banner').style.height);
            document.querySelector('.banner').style.height = ($(window).height() -header_height).toString() + "px";
            // console.log(document.querySelector('.banner').style.height);
        }else{
            // console.log("I am here");
            document.querySelector('.banner').style.height = "auto";
        }
    }else{
        document.querySelector('.banner').style.height = "auto";
    }
    document.querySelector('.banner').style.minHeight = ($(window).height() -header_height).toString() + "px";
}

function makeCategoriesRightSize(){
    if($(window).width() > 1100){
        var header_height = $('#header').height();
        // console.log("i am here 1");
        document.querySelector('.current_news_head').style.height = ($(window).height() - header_height).toString() + "px";
    }else{
        // console.log("i am here 2");
        document.querySelector('.current_news_head').style.height = "auto";
    }
}

$(window).resize(function() {
    makeBannerRightSize();
    makeCategoriesRightSize();
})

makeBannerRightSize();
makeCategoriesRightSize();


getNews("News");
