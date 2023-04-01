import request from "@/utils/api.service";

export const clearSchedule = (id: string) =>
  request.put(`/taxis/${id}/schedule/clear`, {});
export const clearAllSchedule = () =>
  request.put("/taxis/many/schedule/clear", {});
export const rideRequest = (params: any) =>
  request.post("/ride-requests", params);
