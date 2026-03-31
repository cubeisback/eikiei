// server check
const baseUrl =
	typeof window === "undefined"
		? process.env.INTERNAL_API_URL
		: process.env.NEXT_PUBLIC_API_URL;
