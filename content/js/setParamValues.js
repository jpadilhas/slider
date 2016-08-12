var time = 10000;

function startValues() {
    var h = {};
    if (window.location.search == undefined || window.location.search.length < 1) { return h; }
    q = window.location.search.slice(1).split('&');
    for (var i = 0; i < q.length; i++) {
        key_val = q[i].split('=');
        // replace '+' (alt space) char explicitly since decode does not
        hkey = decodeURIComponent(key_val[0]).replace(/\+/g, ' ');
        hval = decodeURIComponent(key_val[1]).replace(/\+/g, ' ');;

        switch (hkey) {            
            case 'show':
                document.getElementById(hval).style.display = "inline-block";
                break;
            case 'hide':
                document.getElementById(hval).style.display = "none";
                break;
            case 'text-align':
                document.body.style.textAlign = hval;
                break;
            case 'img':           
                backgroundImage(hval);
                break;
            case 'time':
                time = hval;
                break;
            case 'color':
                document.getElementById("color").style.backgroundColor = '#' + hval.replace('#','');
                break;
            case 'color2':
                document.getElementById("color").style.backgroundColor = convertHex(hval.replace('#', ''), 80);
                break;
            case 'top':
                document.getElementById("boxmain").style.marginTop = hval + 'vw';
                break;
            case 'right':
                document.getElementById("boxmain").style.right = hval;
                break;
            case 'flip':
                document.getElementById("img").style.transform = hval;
                break;
            default:
                if (document.getElementById(hkey) != null)
                    document.getElementById(hkey).innerText = hval;
                break;
        }
    }    
}

function backgroundImage(hval) {
    var qtde = hval.split(',');
    setBackground(qtde[0]);

    if(qtde.length > 1) {
        for (i = 0; i < qtde.length; i++) {
            startTime(qtde[i], (time * 1000) / qtde.length);
        }
    }
}

function setBackground(val) {
    document.getElementById('img').style.backgroundImage = "url('" + val + "')";

    var elm = document.getElementById("img");
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
}

function startTime(val, timeBg) {
    setTimeout(function () { setBackground(val) }, timeBg);
}

function convertHex(hex, opacity) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
}