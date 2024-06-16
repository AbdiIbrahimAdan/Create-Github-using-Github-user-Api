import create from 'zustand'
const useStore = create((set) => ({
    user: null,
    repositories: [],
    followers: [],
    following: [],
    setUser: (user) => set({user}),
    setRepositories: (repos) => set({repositories: repos}),
    setFollowers: (followers) => set({followers}),
    setFollowing: (following) => set({following}),

}));

export default useStore;
