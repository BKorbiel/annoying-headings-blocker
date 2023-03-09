var KEY_WORDS = [];

function getHeadings (element) { //get elements that are possibly headings 
    if (element instanceof Element || element instanceof HTMLDocument) {
        var headings = element.querySelectorAll('h1, h2, h3, h4, h5, a');
        for (var j = 0; j < headings.length; j++) {
            if (headings[j].hasChildNodes()) {
                headings[j].childNodes.forEach(heading => blockHeading(heading)); //we need only elements without any child
            }
        }
    }
}

function blockHeading (element) {
    if (element.hasChildNodes()) { //we need only elements without any child (text nodes)
        element.childNodes.forEach(child => blockHeading(child));
    } else if (element.nodeType === Text.TEXT_NODE) {
        for (var i = 0; i < KEY_WORDS.length; i++) { //check if the text includes any keyword
            if (KEY_WORDS[i].caseSensitive===true) {
                if (element.wholeText.includes(KEY_WORDS[i].keyword)) {
                    element.parentElement.style.backgroundColor = "black";
                    element.parentElement.style.color = "black";
                }
            } else {
                if (element.wholeText.toLowerCase().includes(KEY_WORDS[i].keyword.toLowerCase())) {
                    element.parentElement.style.backgroundColor = "black";
                    element.parentElement.style.color = "black";
                }
            }
            break;
        }
    }
}

//get keywords from storage
chrome.storage.sync.get({
    keywords: []
    }, function(storage) {
    KEY_WORDS = storage.keywords;
    getHeadings(document);
});


//when new node appers we run the script again to block new headings
document.addEventListener("DOMNodeInserted", function(e) {
    getHeadings(e.target);
}, false);