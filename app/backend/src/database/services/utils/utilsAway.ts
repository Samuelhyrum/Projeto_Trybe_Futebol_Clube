import Match from '../../models/MatchModel';

export const totalAwayTeamPoints = (sum: number, match: Match): number => {
  if (match.homeTeamGoals < match.awayTeamGoals) {
    return sum + 3;
  }
  if (match.homeTeamGoals === match.awayTeamGoals) {
    return sum + 1;
  }

  return sum;
};

export const totalAwayVictories = (vit: number, match: Match): number => {
  if (match.homeTeamGoals < match.awayTeamGoals) {
    return vit + 1;
  }
  return vit;
};

export const totalAwayDraws = (draw: number, match: Match): number => {
  if (match.homeTeamGoals === match.awayTeamGoals) {
    return draw + 1;
  }
  return draw;
};

export const totalAwayLosses = (lose: number, match: Match): number => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    return lose + 1;
  }
  return lose;
};

export const totalAwayGoals = (goals: number, match: Match): number =>
  goals + match.awayTeamGoals;

export const totalOwnAwayGoals = (goals: number, match: Match): number =>
  goals + match.homeTeamGoals;
