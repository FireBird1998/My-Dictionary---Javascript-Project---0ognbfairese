const primaryBtn = document.querySelector('[data-primary-btn]');

const input = document.querySelector('[data-input]');
const searchBtn = document.querySelector('[data-search-btn]');


let searchedData = [];
searchBtn.addEventListener('click', () => {
    
    //check if the input is empty and calling back tost and return
    if(input.value.trim() === ''){
        createNotification('Please enter a word');
        return;
    }
    
    //only taking the first word
    const word = input.value.trim().split(' ')[0].toLowerCase();
    //clearing the input fild
    input.value = '';
    
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    fetchData(url);
    

})

function fetchData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //check if the word is not found
        if(data.title === 'No Definitions Found'){
            createNotification('Word not found');
            return;
        }
        let definition = data[0].meanings[0].definitions[0].definition;
        let word = data[0].word;
        console.log(definition);
        console.log(word);
        
        searchedData = [word, definition];
        
        displayData();
    });
    
}

function displayData(){
    const main = document.querySelector('main');
    
    if(main.contains(document.querySelector('.card'))){
        main.removeChild(document.querySelector('.card'))
    }
    const card = `
        <div class="card">
            <h2 class="word">word: ${searchedData[0]}</h2>
            <p class="description">${searchedData[1]}</p>
        </div>
    `
    main.insertAdjacentHTML('beforeend', card);
}


// Tost Notification 
function createNotification(text) {
    const notif = document.createElement('div');
    notif.classList.add('toast');
    notif.innerText = text;
    toasts.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    
    }, 3000)
}