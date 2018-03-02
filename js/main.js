window.addEventListener('load', app)

function app() {
  const url = "https://robhitt.github.io/flashcards/card-data.json";
  fetch(url, {method: "GET"})
    .then(response => response.json())
    .then( (response) => {
      renderPage(response);
    })
}

function renderPage(response) {
  const quizData = response.quizData;
  const cardContainer = document.querySelector(".container");
  let html;

  quizData.forEach( data => {
    html = `
      <div>${data.question}</div>
      <div>${data.answer}</div>
      <div>==============</div>
    `;
    console.log(data.answer);
    
    cardContainer.insertAdjacentHTML('beforeend', html);
  });
  
}