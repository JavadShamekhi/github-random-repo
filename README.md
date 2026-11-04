# GitHub Random Repository Finder

A React application that helps developers discover random GitHub repositories based on their preferred programming language.

Explore open-source projects, discover interesting repositories, and find inspiration for your next project.

## Features

- Select a programming language from the dropdown.
- Discover random GitHub repositories.
- Refresh to find another repository.
- View repository details:
    - Repository name and owner
    - Description
    - Programming language
    - Stars
    - Forks
    - Open issues
- Cache API responses to reduce unnecessary requests.
- Avoid showing previously selected repositories until the available results are exhausted.
- Loading, error, and empty states.
- Responsive user interface.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- GitHub REST API

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/github-random-repo.git
```

Navigate to the project directory:

```bash
cd github-random-repo
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## API

This project uses the GitHub REST API to search for repositories by programming language.

[GitHub Search Repositories API](https://docs.github.com/en/rest/search/search#search-repositories)

## Project Structure

```text
src/
├── components/
│   ├── LanguageSelect/
│   ├── RepositoryCard/
│   └── Loading/
├── services/
│   └── github.ts
├── types/
│   └── repository.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Learning Objectives

This project was built to practice:

- Working with REST APIs using Fetch
- React Hooks and State Management
- TypeScript interfaces and type safety
- Async/Await and error handling
- Component-based architecture
- Caching API responses
- Responsive UI development

## Roadmap Project

This project is part of the [roadmap.sh GitHub Random Repository Finder Challenge](https://roadmap.sh/projects/github-random-repo).

## License

This project is open-source and available under the MIT License.