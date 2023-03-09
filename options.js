function save() { //saving keywords to chrome storage
    var keywords=[];
    var elements = document.querySelectorAll('.keyword-row');
    elements.forEach(element => {
        var keyword = element.querySelector('.keyword').innerHTML;
        var caseSensitive = element.querySelector('input').checked;
        keywords.push({keyword: keyword, caseSensitive: caseSensitive});
    });
    chrome.storage.sync.set({
        keywords: keywords
    });
}

function createKeywordRow(keyword) { //this func creates new row for keyword in options page
    var newRow = document.createElement('div');
    newRow.className = "keyword-row";

    var newKeyword = document.createElement('div');
    newKeyword.className = "keyword";
    newKeyword.innerHTML = keyword.keyword; //keyword

    var removeButton = document.createElement('button'); //remove button
    removeButton.className = "remove";
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener('click', function(e){
        newRow.remove();
        save();
    });

    var checkBox = document.createElement('input'); //checkbox for "case sensitive"
    checkBox.type = "checkbox";
    checkBox.checked = keyword.caseSensitive;
    checkBox.addEventListener('change', function(e){
        save();
    });
    var label = document.createElement('label');
    label.innerHTML = "Case sensitive";
    var caseSensitive = document.createElement('div');
    caseSensitive.className = "case-sensitive";
    caseSensitive.appendChild(checkBox);
    caseSensitive.appendChild(label);

    newRow.appendChild(newKeyword);
    newRow.appendChild(removeButton);
    newRow.appendChild(caseSensitive);

    document.querySelector('.keywords-holder').appendChild(newRow); //append new row

}

//adding new keyword
document.querySelector('.add-keyword').addEventListener('click', function(){
    var keyword = document.getElementById('new-keyword').value;

    createKeywordRow({keyword: keyword, caseSensitive: false});

    save();

    document.getElementById('new-keyword').value="";

});

//loading keywords from storage & displaying them
document.addEventListener('DOMContentLoaded', function(){
    chrome.storage.sync.get({
        keywords: []
    }, function(storage) {
        storage.keywords.forEach(keyword => {
            createKeywordRow(keyword);
        });
    });
});