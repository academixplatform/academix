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

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./.db/data.sqlite",
	logging: false,
});
sequelize.authenticate();
interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
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
interface TeacherModel extends Model<InferAttributes<TeacherModel>, InferCreationAttributes<TeacherModel>> {
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
interface CourseModel extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
	id: string;
	name: string;
	description: string;
	image: string | null;
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
		teacherId: {
			type: DataTypes.INTEGER,
		},
	},
	{}
);

Course.belongsTo(Teacher);

interface UserCourseModel extends Model<InferAttributes<UserCourseModel>, InferCreationAttributes<UserCourseModel>> {
	id: number;
	semester: number;
	userId: ForeignKey<number>;
	courseId: ForeignKey<string>;
}

const UserCourse = sequelize.define<UserCourseModel>("usercourse", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	semester: {
		type: DataTypes.INTEGER,
		allowNull: false
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

Course.belongsToMany(User, { through: UserCourse });
User.belongsToMany(Course, { through: UserCourse });
interface AssignmentModel extends Model<InferAttributes<AssignmentModel>, InferCreationAttributes<AssignmentModel>> {
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
			type: DataTypes.STRING
		},
		userId: {
			type: DataTypes.INTEGER
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
	const [teacher] = await Teacher.upsert({
		id: 0,
		name: "Mr. Fisher",
		email: "bfisher@example.com",
		phone: "(100) 344-2934"
	});
	const [course] = await Course.upsert({
		id: "AHHC-4433",
		name: "Precalculus 10",
		description: "todo",
		image: null,
		teacherId: teacher.id
	});
	await UserCourse.upsert({
		id: 0,
		courseId: course.id,
		userId: user.id,
		semester: 1
	})
});
