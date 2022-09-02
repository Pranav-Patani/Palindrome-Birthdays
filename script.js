function reverseStr(str) {
  const listOfChars = str.split(``);
  const reverseofChars = listOfChars.reverse().join(``);
  return reverseofChars;
}

function ifPalindrome(str) {
  const reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {
  let dateStr = {
    day: ``,
    month: ``,
    year: ``,
  };

  if (date.day < 10) {
    dateStr.day = `0` + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = `0` + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getAllDateFormats(date) {
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(2, 4);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(2, 4);
  let yymmdd = dateStr.year.slice(2, 4) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeAllDates(date) {
  let palindromeList = getAllDateFormats(date);
  let flag = false;

  for (let i = 0; i < palindromeList.length; i++) {
    if (ifPalindrome(palindromeList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function getNextPalindrome(date) {
  let ctr = 0;
  let nextDate = getNextDate(date);
  while (1) {
    ctr++;
    let isPalindrome = checkPalindromeAllDates(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      month--;
      if (month < 1) {
        month = 12;
        year--;
      }

      day = daysInMonth[month - 1];
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindrome(date) {
  let ctr = 0;
  let previousDate = getPreviousDate(date);

  while (1) {
    ctr++;
    let isPalindrome = checkPalindromeAllDates(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctr, previousDate];
}

const dateInput = document.querySelector(".dob");
const button = document.querySelector(".button");
const output = document.querySelector(".output");

function clickHandler(params) {
  let bdayStr = dateInput.value;

  if (bdayStr == ``) {
    output.innerText = `Need a birth-date to proceed!`;
  } else if (bdayStr !== ``) {
    let listofDate = bdayStr.split("-");
    var date = {
      day: Number(listofDate[2]),
      month: Number(listofDate[1]),
      year: Number(listofDate[0]),
    };
  }

  let isPlaindrome = checkPalindromeAllDates(date);

  if (isPlaindrome) {
    output.innerText = `Whoa! You have a Palindrome Birthday!`;
  } else {
    let [nextDayCount, nextDate] = getNextPalindrome(date);
    let [prevDayCount, prevDate] = getPreviousPalindrome(date);

    output.innerText = `You don't have a Palindrome Birthday.

    The next Palindrome Date is ${nextDate.day}/${nextDate.month}/${nextDate.year} and you missed it by ${nextDayCount} days.

    The previous Palindrome Date was ${prevDate.day}/${prevDate.month}/${prevDate.year} and you missed it by ${prevDayCount} days.`;
  }
}

button.addEventListener("click", clickHandler);
