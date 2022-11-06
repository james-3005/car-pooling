export const SET_SEARCH_REQUEST = (params: any) => {
  localStorage.setItem("searchRequest", JSON.stringify(params));
};
export const GET_SEARCH_REQUEST = () =>
  JSON.parse(localStorage.getItem("searchRequest") as string);

export const DELETE_SEARCH_REQUEST = () => {
  localStorage.removeItem("searchRequest");
};
