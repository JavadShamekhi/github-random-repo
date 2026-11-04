import type { Repository } from "../../types/repository";
import "./RepositoryCard.css";

interface RepositoryCardProps {
	repository: Repository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
	return (
			<article className="repository-card">
				<div className="repository-owner">
					<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
					/>

					<span>{repository.owner.login}</span>
				</div>

				<h2>{repository.name}</h2>

				<p className="repository-description">
					{repository.description || "No description available."}
				</p>

				<div className="repository-stats">
					<span>⭐ {repository.stargazers_count.toLocaleString()}</span>
					<span>🍴 {repository.forks_count.toLocaleString()}</span>
					<span>Issues: {repository.open_issues_count.toLocaleString()}</span>
				</div>

				<a
						href={repository.html_url}
						target="_blank"
						rel="noopener noreferrer"
				>
					View on GitHub ↗
				</a>
			</article>
	);
}

export default RepositoryCard;