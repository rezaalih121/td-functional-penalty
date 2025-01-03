import { determineTheWinner, displayHistory, type HistoryEntry, type Score } from "../functional-core/functions";


const initialScore: Score = { teamA: 0, teamB: 0 };
const initialHistory: HistoryEntry[] = [];
const history = determineTheWinner(initialHistory, initialScore);
displayHistory(history);