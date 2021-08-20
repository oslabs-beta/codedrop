import { gql } from '@apollo/client';

export const PROJECT_QUERY = gql`
  query getProject($id: String!) {
    getProject(id: $id) {
      id
      layout
      projectName
    }
  }
`;

export const COMPONENTS_QUERY = gql`
  query queryComponent {
    queryComponent {
      id
      type
      value
    }
  }
`;
