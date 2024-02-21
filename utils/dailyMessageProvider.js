const DAILY_MESSAGES = [
  {
    day: "monday",
    messages: [
      "Ya es lunes delincuentes, a trabajar :godzilla:",
      "Feliz lunes, a darle con todo",
      "Cómo que ya es lunes otra vez :godzilla-angry:",
    ],
  },
  { day: "tuesday", messages: ["Feliz martes de tacos :taco:", "Otro martes, que emoción :godzilla-angry: "] },
  { day: "wednesday", messages: ["Ya es miércoles, a darle con todo", "Feliz miércoles muchacho :muchacho:"] },
  { day: "thursday", messages: ["Feliz jueves :feliz-jueves:", "Feliz jueves delincuentes :godzilla:"] },
  {
    day: "friday",
    messages: [
      "Feliz viernes :godzilla: :fiesta:",
      "Feliz viernes, menos mal ya no los voy a ver hasta el lunes :godzilla-angry:",
    ],
  },
];

const getRandomMessage = () => {
  const todaysDate = new Date().getDay();
  const messages = DAILY_MESSAGES[todaysDate - 1].messages;
  return messages[Math.floor(Math.random() * messages.length)];
};

module.exports = getRandomMessage;
