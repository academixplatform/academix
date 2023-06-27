import { NuxtAuthHandler } from "#auth";
import SequelizeAdapter from "@auth/sequelize-adapter";
import GithubProvider from "next-auth/providers/github";
import { sequelize } from "../../db/sequelize";
export default NuxtAuthHandler({
	adapter: SequelizeAdapter(sequelize) as any,
	providers: []
});
