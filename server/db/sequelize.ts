import { DataTypes, Sequelize } from "sequelize";
import * as config from "../../config.json" assert { type: "json" };

export const sequelize = new Sequelize(
	`mysql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`,
	{ logging: false }
); // Example for postgres
sequelize.authenticate();

export const User = sequelize.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING(20),
		},
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
		},
        teacher: {
            type: DataTypes.TEXT,
            allowNull: false
        }
	},
	{}
);

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

User.hasMany(Attendance);
Attendance.belongsTo(User);
Course.hasMany(Attendance);
Attendance.belongsTo(Course);


const UserCourses = sequelize.define("usercourses", {
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
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

Course.belongsToMany(User, { through: UserCourses });
User.belongsToMany(Course, { through: UserCourses });

sequelize.sync({ force: true });
