$(() => {
    $("#nav").load("/sub/nav.html");
    $("#profile").load("/sub/profile.html");
    //$(obj).addClass('active');
    var path=$(location).attr('pathname')
    if(path=='/index.html'){
      
    }
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

function moveTo(page) {
    document.location.href = '/' + String(page) + '.html';
}

function navbarToggle() {
    var toggleLeft = document.querySelector(".toggle-left");
    toggleLeft.classList.toggle("toggled");
    var contents = document.querySelector("#contents");
    contents.classList.toggle("blur");
}