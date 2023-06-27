import { User } from "../../db/sequelize";

export default defineEventHandler(async event => {
	return await User.count();
  })