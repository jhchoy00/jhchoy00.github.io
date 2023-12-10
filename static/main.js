$(() => {
    $("#nav").load("/sub/nav.html",()=>{
        var path=$(location).attr('pathname')
        if(path=='/index.html' || path=='/'){
            $('nav a').eq(0).addClass('active');
            makeCarouselColor();
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
    $(".carousel").on('slid.bs.carousel', makeCarouselColor);
})

$(window).scroll(() => {
    if (window.scrollY > 0) {
        $('nav').addClass('scrolled');
    }
    else if (window.scrollY == 0) {
        $('nav').removeClass('scrolled');
    }
});

function makeCarouselColor(){
    imgEl = $(".carousel-inner .active img")[0];
    rgb=getAverageRGB(imgEl);
    var color='',revColor='';
    for(var c in rgb){
        var revRgb=255-rgb[c];
        color+=rgb[c].toString(16).padStart(2,'0');
        revColor+=revRgb.toString(16).padStart(2,'0');
    }
    $(".carousel").css("background-color","#"+color);
    $(".carousel-caption").css("color","#"+revColor);
}

function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}

function makeHashtagList(){
    var hashtag=[]
    $('.hashtag').each(function(index,item){
        hashtag=hashtag.concat($(item).text().split(', '))
    });
    
    const ht = hashtag.reduce((accu,curr) => {
        accu.set(curr,(accu.get(curr)||0)+1) ;
        return accu;
    },new Map());
    
    const sort_ht=new Map([...ht].sort())

    hashtagList=$('#hashtagList')
    for (let [key, value] of sort_ht.entries()) {
        $('<a href=#>'+key+'('+value+')'+'</a>').appendTo(hashtagList)
    }
}