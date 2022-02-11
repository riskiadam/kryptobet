import JwtService from "@/services/jwt.service";

export default {
  isAuthenticated: JwtService.getToken() ? true : false,
  token: JwtService.getToken(),
};