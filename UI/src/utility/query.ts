import { gql } from '@apollo/client';

export const queryDiscoverData = gql`
  query {
    questions(first: 50) {
      questioner
      questionHash
      title
      description
      title
      imageUrl
      endTimestamp
      startTimestamp
      winnersAmount
      totalWinningAmount
    }
  }
`;

export const getSearchQuestion = (searchText: string | undefined) => {
  return gql`
      query {
        questionSearch(text: "${searchText}") {
            questioner
            id
            questionHash
            title
            description
            title
            imageUrl
            endTimestamp
            startTimestamp
            winnersAmount
            totalWinningAmount
          }
      }
    `;
};
