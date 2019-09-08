"use strict";

window.addEventListener("load", () => {
    if (window.location.href == "https://www.versiculo.cf/random-verse.html" || window.location.href == "http://127.0.0.1:5500/random-verse.html") {
        let $abbrevBookContent = document.getElementById("abbrevBookContent");
        let $verseContent = document.getElementById("verseContent");
        let $bookContent = document.getElementById("bookContent");
        let $capVerContent = document.getElementById("capVerContent");
        let $tagShare = document.getElementById("tagShare");
        let $arrowNext = document.getElementById("arrowNext");
        let $arrowPrevious = document.getElementById("arrowPrevious");

        $verseContent.innerHTML = '<p id="verseContent" class="verse-content"><svg role="img" class="jss584" aria-label="" preserveAspectRatio="none"><rect x="0" y="0" width="100%" clip-path="url(#wx1f1a8h59)" style="fill: url(&quot;#1sj0x14jmdf&quot;);"></rect><defs><clipPath id="wx1f1a8h59"><rect x="0" y="10" rx="3" ry="3" width="390" height="10"></rect><rect x="0" y="35" rx="3" ry="3" width="370" height="10"></rect><rect x="0" y="60" rx="3" ry="3" width="180" height="10"></rect><rect x="0" y="100" rx="3" ry="3" width="380" height="10"></rect><rect x="0" y="125" rx="3" ry="3" width="390" height="10"></rect><rect x="0" y="150" rx="3" ry="3" width="320" height="10"></rect><rect x="0" y="190" rx="3" ry="3" width="390" height="10"></rect><rect x="0" y="215" rx="3" ry="3" width="380" height="10"></rect><rect x="0" y="240" rx="3" ry="3" width="290" height="10"></rect><rect x="0" y="265" rx="3" ry="3" width="220" height="10"></rect></clipPath><linearGradient id="1sj0x14jmdf"><stop offset="-2" stop-color="#cd853f" stop-opacity="1"><animate attributeName="offset" values="-2; -2; 1" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="-1" stop-color="#f5f6fa" stop-opacity="1"><animate attributeName="offset" values="-1; -1; 2" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="0" stop-color="#cd853f" stop-opacity="1"><animate attributeName="offset" values="0; 0; 3" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate></stop></linearGradient></defs></svg></p>';

        let $articleCard = document.getElementById("articleCard"),
            $fieldShare = document.getElementById("share"),
            $shareButton = document.querySelectorAll(".share-button"),
            $closeButton = document.getElementById("closeButton"),
            $shareImgButton = document.getElementById("shareImgButton"),
            $newRandomVerseButton = document.getElementById("newRandomVerseButton");

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

        async function generateRandomVerse(){
            await fetch("../assets/data/bible.json")
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

                            removeClassFromElement($arrowNext, "off");
                            showFieldShare(setTimeNecessarilyToReadVerse);
                            generateUrlsToShareButton(abbrev, verse, chapterNumber, verseNumber);
                            
                            arrowNext.addEventListener("click", ()=>{
                                removeClassFromElement($arrowPrevious, "off");
                                if(chapter[verseNumber] != undefined){
                                    $verseContent.innerText = chapter[verseNumber];
                                    $capVerContent.innerText = `${chapterNumber}:${++verseNumber}`;
                                    
                                    generateUrlsToShareButton(abbrev, chapter[verseNumber], chapterNumber, verseNumber);
                                }else{
                                    setClassToElement($arrowNext, "off");
                                }
                            });

                            $arrowPrevious.addEventListener("click", ()=>{
                                --verseNumber;
                                if(verseNumber > 0){
                                    $verseContent.innerText = chapter[--verseNumber];
                                    $capVerContent.innerText = `${chapterNumber}:${++verseNumber}`;
                                    generateUrlsToShareButton(abbrev, chapter[verseNumber], chapterNumber, verseNumber);
                                }else{
                                    setClassToElement($arrowPrevious, "off");
                                    ++verseNumber;
                                }
                            });
                        }
                    });
                });
        }

        document.addEventListener('keypress', (event) => {
            const keyName = event.key;
          
            alert('keypress event\n\n' + 'key: ' + keyName);
          });

        generateRandomVerse();

        $newRandomVerseButton.addEventListener("click",()=>{
            setClassToElement($newRandomVerseButton, "-animated");
            setTimeout(()=>{
                removeClassFromElement($newRandomVerseButton, "-animated");
            }, 1000);
            generateRandomVerse();
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