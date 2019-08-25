"use strict";

window.addEventListener("load", () => {
    let $abbrevBookContent = document.getElementById("abbrevBookContent");
    let $verseContent = document.getElementById("verseContent");
    let $bookContent = document.getElementById("bookContent");
    let $capVerContent = document.getElementById("capVerContent");

    let $fieldShare = document.getElementById("share"),
        $shareButton = document.querySelectorAll(".share-button"),
        $closeButton = document.getElementById("closeButton");

    const timeInMsToReadChar = 12;

    function generateRandomVerses(lastBook) {
        return Math.floor(Math.random() * (lastBook - 0 + 1) - 0 );
    }

    function setClassToElement(element, classElement){
        element.classList.add(classElement);
    }

    function removeClassFromElement(element, classElement){
        element.classList.remove(classElement);
    }

    function showFieldShare(interval){
        setTimeout(() => {
            setClassToElement($fieldShare, "on");
        }, interval);
    }

    fetch("../assets/data/bible.json")
        .then((resp) => {
            return resp.json();
        })
        .then((bible) => {
            let allBooks = (bible.length - 1);
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
            let setTimeNecessarilyToReadVerse = ((verseContent.length / timeInMsToReadChar) * 1500);

            $abbrevBookContent.innerText = abbrev;
            $bookContent.innerText = bookName;
            $verseContent.innerText = verseContent;
            $capVerContent.innerText = `${chapter}:${verse}`;
            
            showFieldShare(setTimeNecessarilyToReadVerse);
        })
        .catch((err) => {
            console.log(err);
        })

    $shareButton.forEach(element => {
        element.addEventListener("click", ()=>{
            setClassToElement(element, "on");
        });
    });

    $closeButton.addEventListener("click", ()=>{
        removeClassFromElement($fieldShare, "on");
    })
    
});