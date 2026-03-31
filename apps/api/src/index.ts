import Fastify from "fastify";

const fastify = Fastify({
	logger: true,
});

fastify.get("/health", async (request, reply) => {
	return { status: "ok", timestamp: new Date().toISOString() };
});

fastify.get("/api/ping", async (request, reply) => {
	return { message: "pong", time: Date.now() };
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
