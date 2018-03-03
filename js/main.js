window.addEventListener('load', app)

function app() {
  const url = "https://robhitt.github.io/flashcards/card-data.json";
  fetch(url, {method: "GET"})
    .then( (response) => {
      // console.log(response.status);
      return response.json()
    })
    .then( response => renderPage(response) )
    .catch( err => console.log(err));
}

function renderPage(response) {
  const quizData = response.quizData;
  const cardContainer = document.querySelector(".container");
  let html;

  quizData.forEach( (data, index) => {
    
    html = `
      <form class="card card--hidden card-index${index}" data-id=${index}>
        <input type="hidden" name="cardId" value="${index}">
        
        <div class="card__content--style">
          <div class="card__question--text card__question-${index}">${data.question}</div>
          <div class="card__question--answer card__question-answer-${index} card__question--hidden">${data.answer}</div>
        </div>
        <div class="card__navigation">
          <button type="button" data-button-id="${index}" class="card__answer card__answer-id-${index} card__btn--style">Answer</button>
          <button type="submit" class="card__next card__btn--style">Next</button>
        </div>
      </form>
    `;
    cardContainer.insertAdjacentHTML('beforeend', html);

    /************ Add Question / Answer Button Toggle Event Listener ************/
    
    const answerButton = document.querySelector(`.card__answer-id-${index}`);
    answerButton.addEventListener("click", toggleCard);
  });

  const allCards = document.querySelectorAll(".card");
  allCards.forEach( card => {
    if (card.dataset.id === "0") {
      card.classList.remove("card--hidden");
    }
  });

  /************ Toggle Question & Answer Function ************/
  let answerVisible = false;
  function toggleCard(event) {
    let currentCardId = event.currentTarget.dataset.buttonId;
    let currentQuestion = document.querySelector(`.card__question-${currentCardId}`);
    let currentAnswer = document.querySelector(`.card__question-answer-${currentCardId}`);
    let answerButton = document.querySelector(`.card__answer-id-${currentCardId}`);
    
    if (answerVisible) {
      currentAnswer.classList.add("card__question--hidden");
      currentQuestion.classList.remove("card__question--hidden");
      answerButton.textContent = "Answer";
      
    } else {
      currentQuestion.classList.add("card__question--hidden");
      currentAnswer.classList.remove("card__question--hidden");
      answerButton.textContent = "Question";
    }
  
    answerVisible = !answerVisible;
  }

  /************ Navigate to next question ************/
  const nextButton = document.querySelectorAll(".card")
  
  nextButton.forEach( button => {
    button.addEventListener("submit", navigateToNextQuestion);
  });
  
  function navigateToNextQuestion(event) {
    event.preventDefault();
    answerVisible = false;
    
    // Grab current card element and i.d. of current card
    let currentId = parseInt(event.currentTarget.dataset.id);
    const currentCard = document.querySelector(`.card-index${currentId.toString()}`);
    
    console.log({currentId});

    // check if at end of questions
    let cardLength = document.querySelectorAll(".card__next").length - 1;
    if (currentId >= cardLength) {
      alert("There are no more questions, we'll start from the beginning");
      document.querySelector(".container").innerHTML = '';
      app();
    }  else {
      // Prepare next card element and i.d. of next card
      let nextId = currentId + 1;
      const nextCard = document.querySelector(`.card-index${nextId.toString()}`);
      
      currentCard.classList.add("card--hidden");
      nextCard.classList.remove("card--hidden");
    }
  }
}