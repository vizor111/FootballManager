import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import teams from "../teams"
import { goalsMissed, goalsScored } from '../functions/functions';
import { MatchDetails } from '../MatchDetails';

export const MainGrid: React.FC<MainGridProps> = ({ selectedTeams, matchHistory, handleCheckboxChange }) => {
    return (
        <Grid data={teams}>
            <Column field="Name" title="Team" />
            <Column field="Rating" title="Rating" />
            <Column field="Rating" title="Rating" />
            <Column
                title="Select team"
                cell={(props) => (
                    <td>
                        <input
                            type="checkbox"
                            checked={selectedTeams[props.dataItem.Name]}
                            onChange={() => handleCheckboxChange(props.dataItem.Name)}
                        />
                    </td>
                )}
            />
            <Column
                title="Goals scored"
                cell={(props) => (
                    <td>
                        {goalsScored(props.dataItem.Name, matchHistory)}
                    </td>
                )}
            />
            <Column
                title="Goals missed"
                cell={(props) => (
                    <td>
                        {goalsMissed(props.dataItem.Name, matchHistory)}
                    </td>
                )}
            />
        </Grid>
    )
}

interface MainGridProps {
    selectedTeams: Record<string, boolean>;
    matchHistory: MatchDetails[];
    handleCheckboxChange: (teamName: string) => void
}