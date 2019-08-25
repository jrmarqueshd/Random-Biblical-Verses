"use strict";

window.addEventListener("load", () => {
    let $abbrevBookContent = document.getElementById("abbrevBookContent");
    let $verseContent = document.getElementById("verseContent");
    let $bookContent = document.getElementById("bookContent");
    let $capVerContent = document.getElementById("capVerContent");

    let $articleCard = document.getElementById("articleCard"),
        $fieldShare = document.getElementById("share"),
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

    function generateUrlToTwitterShareButton(abbrev, content, verse, chapter){
        let text = `"${content}" - (${abbrev} ${verse}:${chapter})`;
        let twitterShareLink = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fversiculo.cf&hashtags=versiculododia%2Cbibliaacf%2CDeus&text=" + text;
        
        let $twitterButton = document.getElementById("twitterButton");
        $twitterButton.setAttribute("href", twitterShareLink);
    }

    function showFieldShare(interval){
        setTimeout(() => {
            setClassToElement($fieldShare, "on");
            setClassToElement($articleCard, "off");
        }, interval);
    }

    fetch("../assets/data/bible.json")
        .then((resp) => {
            if(resp.ok){
                return resp.json();
            }else{
                console.log("An error has occurred");
            }
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

            generateUrlToTwitterShareButton(abbrev, verseContent, chapter, verse);
        })
        .catch((err) => {
            alert(`Aconteceu um erro ${err}, tente novamente mais tarde.`);
        })

    $shareButton.forEach(element => {
        element.addEventListener("click", ()=>{
            setClassToElement(element, "on");
        });
    });

    $closeButton.addEventListener("click", ()=>{
        removeClassFromElement($fieldShare, "on");
        removeClassFromElement($articleCard, "off");
    });
});