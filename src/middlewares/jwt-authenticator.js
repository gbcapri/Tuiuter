/* import jwtService from "../services/jwt-service.js";

const jwtAuthenticator = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwtService.verifyAccessToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("");
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

export default jwtAuthenticator;
 */

import jwtService from "../services/jwt-service.js";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwtService.verifyAccessToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("");
    }
  } catch (error) {
    res.sendStatus(401);
  }
}
