import { describe, it, expect , mock } from 'bun:test';
import { simulatePenalty, updateScore, addHistoryEntry, determineTheWinner, displayHistory } from '../src/functional-core/functions';
import { Penalty, Score, HistoryEntry  } from '../src/functional-core/functions';

describe('Penalty Shots', () => {
  it('should simulate a penalty kick', () => {
    const result = simulatePenalty();
    expect(['Scored', 'Missed']).toContain(result);
  });

  it('should update the score correctly', () => {
    const initialScore: Score = { teamA: 0, teamB: 0 };
    const penalty: Penalty = { team: 'Team A', result: 'Scored' };
    const newScore = updateScore(initialScore, penalty);
    expect(newScore).toEqual({ teamA: 1, teamB: 0 });
  });

  it('should add a history entry', () => {
    const initialHistory: HistoryEntry[] = [];
    const penalty: Penalty = { team: 'Team A', result: 'Scored' };
    const score: Score = { teamA: 1, teamB: 0 };
    const newHistory = addHistoryEntry(initialHistory, penalty, score);
    expect(newHistory).toHaveLength(1);
    expect(newHistory[0]).toEqual({ penalty, score });
  });

  it('should determine the winner', () => {
    const initialHistory: HistoryEntry[] = [];
    const initialScore: Score = { teamA: 0, teamB: 0 };
    const history = determineTheWinner(initialHistory, initialScore);
    const finalScore = history[history.length - 1].score;
    expect(finalScore.teamA).not.toEqual(finalScore.teamB);
  });

  it('should display the history correctly', () => {
    const history: HistoryEntry[] = [
      { penalty: { team: 'Team A', result: 'Scored' }, score: { teamA: 1, teamB: 0 } },
      { penalty: { team: 'Team B', result: 'Missed' }, score: { teamA: 1, teamB: 0 } },
      { penalty: { team: 'Team A', result: 'Scored' }, score: { teamA: 2, teamB: 0 } },
      { penalty: { team: 'Team B', result: 'Scored' }, score: { teamA: 2, teamB: 1 } },
    ];


    // Manually mocking console.log by capturing its calls in an array logCalls.
    const originalLog = console.log; 
    const logCalls: string[] = []; 
    console.log = (message: string) => logCalls.push(message);
    
    displayHistory(history); 

    // Restore the original console.log after capturing the calls.
    console.log = originalLog;

    expect(logCalls).toEqual([ 
      'Shot 1: Score: 1/0 (Team A: +1 | Team B: 0)', 
      'Shot 2: Score: 1/0 (Team A: 0 | Team B: 0)', 
      'Shot 3: Score: 2/0 (Team A: +1 | Team B: 0)', 
      'Shot 4: Score: 2/1 (Team A: 0 | Team B: +1)', 
      'The winner is: Team A (Score: 2/1)', 
    ]);
  });
});
  