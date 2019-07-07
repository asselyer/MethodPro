const API_KEY = '2f5639cf57aa4ebd8deee259a75c16cc';
const API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&language=ru`;

const SORT_OPTIONS = [
  { display: "По дате", value: "publishedAt" },
  { display: "Актуальные", value: "relevancy" },
  { display: "Популярные", value: "popularity"},
  { display: "Все", value: "none"}
];

export {
  API_URL,
  SORT_OPTIONS
}