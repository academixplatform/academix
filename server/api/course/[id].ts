import { Course, User } from "../../db/sequelize";

export default defineEventHandler(async event => {
	return await Course.findByPk(event.context.params?.id ?? "")
});
