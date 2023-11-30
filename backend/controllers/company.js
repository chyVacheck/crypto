// * errors
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/AllErrors');

// * models
const company = require('../models/Company');
const shareholder = require('../models/Shareholder');
const user = require('../models/User');

// * utils
// ? constants
const { MESSAGE, STATUS, VALID_VALUES, DEV } = require('../utils/constants');

class Companies {
  // * GET
  // ? возвращает данные компании
  getCompanyDataById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId } = req.params;

    await company
      .findById(companyId)
      .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY))
      .then((companyData) => {
        // проверка доступа
        if (!companyData.owners.includes(_id) && !isAdmin) {
          return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
        }

        res.status(STATUS.INFO.OK).send({ data: companyData });
      })
      .catch(next);
  };

  // ? возвращает файл `typeOfFile` компании
  getFileCompanyById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId, typeOfFile } = req.params;

    try {
      const companyData = await company
        .findById(companyId)
        .select(`+${typeOfFile}.data`)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      // проверка наличия файла
      if (typeof companyData[typeOfFile].data === 'undefined') {
        return next(new NotFoundError(MESSAGE.ERROR.NOT_FOUND.FILE));
      }

      res
        .set('Content-Type', companyData[typeOfFile].type)
        .status(STATUS.INFO.OK)
        .send(companyData[typeOfFile].data);
    } catch (error) {
      return next(error);
    }
  };

  // ? возвращает данные о акционере компании
  getShareholderByIdCompanyById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId, shareholderId } = req.params;

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      // проверка shareholder
      if (!companyData.shareholder.includes(shareholderId)) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SHAREHOLDER));
      }

      const shareholderData = await shareholder
        .findById(shareholderId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.SHAREHOLDER));

      res.status(STATUS.INFO.OK).send({ data: shareholderData });
    } catch (error) {
      return next(error);
    }
  };

  // ? возвращает файл акционера компании
  getShareholderFileByIdCompanyById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId, shareholderId, typeOfFile } = req.params;

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      // проверка shareholder
      if (!companyData.shareholder.includes(shareholderId)) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SHAREHOLDER));
      }

      const shareholderData = await shareholder
        .findById(shareholderId)
        .select(`+individual.${typeOfFile}.data`)
        .select(`+company${typeOfFile}.data`)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.SHAREHOLDER));

      res
        .set(
          'Content-Type',
          shareholderData[shareholderData.typeOfShareholder][typeOfFile].type,
        )
        .status(STATUS.INFO.OK)
        .send(
          shareholderData[shareholderData.typeOfShareholder][typeOfFile].data,
        );
    } catch (error) {
      return next(error);
    }
  };

  // * POST
  // ? создает компанию
  createOne = async (req, res, next) => {
    const { _id, isUser } = req.user;

    // проверка доступа
    if (!isUser) {
      return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.MUST_BE_USER));
    }

    //
    await company.find().then((arrayCompany) => {
      for (const oneCompany of arrayCompany) {
        if (oneCompany.owners.includes(_id)) {
          return next(
            new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.ONLY_ONE_COMPANY),
          );
        }
      }
    });

    user
      .findByIdAndUpdate(_id, { typeOfUser: 'Authorised person' })
      .catch(next);

    const shareholderId = await shareholder
      .create({
        typeOfShareholder: req.body.shareholder.typeOfShareholder,
        [req.body.shareholder.typeOfShareholder]: req.body.shareholder.data,
      })
      .then((shareholderData) => shareholderData._id)
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new BadRequestError(MESSAGE.ERROR.INCORRECT_DATA.SIMPLE));
        } else if (err.code === 11000) {
          return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
        } else {
          return next(err);
        }
      });

    const data = req.body;

    delete data.shareholder;

    data.owners = [_id];
    data.shareholder = [shareholderId];
    // создание компании
    await company
      .create(data)
      .then((companyData) => {
        res.send({ message: MESSAGE.INFO.CREATED.COMPANY, data: companyData });
        user.findByIdAndUpdate(_id, { companyId: companyData._id }).catch(next);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new BadRequestError(MESSAGE.ERROR.INCORRECT_DATA.SIMPLE));
        } else if (err.code === 11000) {
          return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
        } else {
          return next(err);
        }
      });
  };

  // ? добавление инвестора
  addShareholder = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId } = req.params;
    const { data, typeOfShareholder } = req.body;

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      const { registrationNumber } = data;

      // должен быть registrationNumber
      if (typeOfShareholder === 'company') {
        if (!registrationNumber)
          return next(new BadRequestError(MESSAGE.ERROR.BAD_REQUEST.SIMPLE));

        // находим всех акционеров
        const shareholderCompanies = await shareholder.find({
          typeOfShareholder: 'company',
        });

        // проверка на уникальность registrationNumber
        for (const index in shareholderCompanies) {
          if (
            companyData.shareholder.includes(shareholderCompanies[index]._id) &&
            shareholderCompanies[index].company.registrationNumber ===
              registrationNumber
          ) {
            return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
          }
        }
      }

      // Создаем нового инвестора в зависимости от типа инвестора
      const shareholderId = await shareholder
        .create({
          typeOfShareholder,
          [typeOfShareholder]: data,
        })
        .then((shareholderData) => shareholderData._id);

      companyData.shareholder.push(shareholderId); // Добавляем id инвестора в массив shareholder

      await companyData.save(); // Сохраняем изменения в базе данных

      res
        .status(STATUS.INFO.OK)
        .send({ message: MESSAGE.INFO.CREATED.SHAREHOLDER });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGE.ERROR.INCORRECT_DATA.SIMPLE));
      } else if (error.code === 11000) {
        return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
      } else {
        return next(error);
      }
    }
  };

  // * PUT
  // ? добавления файла компании
  addFileToCompanyById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId, typeOfFile } = req.params;

    // наличие файла
    if (!req.file) {
      return next(
        new BadRequestError(MESSAGE.ERROR.BAD_REQUEST.FILE_NOT_UPLOAD),
      );
    }

    const { originalname, mimetype, buffer, size } = req.file;

    // размер файла
    if (size > VALID_VALUES.COMPANY.FILE.SIZE.MAX) {
      return next(
        new BadRequestError(MESSAGE.ERROR.BAD_REQUEST.FILE_TOO_HEAVY),
      );
    }

    const updates = {
      certificateOfIncorporation: {
        name: originalname,
        data: buffer,
        type: mimetype,
      },
    };

    const update = updates[typeOfFile];

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      companyData[typeOfFile] = update;

      await companyData.save(); // Сохраняем изменения в базе данных

      res.status(200).send({ message: MESSAGE.INFO.PUT.FILE });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGE.ERROR.INCORRECT_DATA.SIMPLE));
      } else if (error.code === 11000) {
        return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
      } else {
        return next(error);
      }
    }
  };

  // ? добавления файла акционерам компании
  addShareholderFileByIdCompanyById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId, shareholderId, typeOfFile } = req.params;

    // наличие файла
    if (!req.file) {
      return next(
        new BadRequestError(MESSAGE.ERROR.BAD_REQUEST.FILE_NOT_UPLOAD),
      );
    }

    const { originalname, mimetype, buffer, size } = req.file;

    // размер файла
    if (size > VALID_VALUES.COMPANY.FILE.SIZE.MAX) {
      return next(
        new BadRequestError(MESSAGE.ERROR.BAD_REQUEST.FILE_TOO_HEAVY),
      );
    }

    const files = {
      certificateOfIncorporation: {
        name: originalname,
        data: buffer,
        type: mimetype,
      },
      proofOfAddress: {
        name: originalname,
        data: buffer,
        type: mimetype,
      },
      passport: {
        name: originalname,
        data: buffer,
        type: mimetype,
      },
    };

    const fileData = files[typeOfFile];

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      // проверка shareholder
      if (!companyData.shareholder.includes(shareholderId)) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SHAREHOLDER));
      }

      const typeOfShareholder = await shareholder
        .findById(shareholderId)
        .then((_data) => _data.typeOfShareholder);

      if (
        !VALID_VALUES.SHARE_HOLDER[
          typeOfShareholder.toUpperCase()
        ].FILE.VALUES.includes(typeOfFile)
      ) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.FILE));
      }

      await shareholder
        .findByIdAndUpdate(
          shareholderId,
          { $set: { [`${typeOfShareholder}.${typeOfFile}`]: fileData } },
          { new: true },
        )
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.SHAREHOLDER))
        .then((newShareholderData) => {
          res.status(STATUS.INFO.OK).send({ message: MESSAGE.INFO.PUT.FILE });
        });
    } catch (error) {
      return next(error);
    }
  };

  // * PATCH
  // ? редактирование данных компании
  updateDataById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId } = req.params;
    const updateFields = req.body;

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      Object.assign(companyData, updateFields); // Обновляем только переданные поля

      await companyData.save(); // Сохраняем изменения в базе данных

      res.status(STATUS.INFO.OK).send({ message: MESSAGE.INFO.PATCH.COMPANY });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGE.ERROR.INCORRECT_DATA.SIMPLE));
      } else if (error.code === 11000) {
        return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
      } else {
        return next(error);
      }
    }
  };

  // ? редактирование данных акционера компании
  updateShareholderDataByIdCompanyById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId, shareholderId } = req.params;
    const updateFields = req.body;

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      // проверка shareholder
      if (!companyData.shareholder.includes(shareholderId)) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SHAREHOLDER));
      }

      const shareholderData = await shareholder
        .findById(shareholderId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.SHAREHOLDER));

      Object.assign(shareholderData, {
        [shareholderData.typeOfShareholder]: updateFields,
      }); // Обновляем только переданные поля

      await shareholderData.save();

      res.status(STATUS.INFO.OK).send({ message: MESSAGE.INFO.PATCH.SIMPLE });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGE.ERROR.INCORRECT_DATA.SIMPLE));
      } else if (error.code === 11000) {
        return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
      } else {
        return next(error);
      }
    }
  };

  // * DELETE
  // ? удаление акционера
  deleteShareholderByIdCompanyById = async (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { companyId, shareholderId } = req.params;

    try {
      const companyData = await company
        .findById(companyId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.COMPANY));

      // проверка доступа
      if (!companyData.owners.includes(_id) && !isAdmin) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SIMPLE));
      }

      // проверка shareholder
      if (!companyData.shareholder.includes(shareholderId)) {
        return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.SHAREHOLDER));
      }

      // проверка количества shareholder
      if (companyData.shareholder.length === 1) {
        return next(
          new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.TOO_FEW_SHAREHOLDER),
        );
      }

      await shareholder
        .findByIdAndDelete(shareholderId)
        .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.SHAREHOLDER))
        .then(async () => {
          companyData.shareholder = companyData.shareholder.filter(
            (item) => item.toString() !== shareholderId,
          );

          await companyData.save();

          res
            .status(STATUS.INFO.OK)
            .send({ message: MESSAGE.INFO.DELETE.SIMPLE });
        });
    } catch (error) {
      return next(error);
    }
  };
}

const companies = new Companies();

module.exports = { companies };
