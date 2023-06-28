import { Course, Teacher, User, UserCourse } from "../../db/sequelize";

export default defineEventHandler(async event => {
	return await UserCourse.findAll({ where: { userId: +(event.context.params?.id ?? 0) }, include: [Course, { model: Course, include: Teacher }] });
});
