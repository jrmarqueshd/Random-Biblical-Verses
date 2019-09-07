"use strict";

window.addEventListener("load", () => {
    if (window.location.href == "https://www.versiculo.cf/random-verse.html" || window.location.href == "http://127.0.0.1:5500/random-verse.html") {
        let $abbrevBookContent = document.getElementById("abbrevBookContent");
        let $verseContent = document.getElementById("verseContent");
        let $bookContent = document.getElementById("bookContent");
        let $capVerContent = document.getElementById("capVerContent");
        let $tagShare = document.getElementById("tagShare");
        let $arrowNext = document.getElementById("arrowNext");

        $verseContent.innerHTML = '<div id="ldsDualRing" class="lds-dual-ring"></div>';

        let $articleCard = document.getElementById("articleCard"),
            $fieldShare = document.getElementById("share"),
            $shareButton = document.querySelectorAll(".share-button"),
            $closeButton = document.getElementById("closeButton"),
            $shareImgButton = document.getElementById("shareImgButton");

        const timeInMsToReadChar = 12;

        function setRandomValue(last){
            return Math.floor((Math.random() * (last + 1)));
        }

        function setClassToElement(element, classElement) {
            element.classList.add(classElement);
        }

        function removeClassFromElement(element, classElement) {
            element.classList.remove(classElement);
        }

        function generateUrlsToShareButton(abbrev, content, verse, chapter) {
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

        function showFieldShare(interval) {
            setTimeout(() => {
                removeClassFromElement($tagShare, "off");
            }, interval);
        }

        fetch("../assets/data/bible.json")
        .then(myJson => myJson.json())
        .then(resp=>{
            var livro = resp[setRandomValue((resp.length - 1))];
            [].forEach.call(resp, (e)=>{
                if(e.abbrev == livro.abbrev){
                    let abbrev = e.abbrev;
                    let name = e.name;
                    let chapterNumber = setRandomValue((e.chapters.length - 1));
                    let chapter = e.chapters[chapterNumber];
                    let verseNumber = setRandomValue((chapter.length - 1));
                    let verse = chapter[verseNumber];
                    let setTimeNecessarilyToReadVerse = ((verse.length / timeInMsToReadChar) * 1000);

                    $abbrevBookContent.innerText = abbrev;
                    $bookContent.innerText = name;
                    $verseContent.innerText = verse;
                    $capVerContent.innerText = `${++chapterNumber}:${++verseNumber}`;


                    showFieldShare(setTimeNecessarilyToReadVerse);
                    generateUrlsToShareButton(abbrev, verse, chapterNumber, verseNumber);
                    
                    arrowNext.addEventListener("click", ()=>{
                        if(chapter[verseNumber] != undefined){
                            $verseContent.innerText = chapter[verseNumber];
                            $capVerContent.innerText = `${chapterNumber}:${++verseNumber}`;
                            
                            generateUrlsToShareButton(abbrev, chapter[verseNumber], chapterNumber, verseNumber);
                        }else{
                            setClassToElement($arrowNext, "off");
                        }
                    });
                }
            });
        });

        $shareButton.forEach(element => {
            element.addEventListener("click", () => {
                setClassToElement(element, "on");
                setTimeout(() => {
                    removeClassFromElement(element, "on");
                }, 5000);
            });
        });

        $closeButton.addEventListener("click", () => {
            removeClassFromElement($fieldShare, "on");
            removeClassFromElement($articleCard, "off");
            removeClassFromElement($shareImgButton, "off");
        });

        $shareImgButton.addEventListener("click", () => {
            setClassToElement($fieldShare, "on");
            setClassToElement($articleCard, "off");
            setClassToElement($shareImgButton, "off");
            setClassToElement($tagShare, "off");
        });

        $tagShare.addEventListener("mouseover", () => {
            setClassToElement($tagShare, "off");
        });
    }
});