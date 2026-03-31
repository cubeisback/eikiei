import "dotenv/config";
import Fastify from "fastify";
import { prisma } from "./db";

const fastify = Fastify({ logger: true });

fastify.get("/health", async () => ({
	status: "ok",
	timestamp: new Date().toISOString(),
}));
fastify.get("/api/ping", async () => ({ message: "pong", time: Date.now() }));
fastify.get("/api/users", async (request, reply) => {
	try {
		const users = await prisma.user.findMany();
		return users;
	} catch (err) {
		fastify.log.error(err);
		return reply.status(500).send({ error: "Internal Server Error" });
	}
});

const start = async () => {
	try {
		await fastify.listen({ port: 3001, host: "0.0.0.0" });
		console.log("API Server running at http://0.0.0.0:3001");
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
