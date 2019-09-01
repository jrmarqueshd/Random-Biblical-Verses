"use strict";

window.addEventListener("load", () => {
    if(window.location.href == "https://www.versiculo.cf/random-verse.html" || window.location.href == "http://127.0.0.1:5500/random-verse.html"){
        let $abbrevBookContent = document.getElementById("abbrevBookContent");
        let $verseContent = document.getElementById("verseContent");
        let $bookContent = document.getElementById("bookContent");
        let $capVerContent = document.getElementById("capVerContent");
        let $tagShare = document.getElementById("tagShare");
        let $ldsDualRing = document.getElementById("ldsDualRing");

        let $articleCard = document.getElementById("articleCard"),
            $fieldShare = document.getElementById("share"),
            $shareButton = document.querySelectorAll(".share-button"),
            $closeButton = document.getElementById("closeButton"),
            $shareImgButton = document.getElementById("shareImgButton");

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

        function generateUrlsToShareButton(abbrev, content, verse, chapter){
            let text = `"${content}" - (${abbrev} ${verse}:${chapter})`;
            let whatsappShareLink = `https://api.whatsapp.com/send?text=*Versiculo do dia:* ${text} https://versiculo.cf/`;
            let twitterShareLink = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fversiculo.cf&hashtags=versiculododia%2Cbibliaacf%2CDeus&text=" + text;
            
            let $twitterButton = document.getElementById("twitterButton"),
                $whatsappButton = document.getElementById("whatsappButton"),
                $facebookButton = document.getElementById("facebookButton"),
                $contentShareFacebook = document.getElementById("contentShareFacebook");

            $twitterButton.setAttribute("href", twitterShareLink);
            $whatsappButton.setAttribute("href", whatsappShareLink);
        }

        function showFieldShare(interval){
            setTimeout(() => {
                removeClassFromElement($tagShare, "off");
            }, interval);
        }

        fetch("../src/data/bible.json")
            .then((resp) => {
                while(!resp.ok){
                    removeClassFromElement($ldsDualRing, "off");                    
                }
                setClassToElement($ldsDualRing, "off");
                return resp.json();
            })
            .then((bible) => {
                $bookContent.innerHTML = '<div id="ldsDualRing" class="lds-dual-ring"></div>';
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
                let setTimeNecessarilyToReadVerse = ((verseContent.length / timeInMsToReadChar) * 1000);
                
                $abbrevBookContent.innerText = abbrev;
                $bookContent.innerText = bookName;
                $verseContent.innerText = verseContent;
                $capVerContent.innerText = `${chapter}:${verse}`;
                
                showFieldShare(setTimeNecessarilyToReadVerse);
                generateUrlsToShareButton(abbrev, verseContent, chapter, verse);
            })
            .catch((err) => {
                alert(`Aconteceu um erro ${err}, tente novamente mais tarde.`);
            })

        $shareButton.forEach(element => {
            element.addEventListener("click", ()=>{
                setClassToElement(element, "on");
                setTimeout(()=>{
                    removeClassFromElement(element, "on");
                }, 5000);
            });
        });

        $closeButton.addEventListener("click", ()=>{
            removeClassFromElement($fieldShare, "on");
            removeClassFromElement($articleCard, "off");
            removeClassFromElement($shareImgButton, "off");
        });

        $shareImgButton.addEventListener("click", ()=>{
            setClassToElement($fieldShare, "on");
            setClassToElement($articleCard, "off");
            setClassToElement($shareImgButton, "off");
            setClassToElement($tagShare, "off");
        });

        $tagShare.addEventListener("mouseover", ()=>{
            setClassToElement($tagShare, "off");
        });
    }
});

function newFunction() {
    alert("funcionou");
}
