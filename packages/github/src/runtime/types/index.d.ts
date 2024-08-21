export * from "./repository"
export * from "./releases"
export * from "./commits"
export * from "./contributors"

export interface GithubAuthor {
    name: string,
    login: string,
    avatarUrl: string
}