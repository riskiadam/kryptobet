import Vue from "vue";
import numeral from "numeral";

Vue.filter("decimal", function(value) {
    return numeral(value).format("0,0.00");
  });

  Vue.filter("negatif", function(value) {
    return parseFloat(value) >= 0 ? numeral(value).format("0,0.00") : '('+numeral(Math.abs(value)).format("0,0.00")+')'
  });
  
  //CONVERT TO LOCAL
  Vue.filter("localDate", function(value) {
    if (!value) return "";
  
    return Vue.moment
      .utc(value)
      .local()
      .format("DD/MMM/YYYY HH:mm:ss");
  });

  Vue.filter("localDate2", function(value) {
    if (!value) return "";
  
    return Vue.moment
      .utc(value)
      .local()
      .format("YYYY-MM-DD HH:mm:ss");
  });
  
  Vue.filter("backMasking", function(value) {
    if (value) {
      let str = value.substr(0, value.length - 2);
      return str.concat("***");
    } else {
      return "";
    }
  });