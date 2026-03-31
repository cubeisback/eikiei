export function getBaseUrl() {
	if (typeof window === "undefined") {
		// сервер (Next внутри Docker)
		return process.env.INTERNAL_API_URL || "http://api:3001";
	}

	// браузер
	return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
}

// КАК ИСПОЛЬЗОВАТЬ
// import { getBaseUrl } from "@shared/api/get-base-url";

// export default async function Page() {
//   const res = await fetch(`${getBaseUrl()}/users`);
//   const users = await res.json();

//   return <div>{users.length}</div>;
// }

// или
// "use client";

// import { useEffect, useState } from "react";
// import { getBaseUrl } from "@shared/api/get-base-url";

// export default function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch(`${getBaseUrl()}/users`)
//       .then(res => res.json())
//       .then(setUsers);
//   }, []);

//   return <div>{users.length}</div>;
// }

// ИЛИ обертка чтобы не писать fetch каждый раз
// // packages/shared/api/api-client.ts
// import { getBaseUrl } from "./get-base-url";

// export async function api(path: string, options?: RequestInit) {
//   const res = await fetch(`${getBaseUrl()}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(options?.headers || {}),
//     },
//   });

//   if (!res.ok) {
//     throw new Error(`API error: ${res.status}`);
//   }

//   return res.json();
// }

// его использование
// const users = await api("/users");
