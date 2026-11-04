import "./Loading.css";

function Loading() {
	return (
			<div className="loading">
				<span className="loading-spinner" />
				<p>Finding an interesting repository...</p>
			</div>
	);
}

export default Loading;