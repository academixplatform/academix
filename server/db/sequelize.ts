import * as pg from "pg";
import {
	CreationOptional,
	DataTypes,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
	Sequelize,
} from "sequelize";


console.log(Object.keys(pg.default));
console.log(pg.default)
const sequelize = new Sequelize((process.env.POSTGRES_URL + "?sslmode=require") ?? "", {
	logging: false,
	dialectModule: pg.default,
});
sequelize.authenticate();
export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	id: CreationOptional<number>;
	name: string;
}

export const User = sequelize.define<UserModel>(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{}
);
export interface TeacherModel extends Model<InferAttributes<TeacherModel>, InferCreationAttributes<TeacherModel>> {
	id: CreationOptional<number>;
	name: string;
	email: string;
	phone: string;
}

export const Teacher = sequelize.define<TeacherModel>(
	"teacher",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{}
);
export interface CourseModel extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
	id: string;
	name: string;
	description: string;
	image: string | null;
	room: number;
	teacherId: ForeignKey<number>;
}

export const Course = sequelize.define<CourseModel>(
	"course",
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
		},
		room: {
			type: DataTypes.INTEGER,
		},
		teacherId: {
			type: DataTypes.INTEGER,
		},
	},
	{}
);

Course.belongsTo(Teacher);

export interface UserCourseModel extends Model<InferAttributes<UserCourseModel>, InferCreationAttributes<UserCourseModel>> {
	id: number;
	semester: number;
	block: number;
	userId: ForeignKey<number>;
	courseId: ForeignKey<string>;
}

export const UserCourse = sequelize.define<UserCourseModel>("usercourse", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	semester: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	block: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: "id",
		},
	},
	courseId: {
		type: DataTypes.STRING,
		references: {
			model: Course,
			key: "id",
		},
	},
});

Course.hasMany(UserCourse);
UserCourse.belongsTo(Course);
User.hasMany(UserCourse);
UserCourse.belongsTo(User);
export interface AssignmentModel extends Model<InferAttributes<AssignmentModel>, InferCreationAttributes<AssignmentModel>> {
	id: CreationOptional<number>;
	name: string;
	marks: number;
	maxMarks: number;
	userId: ForeignKey<number>;
	user: NonAttribute<UserModel>;
	courseId: ForeignKey<string>;
}

export const Assignment = sequelize.define<AssignmentModel>(
	"assignment",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		marks: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		maxMarks: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		courseId: {
			type: DataTypes.STRING,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
	},
	{}
);
Assignment.belongsTo(User);
Assignment.belongsTo(Course);
/*

export const Course = sequelize.define(
	"course",
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	},
	{}
);


export const Teacher = sequelize.define(
	"teacher",
	{
		id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
		},
		firstName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false
        },
		password: {
			type: DataTypes.STRING(60),
			allowNull: false,
		}
	},
	{}
);

Course.hasOne(Teacher);
Teacher.hasMany(Course);

export const Attendance = sequelize.define(
    "attendance",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        absenceDates: {
            type: DataTypes.STRING, // json array
            defaultValue: "{}",
        },
        lateDates: {
            type: DataTypes.STRING, // json array
            defaultValue: "{}",
        }
    },
    {}
)

export const Grade = sequelize.define(
    "grade",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }
)

Student.hasMany(Attendance);
Attendance.belongsTo(Student);
Course.hasMany(Attendance);
Attendance.belongsTo(Course);


const StudentCourses = sequelize.define("studentcourses", {
	studentId: {
		type: DataTypes.INTEGER,
		references: {
			model: Student,
			key: "id",
		},
	},
	courseId: {
		type: DataTypes.INTEGER,
		references: {
			model: Course,
			key: "id",
		},
	},
});

Course.belongsToMany(Student, { through: StudentCourses });
Student.belongsToMany(Course, { through: StudentCourses });
*/
sequelize.sync({ force: true }).then(async x => {
	const [user] = await User.upsert({
		name: "Bob Jane",
		id: 0,
	});
	const firstSemester = await Promise.all(
		[
			{
				id: "ABCD-1234",
				name: "Composition 10",
				room: 2033,
				teacher: "Mr. Smith",
				description:
					"Composition 10 is designed to support students in their development of written communication through a critical process of questioning, exploring, and sampling. Within a supportive community of writers, students will work individually and collaboratively to explore and create coherent, purposeful compositions. Students will read and study compositions by other writers and consider a variety of styles as models for the development of their writing.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Austria_-_G%C3%B6ttweig_Abbey_-_2015.jpg/640px-Austria_-_G%C3%B6ttweig_Abbey_-_2015.jpg",
			},
			{
				id: "GEFA-7676",
				name: "Precalculus 10",
				room: 1144,
				teacher: "Ms. Kinley",
				description:
					"Through ten distinct units, students explore principles of algebra, geometry, and trigonometry and reinforce skills introduced in prior grades.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/L%C3%BCbeck%2C_Wissenschaftspfad%2C_Abakus_--_2017_--_0372.jpg/640px-L%C3%BCbeck%2C_Wissenschaftspfad%2C_Abakus_--_2017_--_0372.jpg",
			},
			{
				id: "FMNE-4443",
				name: "CLE 10",
				room: 3322,
				teacher: "Ms. Roberts",
				description:
					"Today’s graduates must be able to adapt to ongoing change in many aspects of their lives. Purposeful career-life development, in which students learn how to set personally meaningful goals, recognize and cultivate relevant opportunities and supportive relationships, and continually re-evaluate and revise their plans, is a necessity for educated citizens in an ever-changing world.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Architecture_Classroom_in_the_Carnegie_Mellon_College_of_Fine_Arts.jpg/640px-Architecture_Classroom_in_the_Carnegie_Mellon_College_of_Fine_Arts.jpg",
			},
			{
				id: "FAFJ-3423",
				name: "Science 10",
				room: 2123,
				teacher: "Ms. Mann",
				description:
					"Science 10 is designed to support students in their development of scientific literacy. Students will study a variety of topics that address the big ideas of science. They will develop their scientific inquiry skills as they explore the relationships between science, technology, society, and the environment, and become aware of how science-related careers and research affect their lives.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Openluchtmuseum_Arnhem_-_Laboratorium_Zuivelfabriek_Freia.jpg/639px-Openluchtmuseum_Arnhem_-_Laboratorium_Zuivelfabriek_Freia.jpg",
			},
		].map(async (x, i) => {
			const ph = Math.tan(x.teacher.charCodeAt(4)) + Math.tan(x.teacher.charCodeAt(5));
			const phone = ((ph < 100000000 ? ph * 100000000 : ph) % 10000000000).toString();
			const teacher = (
				await Teacher.upsert({
					id: i,
					name: x.teacher,
					email: x.teacher.split(". ")[1].toLowerCase() + "@example.com",
					phone: `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`,
				})
			)[0];
			return (
				await Course.upsert({
					id: x.id,
					name: x.name,
					room: x.room,
					teacherId: teacher.id,
					description: x.description,
					image: x.image,
				})
			)[0];
		})
	);
	await Promise.all(
		firstSemester.map(async (x, i) => {
			await UserCourse.upsert({
				id: i,
				courseId: x.id,
				userId: user.id,
				semester: 1,
				block: i + 1,
			});
		})
	);
	const secondSemester = await Promise.all(
		[
			{
				id: "HIJK-1923",
				name: "Intermediate Band 10",
				room: 3000,
				teacher: "Mr. Wilson",
				description:
					"This course is designed to provide students with the opportunity to develop their musical skills through the study and performance of a variety of band music. Students will develop their technical skills, rhythmic skills, and musicality through the study of scales, technical exercises, and band repertoire. Students will also develop their ability to work collaboratively with others as they rehearse and perform with the band.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Israel_Philharmonic_Orchestra.jpg/640px-Israel_Philharmonic_Orchestra.jpg",
			},
			{
				id: "EKFE-7354",
				name: "Woodworking 10",
				room: 3322,
				teacher: "Ms. Reid",
				description:
					"Woodworking 10 provides students with the opportunity to develop their woodworking skills through the study and construction of a variety of projects. Students will develop their technical skills, safety skills, and creativity through the study of woodworking techniques and the construction of projects. Students will also develop their ability to work collaboratively with others as they work in the shop.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Puy_du_Fou.-_La_Cit%C3%A9_M%C3%A9di%C3%A9vale_%281%29.JPG/640px-Puy_du_Fou.-_La_Cit%C3%A9_M%C3%A9di%C3%A9vale_%281%29.JPG",
			},
			{
				id: "DFAA-6765",
				name: "Computer Science 10",
				room: 2003,
				teacher: "Mr. Figgs",
				description:
					"Computer Science 10 is designed to provide students with the opportunity to develop their computational thinking skills through the study of computer science. Students will develop their ability to solve problems, design algorithms, write programs, and complete programming projects, using a variety of programming languages. Students will also develop their ability to work collaboratively with others as they develop and present their projects.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/CERN_Server_03.jpg/640px-CERN_Server_03.jpg",
			},
		].map(async (x, i) => {
			const ph = Math.tan(x.teacher.charCodeAt(4)) + Math.tan(x.teacher.charCodeAt(5));
			const phone = ((ph < 100000000 ? ph * 100000000 : ph) % 10000000000).toString();
			const teacher = (
				await Teacher.upsert({
					id: i + 4,
					name: x.teacher,
					email: x.teacher.split(". ")[1].toLowerCase() + "@example.com",
					phone: `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`,
				})
			)[0];
			return (
				await Course.upsert({
					id: x.id + 4,
					name: x.name,
					room: x.room,
					teacherId: teacher.id,
					description: x.description,
					image: x.image,
				})
			)[0];
		})
	);
	await Promise.all(
		secondSemester.map(async (x, i) => {
			await UserCourse.upsert({
				id: i + 4,
				courseId: x.id,
				userId: user.id,
				semester: 2,
				block: i === 2 ? 4 : i + 1,
			});
		})
	);
});
