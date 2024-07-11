const dayjs = require("dayjs");

const helpers = {
  
    format_date: (date) => {
      return dayjs(date).format("M/DD/YY");
    },

}

module.exports = helpers;