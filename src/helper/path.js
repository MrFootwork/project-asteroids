const GITHUB_PAGES_URL = 'mrfootwork.github.io';
const PROJECT_NAME = 'project-asteroids';

/**
 * GitHub Pages serves under `mrfootwork.github.io/project-asteroids/...`
 * With this function, all file paths will work locally and on GitHub Pages.
 * @example
 * // This sets the source path correctly in both environments.
 * videoPlayer.src = `${getBasePath()}assets/videos/asteroids-migration.mp4`;
 * @returns {("/project-asteroids/" | "")}
 */
export function getBasePath() {
	const isGitHubPages = window.location.hostname === GITHUB_PAGES_URL;
	const basePath = isGitHubPages ? `/${PROJECT_NAME}/` : '';

	return basePath;
}
