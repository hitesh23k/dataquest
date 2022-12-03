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
  if (searchText?.length == 0) {
    return gql`
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
  } else {
    return gql`
    query {
      questions: questionSearch(text: "${searchText}") {
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
  }
};
