const baseURL = "http://localhost:3001/";

// export const dashboard = `https://journeyiq-location-service.herokuapp.com/api/dashboard`;
export const dashboard = `http://52.8.63.249:8080/location/api/dashboard`;

export const locationSummary =
  "https://journeyiq-location-service.herokuapp.com/api/getSummary";

export const sankeyChart = `https://journeyiq-chart-service.herokuapp.com/api/sankey`;

export const lead = "https://journeyiq-leads-service.herokuapp.com/api/custom";

export const customLead =
  "https://journeyiq-leads-service.herokuapp.com/api/summary/leads/custom";

export const login = `http://52.8.63.249:8080/auth/api/login`;

export const register = `http://52.8.63.249:8080/auth/api/register`;

export const GETIpList =
  "https://journeyiq-ip-service.herokuapp.com/api/ip/ip_getAll";

export const UPDATEIpList =
  "https://journeyiq-ip-service.herokuapp.com/api/ip/ip_update";

export const CREATEIpList =
  "https://journeyiq-ip-service.herokuapp.com/api/ip/ip_create/";

export const DELETE_IP =
  "https://journeyiq-ip-service.herokuapp.com/api/ip/ip_delete";

export const GETALLSESSION =
  "https://journeyiq-journey-services.herokuapp.com/api/session/get_all_user_session";

export const GETUSERSESSION =
  "https://journeyiq-journey-services.herokuapp.com/api/session/get_user_session";

export const GETUSERDOMAIN =
  "https://journeyiq-journey-services.herokuapp.com/api/domain/getAllDomain";

export const CREATEUSERDOMAIN =
  "https://journeyiq-journey-services.herokuapp.com/api/domain/createDomain";

export const UPDATE_LEAD_STATUS =
  "https://journeyiq-journey-services.herokuapp.com/api/session/update_lead";

export const FORGOT_PASSWORD =
  "https://journeyiq-auth-service.herokuapp.com/api/forgot_password";

export const GET_USER_DETAIL =
  "https://journeyiq-auth-service.herokuapp.com/api/user";

export const UPDATE_USER_DETAIL =
  "https://journeyiq-auth-service.herokuapp.com/api/user/update_detail";

export const CHANGE_USER_PASSWORD =
  "https://journeyiq-auth-service.herokuapp.com/api/user/reset_password";

export const CREATE_NEW_USER =
  "https://journeyiq-auth-service.herokuapp.com/api/register";

export const GET_ALL_DOMAIN =
  "https://journeyiq-auth-service.herokuapp.com/api/domain/getAllDomain";

export const GET_DOMAIN =
  "https://journeyiq-auth-service.herokuapp.com/api/domain/getDomain";

export const CREATE_DOMAIN =
  "https://journeyiq-auth-service.herokuapp.com/api/domain/createDomain";

export const GET_FORMS =
  "https://journeyiq-journey-services.herokuapp.com/api/form/get_forms";

export const GET_ALL_FORMS =
  "https://journeyiq-journey-services.herokuapp.com/api/form/getAllFroms";
// export const GET_ALL_FORMS = 'http://localhost:3006/api/form/getAllFroms';

export const UPDATE_FORMS =
  "https://journeyiq-journey-services.herokuapp.com/api/form/update_forms";

export const GET_MAP_DATA =
  "https://journeyiq-location-service.herokuapp.com/api/getSummary";

// export const GET_MAP_ROI_BY_STATE_DATA =
//   "http://localhost:8006/api/statewise_roi";
// export const GET_CAMPAIGNS_DATA = "http://localhost:8006/api/campaigns";
// export const GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA =
//   "http://localhost:8006/api/campaign_analysis";
// export const GET_MAP_ROI_FILTER = "http://localhost:8006/api/filter_roi";
// export const GET_MAP_REVENUE_FILTER =
//   "http://localhost:8006/api/filter_revenue";
// export const GET_CAMPAIGN_GRAPH =
//   "http://localhost:8006/api/campaign_graph";

export const GET_MAP_ROI_BY_STATE_DATA =
  "http://52.8.63.249:8080/dashboard/api/statewise_roi";
export const GET_CAMPAIGNS_DATA = "http://52.8.63.249:8080/dashboard/api/campaigns";
export const GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA =
  "http://52.8.63.249:8080/dashboard/api/campaign_analysis";
export const GET_MAP_ROI_FILTER = "http://52.8.63.249:8080/dashboard/api/filter_roi";
export const GET_MAP_REVENUE_FILTER = "http://52.8.63.249:8080/dashboard/api/filter_revenue";
export const GET_CAMPAIGN_GRAPH = "http://52.8.63.249:8080/dashboard/api/campaign_graph";
