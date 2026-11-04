import type { Repository } from "../types/repository";

const GITHUB_API_URL = "https://api.github.com";

interface GitHubSearchResponse {
	total_count: number;
	items: Repository[];
}

export const getRepositories = async (
		language: string,
		signal?: AbortSignal
): Promise<Repository[]> => {
	const params = new URLSearchParams({
		q: `language:${language}`,
		sort: "stars",
		order: "desc",
		per_page: "100",
	});

	const response = await fetch(
			`${GITHUB_API_URL}/search/repositories?${params}`,
			{ signal }
	);

	if (!response.ok) {
		throw new Error(`GitHub API Error: ${response.status}`);
	}

	const data: GitHubSearchResponse = await response.json();

	return data.items;
};