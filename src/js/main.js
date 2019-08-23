window.addEventListener("load", () => {
    let $abbrevBookContent = document.getElementById("abbrevBookContent");
    let $verseContent = document.getElementById("verseContent");
    let $bookContent = document.getElementById("bookContent");
    let $capVerContent = document.getElementById("capVerContent");

    function GenerateRandomVerses(lastBook) {
        return Math.floor(Math.random() * (lastBook - 0 + 1) - 0 );
    }

    fetch("../src/data/bible.json")
        .then((resp) => {
            return resp.json();
        })
        .then((bible) => {
            const allBooks = (bible.length - 1);
            let getRandomBook = GenerateRandomVerses(allBooks);
            const allChapters = (bible[getRandomBook].chapters.length - 1);
            let getRandomChapter = GenerateRandomVerses(allChapters);
            const allVerses = (bible[getRandomBook].chapters[getRandomChapter].length);
            let getRandomVerse = GenerateRandomVerses(allVerses);

            let abbrev = bible[getRandomBook].abbrev;
            let name = bible[getRandomBook].name;
            let chapter = getRandomChapter + 1;
            let verse = getRandomVerse + 1;
            let verseContent = bible[getRandomBook].chapters[getRandomChapter][getRandomVerse];

            console.log(name, chapter, verse, verseContent);
        })
        .catch((err) => {
            console.log(err);
        })
});