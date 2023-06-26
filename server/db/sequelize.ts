import { DataTypes, Sequelize } from "sequelize";
import * as config from "../../config.json" assert { type: "json" };

export const sequelize = new Sequelize(
	`mysql://${config.studentname}:${config.password}@${config.host}:${config.port}/${config.database}`,
	{ logging: false }
); // Example for postgres
sequelize.authenticate();

export const Student = sequelize.define(
	"student",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
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
			allowNull: false,

		},
		password: {
			type: DataTypes.STRING(60),
			allowNull: false,
		}
	},
	{}
);

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

sequelize.sync({ force: true });
