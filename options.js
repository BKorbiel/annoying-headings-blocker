function save() {
    var keywords=[];
    var elements = document.querySelectorAll('.keyword');
    elements.forEach(element => {
        keywords.push(element.innerHTML);
    });
    chrome.storage.sync.set({
        keywords: keywords
    });
}

function createKeywordRow(keyword) {
    var newRow = document.createElement('div');
    newRow.className = "keyword-row";

    var newKeyword = document.createElement('div');
    newKeyword.className = "keyword";
    newKeyword.innerHTML = keyword;

    newRow.appendChild(newKeyword);

    document.querySelector('.keywords-holder').appendChild(newRow);
}

//adding new keyword
document.querySelector('.add-keyword').addEventListener('click', function(){
    var keyword = document.getElementById('new-keyword').value;

    createKeywordRow(keyword);

    save();

    document.getElementById('new-keyword').value="";

});

//loading keywords from storage & displaying them
document.addEventListener('DOMContentLoaded', function(){
    chrome.storage.sync.get({
        keywords: []
    }, function(storage) {
        console.log(storage);
        storage.keywords.forEach(keyword => {
            createKeywordRow(keyword);
        });
    });
});