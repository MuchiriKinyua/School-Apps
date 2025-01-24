const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    synonyms = wrapper.querySelector(".synonyms .list"),
    infoText = wrapper.querySelector(".info-text"),
    volumeIcon = wrapper.querySelector(".word i");
    removeIcon = wrapper.querySelector(".search span");

let audio;

function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    } else {
        wrapper.classList.add("active");
        populateWordDetails(result[0]);
        populateSynonyms(result[0]);
    }
}

function populateWordDetails(wordData) {
    const word = wordData.word;
    const phoneticsText = wordData.phonetics[0]?.text || "";
    const audioSrc = wordData.phonetics[0]?.audio || "";
    const definitions = wordData.meanings[0]?.definitions[0];

    document.querySelector(".word p").innerText = word;
    document.querySelector(".word span").innerText = `${wordData.meanings[0]?.partOfSpeech || ""} /${phoneticsText}/`;

    document.querySelector(".meaning span").innerText = definitions?.definition || "No definition available.";
    document.querySelector(".example span").innerText = definitions?.example || "No example available.";

    if (audioSrc && audioSrc.startsWith("https:")) {
        audio = new Audio(audioSrc);
        volumeIcon.style.color = "#000";
        volumeIcon.style.pointerEvents = "auto";
    } else {
        audio = null;
        volumeIcon.style.color = "#ccc";
        volumeIcon.style.pointerEvents = "none";
    }
}

function populateSynonyms(wordData) {
    synonyms.innerHTML = "";
    let synonymsArray = [];

    wordData.meanings.forEach(meaning => {
        if (meaning.definitions) {
            meaning.definitions.forEach(def => {
                if (def.synonyms) {
                    synonymsArray = [...synonymsArray, ...def.synonyms];
                }
            });
        }
    });

    synonymsArray = [...new Set(synonymsArray)].slice(0, 5);

    if (synonymsArray.length > 0) {
        synonymsArray.forEach(synonym => {
            let tag = `<span>${synonym}</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
        });
    } else {
        synonyms.innerHTML = "<span>No synonyms available.</span>";
    }
}

function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
        .then(res => res.json())
        .then(result => data(result, word))
        .catch(err => {
            infoText.innerHTML = `Can't fetch the meaning of <span>"${word}"</span>. Please, check your internet connection.`;
        });
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", () => {
    if (audio) {
        audio.play().catch(err => console.error("Audio playback failed:", err));
    }
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = "Type a word and press enter to get the meaning, example, pronunciation, and synonyms of that typed word";
})