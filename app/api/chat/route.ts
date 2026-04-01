import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

type OpenRouterResponse = {
	choices?: Array<{
		message?: {
			content?: string;
		};
	}>;
	error?: {
		message?: string;
	};
};

export async function POST(req: Request) {
	const apiKey = process.env.API_KEY;

	if (!apiKey) {
		return NextResponse.json(
			{ error: "Missing API key." },
			{ status: 500 }
		);
	}

	const { question } = await req.json();

	if (!question || typeof question !== "string") {
		return NextResponse.json(
			{ error: "Question is required." },
			{ status: 400 }
		);
	}

	const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "openrouter/free",
			messages: [
				{
					role: "user",
					content: question,
				},
			],
			reasoning: { enabled: true },
		}),
	});

	const data = (await response.json()) as OpenRouterResponse;

	if (!response.ok) {
		return NextResponse.json(
			{ error: data.error?.message ?? "Failed to fetch chatbot response." },
			{ status: response.status }
		);
	}

	const message = data.choices?.[0]?.message?.content?.trim();

	if (!message) {
		return NextResponse.json(
			{ error: "Chatbot response was empty." },
			{ status: 502 }
		);
	}

	return NextResponse.json({ message });
}
