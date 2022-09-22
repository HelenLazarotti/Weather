 //variáveis e seleções de elementos
 const apiKey = "4c3e2052c9bffd693c776f8904dbb238";
 
 const apiCountryURL = "https://countryflagsapi.com/png/";

 //crio variáveis para todos os elementos que precisam ser mutados com base na minha API
 const cityInput = document.querySelector("#city-input");
 const searchBtn = document.querySelector("#search");

 const cityElement = document.querySelector("#city");
 const tempElement = document.querySelector("#temperature span");
 const descElement = document.querySelector("#description");
 const weatherIconElement = document.querySelector("#weather-icon");
 const countryElement = document.querySelector("#country");
 const humidityElement = document.querySelector("#humidity span");
 const windElement = document.querySelector("#wind span");
 const weatherContainer = document.querySelector("#weather-data");


 //Funções

 //função que acessa a API:
     //aqui é uma função assincrona(async), pq como é uma API pode demorar um pouco pra responder
 const getWeatherData = async(city) =>{

     //peguei o link do Current weather data e acrescentei o q=${city}, pois vai pegar com base no que o usuário digitar:
     const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

     //dps do {city} coloquei unidades de medidas como métricas(&units=metric), coloco a minha API(appid=${apiKey})-> com o nome da variável que eu criei lá em cima que contem a url da api que estou trabalhando. E coloco para portuguès Brasil.

     //preciso esperar ou fetch
     const res = await fetch(apiWeatherURL);

     //vai chegar os dados em json, ai transformo para um objeto js:
     const data = await res.json();
     return data;
 };

 //essa função anonima vai esperar a cidade e exibir os dados da API:
 const showWeatherData = async(city) =>{
     const data = await getWeatherData(city);

     //agr chamo os elementos pra mostrar na tela:
     cityElement.innerText = data.name;

     tempElement.innerText = parseInt(data.main.temp);//botei parseInt, pois quero num einteiro, se não me retorna valor com vírcula.

     descElement.innerText = data.weather[0].description;// botei 0 pq quero a 1º posição como la no objeto é array.

     weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);// coloquei setAttribue pq é uma img, logo preciso achar a imagem, e troquei ali entre img/wn/01d.png > por img/wn/${data.weather[0].icon}.png

     countryElement.setAttribute("src", apiCountryURL + data.sys.country);

     humidityElement.innerText = `${data.main.humidity}%`;

     windElement.innerText = `${data.wind.speed}km/h`;

     weatherContainer.classList.remove("hide");//pra remover a classe hide e poder mostrar todas as informações
 };


 //Eventos

//pra quando eu clicar no botão ele uma função anônima, pegando o argumento do envento.

//Como é um botão do formulário, ele vai tentar pegar e enviar o form, mas vai dar erro, então


 searchBtn.addEventListener("click", (e) =>{
     e.preventDefault();
     //pra isso não acontecer

     //preciso pegar o valor do input da minha cidade pra fazer a busca da minha função da API
     const city = cityInput.value;

     showWeatherData(city);
 })

 cityInput.addEventListener("keyup", (e) => {
     if(e.code === "Enter"){
         const city = e.target.value;
         showWeatherData(city);
     }
 })

 
 //essa é a minha chave da API do tempo
 //pra ver se minha key ta funcionando procuro > Current weather data  clico em API docs > cato o API call que é um link e copio/colo no navegador e coloca a minha chave dps do apiid=

 //4c3e2052c9bffd693c776f8904dbb238

 //https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid=4c3e2052c9bffd693c776f8904dbb238

 //link da API https://openweathermap.org/
