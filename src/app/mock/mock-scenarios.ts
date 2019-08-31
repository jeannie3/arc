export const SCENARIOS: Scenario[] = [
    {
        id: 1,
        title: 'Scenario 1',
        description: 'I am just a mock scenario',
        sceneIds: []
    }
];


export interface Scenario {
    id: number;
    title: string;
    description: string;
    sceneIds: number[];
}
