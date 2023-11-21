// ! modules
const multer = require('multer');

// * errors
const { BadRequestError } = require('./../errors/BadRequestError');

// * utils
// ? constants
const { MESSAGE, VALID_VALUES } = require('../utils/constants');

// ? storage
const storageUserFiles = multer.memoryStorage();

module.exports.uploadUserFile = multer({
  storage: storageUserFiles,
  fileFilter: (req, file, cb) => {
    // Проверка типа файла
    if (
      !file.mimetype.startsWith('image/') &&
      !VALID_VALUES.USER.FILE.TYPES.includes(file.mimetype)
    ) {
      return cb(new BadRequestError(MESSAGE.ERROR.BAD_REQUEST.FILE_BAD_TYPE));
    }

    cb(null, true);
  },
});
