export function aggregateWinRatios(
  matchData: MatchData[]
): MatchDataWithWinRate[] {
  let matchCount = 0;
  let firstPlayerWin = 0;
  let secondPlayerWin = 0;
  let draw = 0;

  const data = matchData.map((data) => {
    matchCount++;
    if (data.winner === data.firstPlayer) {
      firstPlayerWin++;
    } else if (data.winner === data.secondPlayer) {
      secondPlayerWin++;
    } else {
      draw++;
    }

    return {
      ...data,
      match_count: matchCount,
      first_player_win: firstPlayerWin,
      first_player_win_rate: (firstPlayerWin / matchCount) * 100,
      second_player_win: secondPlayerWin,
      second_player_win_rate: (secondPlayerWin / matchCount) * 100,
      draw: draw,
    };
  });
  return data;
}
