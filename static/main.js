$(() => {
    $("#nav").load("/sub/nav.html",()=>{
        var path=$(location).attr('pathname')
        if(path=='/index.html' || path=='/'){
            $('nav a').eq(0).addClass('active');
        }
        if(path=='/projects.html'){
            $('nav a').eq(1).addClass('active');
        }
        if(path=='/publications.html'){
            $('nav a').eq(2).addClass('active');
        }
        if(path=='/study.html' || path.startsWith('/sub/study')){
            $('nav a').eq(3).addClass('active');
            if(path=='/study.html'){
                makeHashtagList();
            }
        }
    });
    $("#profile").load("/sub/profile.html");
})

$(window).scroll(() => {
    if (window.scrollY > 0) {
        $('nav').addClass('scrolled');
    }
    else if (window.scrollY == 0) {
        $('nav').removeClass('scrolled');
    }
});

function makeHashtagList(){
    var hashtag=[]
    $('.hashtag').each(function(index,item){
        hashtag=hashtag.concat($(item).text().split(', '))
    });
    
    hashtagList=$('#hashtagList')
    hashtag.forEach((ht)=>{
        $('<a href=#>'+ht+'</a>').appendTo(hashtagList)
    })

}