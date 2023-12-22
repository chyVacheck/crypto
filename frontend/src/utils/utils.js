// ? constants
import { typeOfErrorFromServer } from './constants';

export function checkPattern(value, pattern) {
  const REGEXP = new RegExp(pattern, 'g');
  const isValid = REGEXP.test(value);
  return isValid;
}

export function checkValidity(input) {
  const { validity } = input;

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
  } else if (validity.rangeUnderflow) {
    return 'Range underflow, try bigger one';
  } else if (validity.rangeOverflow) {
    return 'Range overflow, try lower one';
  } else if (validity.badInput) {
    return 'Enter the correct data type';
  }

  return '';
}

export function checkAnswerFromServer(status, type) {
  return typeOfErrorFromServer[type][status];
}

export function checkValueIfNotNull(value) {
  return !!value ? value : null;
}

export function checkValueIfNotUndefined(value) {
  return !!value ? value : undefined;
}

export function toData(value) {
  if (!!!value) return undefined;
  const parts = value.split('.');
  const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
  return new Date(dateObject);
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
