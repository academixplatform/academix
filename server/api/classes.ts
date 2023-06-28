import { Course, Teacher, User } from "../db/sequelize";

export default defineEventHandler(async event => {
	return await Course.findAll({ include: Teacher })
});
