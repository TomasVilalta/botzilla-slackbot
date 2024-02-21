// Example response
// [
//   {
//     q: "Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.",
//     a: "Ronald Reagan",
//     h: "<blockquote>&ldquo;Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.&rdquo; &mdash; <footer>Ronald Reagan</footer></blockquote>",
//   },
// ];

const getTodayQuote = async () => {
  const response = await fetch("https://zenquotes.io/api/today");
  const data = await response.json();
  return data[0].q;
};

getTodayQuote();

module.exports = getTodayQuote;
