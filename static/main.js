$(() => {
    $("#nav").load("/sub/nav.html",()=>{
        var path=$(location).attr('pathname')
        if(path=='/index.html'){
            $('nav a').eq(0).addClass('active');
        }
        if(path=='/projects.html'){
            $('nav a').eq(1).addClass('active');
        }
        if(path=='/publications.html'){
            $('nav a').eq(2).addClass('active');
        }
        if(path=='/study.html'){
            $('nav a').eq(3).addClass('active');
            hashtagClassify();
        }
    });
    $("#profile").load("/sub/profile.html");
})

$(window).scroll(() => {
    var toggleLeft = $(".toggle-left");
    if (window.scrollY > 0) {
        $('nav').addClass('scrolled');
        toggleLeft.classList.add('scrolled');
    }
    else if (window.scrollY == 0) {
        $('nav').removeClass('scrolled');
        toggleLeft.classList.remove('scrolled');
    }
});

function navbarToggle() {
    var toggleLeft = document.querySelector(".toggle-left");
    toggleLeft.classList.toggle("toggled");
    var contents = document.querySelector("#contents");
    contents.classList.toggle("blur");
}

function hashtagClassify(){
    var hashtag=[]
    $('.hashtag').each(function(index,item){
        hashtag=hashtag.concat($(item).text().split(', '))
        console.log(hashtag)
    });
}