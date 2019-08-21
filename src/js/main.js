window.addEventListener("load", () => {
    let div = document.getElementById("content");

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

            let randomVerse = bible[getRandomBook].chapters[getRandomChapter][getRandomVerse];
            // console.log(`Livro: ${bible[getRandomBook].name}
            // Capitulo: ${bible[getRandomBook].chapters[getRandomChapter]}
            // Versiculo: ${bible[getRandomBook].chapters[getRandomChapter][getRandomVerse]}`);
            // console.log(`Versiculo: ${bible[getRandomBook].chapters[getRandomChapter][getRandomVerse]}`);
            div.innerText = randomVerse;
        })
        .catch((err) => {
            console.log(err);
        })
});