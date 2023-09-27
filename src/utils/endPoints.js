//const API_URL = "http://localhost/projects/nextdynamix/bsi/backend/api/";
const API_URL = "http://localhost/bsi/bsi/backend/api/";
//const API_URL = "http://localhost/wrnd/bsi/backend/api/";
export const endPoints = {
  API_AUTHORIZATION_CODE: "BSI_AUTH_NEXTDYNAMIC",
  otp_request: "otp_request",
  agreement_acceptance: API_URL + "agreement_acceptance",
  login_user: API_URL+ "login_user",
  assets: API_URL+ "assets",
  investorsListApi: API_URL + "investorsList",
  add_investor: API_URL + "add_investor",
  single_investor: API_URL + "single_investor",
  paymentList: API_URL + "paymentList",
  addPayment: API_URL + "addPayment",
  profile: API_URL + "profile",
  logout: API_URL + "logout",
  investorDashboard: API_URL + "investorDashboard",
  single_asset: API_URL + "single_asset",
  get_down_data: API_URL + "get_down_data",
  downtree: API_URL + "downtree",
  check_first_payment: API_URL + "check_first_payment",
};