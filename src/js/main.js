window.addEventListener("load", () => {
    let $abbrevBookContent = document.getElementById("abbrevBookContent");
    let $verseContent = document.getElementById("verseContent");
    let $bookContent = document.getElementById("bookContent");
    let $capVerContent = document.getElementById("capVerContent");

    let $fieldShare = document.getElementById("share");

    function generateRandomVerses(lastBook) {
        return Math.floor(Math.random() * (lastBook - 0 + 1) - 0 );
    }

    function showFieldShare(interval){
        setInterval(() => {
            $fieldShare.classList.add("on");
        }, interval);
    }

    fetch("../assets/data/bible.json")
        .then((resp) => {
            return resp.json();
        })
        .then((bible) => {
            this.allBooks = (bible.length - 1);
            let getRandomBook = generateRandomVerses(allBooks);
            const allChapters = (bible[getRandomBook].chapters.length - 1);
            let getRandomChapter = generateRandomVerses(allChapters);
            const allVerses = (bible[getRandomBook].chapters[getRandomChapter].length - 1);
            let getRandomVerse = generateRandomVerses(allVerses);
            let abbrev = bible[getRandomBook].abbrev;
            let bookName = bible[getRandomBook].name;
            let chapter = getRandomChapter + 1;
            let verse = getRandomVerse + 1;
            let verseContent = bible[getRandomBook].chapters[getRandomChapter][getRandomVerse];

            $abbrevBookContent.innerText = abbrev;
            $bookContent.innerText = bookName;
            $verseContent.innerText = verseContent;
            $capVerContent.innerText = `${chapter}:${verse}`;
            
            showFieldShare(10000);
        })
        .catch((err) => {
            console.log(err);
        })
});