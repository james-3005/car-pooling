import request from "@/utils/api.service";

export const SAVE_GROUP = (params) => request.post("/groups", params)
export const GET_GROUP = (params) => request.query("/groups", params)
export const UPDATE_GROUP = ({_id, ...params}) => request.patch("/groups/" + _id, params)
export const DELETE_GROUP = (id) => request.delete("/groups/" + id)
export const DELETE_GROUP_ALL = () => request.delete("/groups/many")
export const REQUEST_GROUP = (groupId, params) => request.post(`/groups/${groupId}/ride-requests`, params)
export const GET_GROUP_USER = () => request.get(`/groups/by-user`)
export const USER_LEAVE_GROUP = () => request.delete("/groups/users")