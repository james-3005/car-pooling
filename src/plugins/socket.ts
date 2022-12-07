import { io } from "socket.io-client";
import { SOCKET_URL } from "@/utils/constant";
export const getSocket = () => io(SOCKET_URL);
