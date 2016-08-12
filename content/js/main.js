var myXml = 'content/xml/biptv.xml';

var dataXml = {
    xml: '',
    totalItens: 0
}

var page = {
    url: '',
    pagetype: 1,
    time: 0,
    video: '',
    img: '',
    param: ''
}

var itens = {
    playlist: [],
    currentPage: 0
}
    
function loadAllPlaylist() {
    itens.playlist = dataXml.xml.getElementsByTagName('Attributes');    
    nextPage();
}

function loadPage()
{
    console.trace('CurrentPage: ' + itens.currentPage);

    page = {};
    var totalAtr = itens.playlist[itens.currentPage].getElementsByTagName('ProductAttribute').length;
    var pages = itens.playlist[itens.currentPage].getElementsByTagName('ProductAttribute');
    page.param = '';
    for (var i = 0; i < totalAtr; i++)
    {
        switch (pages[i].getAttribute('Name'))
        {            
            case 'url':
                page.url = pages[i].innerHTML;
                break;
            case 'pagetype':
                page.pagetype = pages[i].innerHTML;
                break;
            case 'time':
                page.time = pages[i].innerHTML;
                break;
            case 'img':
                page.img = pages[i].innerHTML;
                break;
            default:
                page.param += '&' + pages[i].getAttribute('Name') + '=' + pages[i].innerHTML;
                break;
        }
    }

    page.param += '&img=' + page.img;
}

function nextPage() {

    console.clear();
    console.trace('CurrentPage = ' + itens.currentPage);
    if (itens.currentPage == dataXml.totalItens) {        
        itens.currentPage = 0;        
    }
    
    loadPage();

    if (page.pagetype != 1) {
        document.getElementById("objVideo").style.visibility = "hidden";
        document.getElementById("mp4").src = '';
        document.getElementById("objVideo").load();
    }

    //clean all img elements
    var myNode = document.getElementById("pageImg");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    //IMAGE
    if (page.pagetype != 3) {

        var images = page.img.split(',');
        for (i = 0; i < images.length; i++) {
            //create a element image for cache
            var element = document.createElement("img");
            element.src = images[i];
            document.getElementById('pageImg').appendChild(element);
            console.trace('img add');
        }
    }
    if (page.pagetype != 1) {
        document.getElementById("mp4").src = page.video;
        document.getElementById("objVideo").load();
    }

    page.url += '?time=' + page.time + page.param;

    console.trace('Page: ' + page.url);
    console.trace('Time: ' + page.time);

    isCached();    
}

function isCached() {
    if (page.pagetype != 3) {
        var objs = document.getElementsByTagName("img");
        for (i = 0; i < objs.length; i++) {
            console.trace('cache img');
            if (!objs[i].complete) {
                waitCaching(500);
                return;
            }
        }
    }
    if (page.pagetype != 1) {
        var objs = document.getElementById("objVideo");               

        if (objs.buffered.length == 0) {
            console.trace('cache video');
            waitCaching(500);
            return;
        }
        else if (objs.buffered.end(0) < 5) {
            console.trace(objs.buffered.start(0));
            console.trace(objs.buffered.end(0));
            console.trace(objs.buffered.length);
            console.trace(objs.duration);

            console.trace('loading');
            waitCaching(2000);
            return;
        }
    }

    finishPage();
}

function waitCaching(_time) {
    console.trace('***************************************');
    console.trace('Caching');
    var z = setTimeout(function () { isCached() }, _time);
}

function finishPage() {

    //Alternativa para retornar o estado inicial do Load
    var elm = document.getElementById("loading");
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);

    //Alternativa para retornar o estado inicial da Barra de Progresso
    var elm = document.getElementById("expand");
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
        
    if (page.pagetype == 3) {
        document.getElementById("objVideo").play();        
        showIframe();
    }
    
    if (page.pagetype != 3)
    {
        document.getElementById("pageStatic").src = page.url;
        document.getElementById('pageStatic').onload = function () {
            showIframe();
        }
    }
}

function showIframe() {

    if (page.pagetype == 3)
        document.getElementById("pageStatic").style.visibility = 'hidden';
    else
        document.getElementById("pageStatic").style.visibility = 'visible';

    if (page.pagetype != 1) {
        document.getElementById("objVideo").style.visibility = 'visible';
        document.getElementById("objVideo").play();
    }

    document.getElementById("loading").style.animationPlayState = 'running';
    document.getElementById("expand").style.animationDuration = page.time + 's';
    document.getElementById("expand").style.animationPlayState = 'running';


    startTime(page.time * 1000);
}

function startTime(_time) {
    var z = setTimeout(function () { itens.currentPage++; nextPage() }, _time);
}

$(document).ready(function () {
    dataXml.xml = loadXMLDoc(myXml);
    dataXml.totalItens = dataXml.xml.getElementsByTagName('Attributes').length;

    console.trace('Total de Itens: ' + dataXml.totalItens);
    loadAllPlaylist();
});