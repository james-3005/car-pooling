import request from "@/utils/api.service";

export const clearMovement = () => request.delete("/movements/clear");

export interface IListMovement {
  page?: number;
  page_size?: number;
  user_ids?: number[];
  day_in_week?: number;
  hour_in_day?: number;
}

export const listMovement = (params: IListMovement) =>
  request.query("/movements", { ...params });

export interface ICreateMovement {
  user_id: string;
  l?: [number, number];
  t: string;
}

export const createMovement = (params: ICreateMovement) =>
  request.post("/movements", params);

interface ILocation {
  lat: number;
  lng: number;
}

export interface IListLocation {
  user_id: string;
  locations: ILocation[];
}

export interface ICreateMovementMany {
  t_start: string;
  t_interval: number;
  list: IListLocation[];
}

export const createMovementMany = (params: ICreateMovementMany) =>
  request.post("movements/many", params);

export interface ICreatePatternMany {
  hour_start: number;
  list: IListLocation[];
}

export const createPatternMany = (params: ICreatePatternMany) =>
  request.post("patterns/many", params);

interface IParams {
  size: number;
  opts: {
    hourId: number;
    maxDistance: number;
    minDuration: number;
    minWeight: number;
  };
}

export const getCluster = (params: IParams, algo = "agp") =>
  request.post(`clustering/${algo}`, params);

export const frequentClear = () => request.delete("patterns/clear");

export const buildPattern = (id: string, params: any) =>
  request.post(`patterns/${id}`, params);
