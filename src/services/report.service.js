import BaseService from "@/services/api.service";

export default {
    winLossReport(query) {
      return BaseService.post("report/winloss", query);
    },
    trxReport(query) {
      return BaseService.post("report/trx", query);
    },
    creditReport(query) {
      return BaseService.post("report/credit", query);
    }
};