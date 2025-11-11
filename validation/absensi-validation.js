const Joi = require('joi');

const AbsensiValidation = Joi.object({
  name: Joi.string().required(),
  isMember: Joi.boolean().required(),
  date: Joi.date()
    .required()
    .custom((value, helpers) => {
      const today = new Date();
      const dateValue = new Date(value);

      const todayStr = today.toISOString().split('T')[0];
      const valueStr = dateValue.toISOString().split('T')[0];

      if (todayStr !== valueStr) {
        return helpers.error('any.invalid', {
          message: 'Tanggal absensi harus sama dengan hari ini',
        });
      }

      return value;
    }, 'Tanggal harus sama dengan hari ini')
});

module.exports = { AbsensiValidation };
