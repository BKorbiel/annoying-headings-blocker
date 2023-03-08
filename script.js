var KEY_WORDS = ["famemma", "fame mma", "high league", "highleague", "primemma", "prime mma", "freak fighty", "freak fight",
    "freak fighter", "freak fighterem", "friz", "friza", "frizowi", "wersow", "tromba", "mini majk", "minimajk", "minimajka",
    "mini majka", "chodakowska", "chodakowskiej", "kostera", "dąbrowski", "wieniawa", "lexy chaplin", "dubiel", "blonsky",
    "blowek", "rezi", "rezigiusz", "stuu", "wardęga", "isamu", "nitro", "karolek", "kruszwil", "izak", "rupiński", "łupicki"]

for (var i = 0; i < KEY_WORDS.length; i++) {
    var headings = document.querySelectorAll('h1, h2, h3, h4, h5, a, span');
    for (var j = 0; j < headings.length; j++) {
        if(headings[j].innerText.toLowerCase().includes(KEY_WORDS[i]?.toLowerCase())){
            headings[j].innerHTML='[ ANNOYING HEADING BLOCKED! ]';
            headings[j].style.color = "green";
        }
    }
}