// Defining types 
type Team = 'Team A' | 'Team B';
type PenaltyResult = 'Scored' | 'Missed';

interface Penalty {
  team: Team;
  result: PenaltyResult;
}

interface Score {
  teamA: number;
  teamB: number;
}

interface HistoryEntry {
  penalty: Penalty;
  score: Score;
}

// Function to simulate Penalty using random 
  const simulatePenalty = (): PenaltyResult => {
    return Math.random() > 0.7 ? 'Scored' : 'Missed';
  };

  // Update Function 
  const updateScore = (score: Score, penalty: Penalty): Score => {
    return {
      teamA: penalty.team === 'Team A' && penalty.result === 'Scored' ? score.teamA + 1 : score.teamA,
      teamB: penalty.team === 'Team B' && penalty.result === 'Scored' ? score.teamB + 1 : score.teamB,
    };
  };

  
  const addHistoryEntry = (history: HistoryEntry[], penalty: Penalty, score: Score): HistoryEntry[] => {
    const newEntry: HistoryEntry = { penalty, score };
    return [...history, newEntry];
  };

  const determineTheWinner = (history: HistoryEntry[], score: Score, round: number = 1): HistoryEntry[] => {
    if (round > 5 && score.teamA !== score.teamB) {
      return history;
    }
  
    const team: Team = round % 2 === 0 ? 'Team B' : 'Team A';
    const penalty: Penalty = { team, result: simulatePenalty() };
    const newScore = updateScore(score, penalty);
    const newHistory = addHistoryEntry(history, penalty, newScore);
  
    if (round >= 5 && newScore.teamA !== newScore.teamB) {
      return newHistory;
    }
  
    return determineTheWinner(newHistory, newScore, round + 1);
  };

  
  const displayHistory = (history: HistoryEntry[]): void => {
    let finalScore: Score = { teamA: 0, teamB: 0 };

    //using forEach
    history.forEach((entry, index) => {
       finalScore = entry.score; 
       //console.log(`Shot ${index + 1}: Score: ${entry.score.teamA}/${entry.score.teamB} (Team A: ${entry.penalty.team === 'Team A' ? (entry.penalty.result === 'Scored' ? '+1' : '0') : '0'} | Team B: ${entry.penalty.team === 'Team B' ? (entry.penalty.result === 'Scored' ? '+1' : '0') : '0'})`); 
      });

    // using map 
    history.map((entry, index) => {
        finalScore = entry.score;
        //console.log(`Shot ${index + 1}: Score: ${entry.score.teamA}/${entry.score.teamB} (Team A: ${entry.penalty.team === 'Team A' ? (entry.penalty.result === 'Scored' ? '+1' : '0') : '0'} | Team B: ${entry.penalty.team === 'Team B' ? (entry.penalty.result === 'Scored' ? '+1' : '0') : '0'})`);
      });

    // using reduce 
    finalScore = history.reduce((acc, entry, index) => {
        console.log(`Shot ${index + 1}: Score: ${entry.score.teamA}/${entry.score.teamB} (Team A: ${entry.penalty.team === 'Team A' ? (entry.penalty.result === 'Scored' ? '+1' : '0') : '0'} | Team B: ${entry.penalty.team === 'Team B' ? (entry.penalty.result === 'Scored' ? '+1' : '0') : '0'})`);
        return entry.score;
      }, { teamA: 0, teamB: 0 });

      const winner = finalScore.teamA > finalScore.teamB ? 'Team A' : 'Team B';
      console.log(`The winner is: ${winner} (Score: ${finalScore.teamA}/${finalScore.teamB})`);

  };
  
export {
    simulatePenalty,
    updateScore,
    addHistoryEntry,
    determineTheWinner,
    displayHistory
};    
export type {
        HistoryEntry,
        Score
    };

