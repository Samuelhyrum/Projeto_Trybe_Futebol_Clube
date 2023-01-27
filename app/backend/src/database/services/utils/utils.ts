import Match from '../../models/MatchModel';

export const totalHomeTeamPoints = (sum: number, match: Match): number => {
  if (match.homeTeamGoals > match.awayTeamGoals) { return sum + 3; }
  if (match.homeTeamGoals === match.awayTeamGoals) { return sum + 1; }
  return sum;
};
export const totalAwayTeamPoints = (sum: number, match: Match): number => {
  if (match.homeTeamGoals < match.awayTeamGoals) {
    return sum + 3;
  }
  if (match.homeTeamGoals === match.awayTeamGoals) {
    return sum + 1;
  }

  return sum;
};

export const totalHomeVictories = (vit: number, match: Match): number => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    return vit + 1;
  }
  return vit;
};

export const totalHomeDraws = (draw: number, match: Match): number => {
  if (match.homeTeamGoals === match.awayTeamGoals) {
    return draw + 1;
  }
  return draw;
};

export const totalHomeLosses = (lose: number, match: Match): number => {
  if (match.homeTeamGoals < match.awayTeamGoals) {
    return lose + 1;
  }
  return lose;
};

export const totalHomeGoals = (goals: number, match: Match): number =>
  goals + match.homeTeamGoals;

export const totalOwnGoals = (goals: number, match: Match): number =>
  goals + match.awayTeamGoals;
