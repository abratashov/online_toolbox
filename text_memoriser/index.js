const DEFAULT_TEXT = `
    Imagine

    Imagine there's no heaven
    It's easy if you try
    No hell below us
    Above us, only sky

    Imagine all the people
    Livin' for today
    Ah

    Imagine there's no countries
    It isn't hard to do
    Nothing to kill or die for
    And no religion, too

    Imagine all the people
    Livin' life in peace
    You

    You may say I'm a dreamer
    But I'm not the only one
    I hope someday you'll join us
    And the world will be as one

    Imagine no possessions
    I wonder if you can
    No need for greed or hunger
    A brotherhood of man

    Imagine all the people
    Sharing all the world
    You

    You may say I'm a dreamer
    But I'm not the only one
    I hope someday you'll join us
    And the world will live as one

    1971, John Lennon`;

function wordsToLetters(text, charReplacement = ' ') {
  return text.split('\n').map(wordsLine => {
    const WORD_CHARS = /[а-яА-ЯІіЄєЇїҐґЁё\w'ʹʻʼʽˈ‘’‛′]/;
    const NON_WORD_CHARS = /[^а-яА-ЯІіЄєЇїҐґЁё\w'ʹʻʼʽˈ‘’‛′]/;

    let lettersLine = '';
    let previousChar = '';

    [...wordsLine].forEach(char => {
      let currentLetter;

      if (char.match(NON_WORD_CHARS)) {
        currentLetter = char;
      } else {
        currentLetter = previousChar.match(WORD_CHARS) ? charReplacement : char;
      }

      lettersLine += currentLetter;
      previousChar = char;
    });
    return lettersLine;
  });
}

function testWordsToLetters() {
  let success =
    (wordsToLetters("Qq Ww Ee Rr Tt Yy Uu Ii Oo Pp Aa Ss Dd Ff Gg Hh Jj Kk Ll Zz Xx Cc Vv Bb Nn Mm") ==
                    "Q  W  E  R  T  Y  U  I  O  P  A  S  D  F  G  H  J  K  L  Z  X  C  V  B  N  M ") &&

    (wordsToLetters("Йй Цц Уу Кк Ее Нн Гг Шш Щщ Зз Хх Її Ґґ Фф Іі Вв Аа Пп Рр Оо Лл Дд Жж Єє Яя Чч Сс Мм Ии Тт Ьь Бб Юю '") ==
                    "Й  Ц  У  К  Е  Н  Г  Ш  Щ  З  Х  Ї  Ґ  Ф  І  В  А  П  Р  О  Л  Д  Ж  Є  Я  Ч  С  М  И  Т  Ь  Б  Ю  '") &&

    (wordsToLetters("Ёё Йй Цц Уу Кк Ее Нн Гг Шш Щщ Зз Хх Ъъ Фф Ыы Вв Аа Пп Рр Оо Лл Дд Жж Ээ Яя Чч Сс Мм Ии Тт Ьь Бб Юю") ==
                    "Ё  Й  Ц  У  К  Е  Н  Г  Ш  Щ  З  Х  Ъ  Ф  Ы  В  А  П  Р  О  Л  Д  Ж  Э  Я  Ч  С  М  И  Т  Ь  Б  Ю ") &&

    (wordsToLetters("` ~ ! @ # $ % ^ & * ( ) _ + { } [ ] | \ : ; ' \" , . / < > ? №") ==
                    "` ~ ! @ # $ % ^ & * ( ) _ + { } [ ] | \ : ; ' \" , . / < > ? №") &&

    (wordsToLetters("Imagine there's no heaven") ==
                    "I       t       n  h     ") &&

    (wordsToLetters("Эта ёлка высока, аль достанет потолка!") ==
                    "Э   ё    в     , а   д        п      !") &&

    (wordsToLetters("Привіт, друже! Її ґазда, солов'їний.") ==
                    "П     , д    ! Ї  ґ    , с         .");

  let message = success ? "Tests passed successfully!" : "Tests failed!"

  console.log(message)

  return success;
}

document.addEventListener("DOMContentLoaded", function(event) {
  init();
  // testWordsToLetters();
});

function init() {
  document.getElementById("input").value = DEFAULT_TEXT;
  document.getElementById("output").value = "";
}

function createMemorizationCard() {
  let text = document.getElementById("input").value
  let removeSpaces = document.getElementById("remove_spaces").checked;
  let replacementChar = document.getElementById("replacement_char").value

  let res = wordsToLetters(text, replacementChar);

  if (removeSpaces) {
    res = res.map(l => l.replace(/\s+/g, ''))
  }

  document.getElementById("output").value = res.join("\n");
}
