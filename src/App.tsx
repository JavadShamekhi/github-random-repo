import { useRef, useState } from "react";

import LanguageSelect from "./components/LanguageSelect/LanguageSelect";
import RepositoryCard from "./components/RepositoryCard/RepositoryCard";
import Loading from "./components/Loading/Loading";

import { getRepositories } from "./services/github";

import type { Repository } from "./types/repository";

import "./App.css";

function App() {
	const [language, setLanguage] = useState("JavaScript");
	const [repository, setRepository] = useState<Repository | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [hasSearched, setHasSearched] = useState(false);

	const cache = useRef(new Map<string, Repository[]>());
	const shownRepositories = useRef(new Map<string, Set<number>>());
	const abortController = useRef<AbortController | null>(null);

	const handleFindRepository = async () => {
		abortController.current?.abort();

		const controller = new AbortController();
		abortController.current = controller;

		try {
			setLoading(true);
			setError(null);

			let repositories = cache.current.get(language);

			if (!repositories) {
				repositories = await getRepositories(
						language,
						controller.signal
				);

				cache.current.set(language, repositories);
			}

			if (repositories.length === 0) {
				setRepository(null);
				setHasSearched(true);
				return;
			}

			const shown =
					shownRepositories.current.get(language) ?? new Set<number>();

			let available = repositories.filter(
					(repo) => !shown.has(repo.id)
			);

			if (available.length === 0) {
				shown.clear();
				available = repositories;
			}

			const randomIndex = Math.floor(
					Math.random() * available.length
			);

			const selectedRepository = available[randomIndex];

			shown.add(selectedRepository.id);

			shownRepositories.current.set(language, shown);

			setRepository(selectedRepository);
			setHasSearched(true);
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") {
				return;
			}

			setRepository(null);
			setHasSearched(true);
			setError("Something went wrong. Please try again.");
		} finally {
			if (!controller.signal.aborted) {
				setLoading(false);
			}
		}
	};

	const handleLanguageChange = (value: string) => {
		abortController.current?.abort();

		setLanguage(value);
		setRepository(null);
		setError(null);
		setLoading(false);
		setHasSearched(false);
	};

	return (
			<main className="app">
				<div className="container">
					<header className="app-header">
						<span className="app-label">GITHUB EXPLORER</span>

						<h1>
							Discover Your Next
							<span> Favorite Repository</span>
						</h1>

						<p>
							Explore interesting open-source projects from GitHub.
							Find something new to build and learn.
						</p>
					</header>

					<section className="search-section">
						<LanguageSelect
								value={language}
								onChange={handleLanguageChange}
						/>

						<button
								type="button"
								onClick={handleFindRepository}
								disabled={loading}
						>
							{loading
									? "Finding Repository..."
									: repository
											? "Refresh Repository"
											: hasSearched
													? "Try Again"
													: "Find Random Repository"}
						</button>
					</section>

					{loading && <Loading />}

					{error && (
							<div className="error-message" role="alert">
								{error}
							</div>
					)}

					{!loading && !error && hasSearched && !repository && (
							<div className="empty-state">
								<h2>No repositories found</h2>
								<p>
									We couldn't find any repositories for {language}.
									Try another programming language.
								</p>
							</div>
					)}

					{!loading && repository && (
							<RepositoryCard repository={repository} />
					)}
				</div>
			</main>
	);
}

export default App;