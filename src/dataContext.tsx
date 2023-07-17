export type AppState = {
    data: string,
    code: string,
};


export type AppStateProps = {
    appState: AppState,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>,
}
