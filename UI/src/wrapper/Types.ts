export interface CreateQuestionMethodParams {
  title: string;
  token: string;
  description: string;
  imageUrl: string;
  startTimestamp: number;
  endTimestamp: number;
  totalWinningAmount: number;
  winnersAmount: number[];
}

export interface SubmitAnswerMethodParams {
  questionHash: string;
  answerLink: string;
  answerDescription: string;
  answerImageUrl: string;
}

export interface DeclareWinnerMethodParams {
  questionHash: string;
  winners: string[];
}

export interface FormattedAnswerAttributes {
  questionHash: string;
  linkToAnswer: string;
  description: string;
  imageUrl: string;
  answerer: string;
}

export interface FormattedQuestionDetailsAttributes {
  questioner: string;
  title: string;
  description: string;
  imageUrl: string;
  token: string;
  totalWinningAmount: string;
  startTimestamp: string;
  endTimestamp: string;
}
