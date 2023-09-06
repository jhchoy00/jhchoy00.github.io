window.addEventListener('load', loadHtml);
window.addEventListener('scroll', showMenu);

function loadHtml() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function (el) {
        var includeHtml = el.dataset.includeHtml;
        if (includeHtml) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includeHtml, true);
            xhttp.send();
        }
    });
}

function loadMenu(obj) {
    var profile = document.querySelector('#profile');
    profile.dataset.includeHtml = '/profile.html';
    var sub = document.querySelector('#sub');
    sub.dataset.includeHtml = '/sub/' + String(obj.dataset.menu) + '.html';
    var study = document.querySelector('#study');
    deleteHtml(study);
    loadHtml();
    var active = document.querySelector('.nav-item .active');
    active.classList.remove('active');
    obj.classList.add('active');
}

function showMenu() {
    var nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    }
    else if (window.scrollY == 0) {
        nav.classList.remove('scrolled');
    }
}

function loadStudy(thread){
    var profile = document.querySelector('#profile');
    var sub = document.querySelector('#sub');
    deleteHtml(profile);
    deleteHtml(sub);
    var study = document.querySelector('#study');
    study.dataset.includeHtml = '/sub/study/' + String(thread) + '.html';
    loadHtml();
}

function deleteHtml(obj){
    obj.dataset.includeHtml = '';
    obj.innerHTML = '';
}