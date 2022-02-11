import Service from "@/services/report.service";
import {
  FETCH_WL_REPORT,
  FETCH_TRX_REPORT,
  FETCH_CREDIT_REPORT
} from "@/store/constants/actions.type";

export default {
  [FETCH_TRX_REPORT](context, resource) {
    return new Promise(resolve => {
      return Service.trxReport(resource).then(resp => {
        resolve(resp);
      });
    });
  },
  [FETCH_WL_REPORT](context, resource) {
    return new Promise(resolve => {
      return Service.winLossReport(resource).then(resp => {
        resolve(resp);
      });
    });
  },
  [FETCH_CREDIT_REPORT](context, resource) {
    return new Promise(resolve => {
      return Service.creditReport(resource).then(resp => {
        resolve(resp);
      });
    });
  }
};