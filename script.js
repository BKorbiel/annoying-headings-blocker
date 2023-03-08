var KEY_WORDS = ["Morawiecki", "Andrzej Duda", "PIS", "KO", "koalicja", "lewica", "prawica"];

function getHeadings (element) {
    
    if (element instanceof Element || element instanceof HTMLDocument) {
        var headings = element.querySelectorAll('h1, h2, h3, h4, h5, a');
        for (var j = 0; j < headings.length; j++) {
            if (headings[j].hasChildNodes()) {
                headings[j].childNodes.forEach(heading => blockHeading(heading));
            }
        }
    }
}

function blockHeading (element) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(child => blockHeading(child));
    } else if (element.nodeType === Text.TEXT_NODE) {
        for (var i = 0; i < KEY_WORDS.length; i++) {
            if (element.wholeText.toLowerCase().includes(KEY_WORDS[i].toLowerCase())) {
                element.parentElement.style.backgroundColor = "black";
                element.parentElement.style.color = "black";
            }
        }
    }
}

getHeadings(document);

document.addEventListener("DOMNodeInserted", function(e) {
    getHeadings(e.target);
}, false);