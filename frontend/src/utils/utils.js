// ? constants
import { typeOfErrorFromServer } from './constants';

export function checkPattern(value, pattern) {
  var EMAIL_REGEXP = new RegExp(pattern, 'g');
  const isValid = EMAIL_REGEXP.test(value);
  return isValid;
}

export function checkValidity(input, pattern) {
  const validity = input.validity;
  if (validity.tooShort) {
    return 'Field is too short';
  } else if (validity.tooLong) {
    return 'Field is too long';
  } else if (validity.valueMissing) {
    return 'Field must be filled in';
  } else if (validity.typeMismatch) {
    return 'Email must be like email';
  } else if (validity.patternMismatch) {
    return 'Field must be like pattern';
  }

  return '';
}

export function checkAnswerFromServer(status, type) {
  return typeOfErrorFromServer[type][status];
}

// функция по копированию текса в буфер обмена
export function copy(text) {
  const copyTextarea = document.createElement('textarea');
  copyTextarea.textContent = text;

  document.body.appendChild(copyTextarea);
  copyTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(copyTextarea);
}
