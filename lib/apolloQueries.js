import { gql } from '@apollo/client';

export const PROJECT_QUERY = gql`
  query getProject($id: String!) {
    getProject(id: $id) {
      id
      layout
      projectName
      components {
        id
        containerStyle
        src
        style
        type
        value
      }
    }
  }
`;

export const COMPONENTS_QUERY = gql`
  subscription queryComponent {
    queryComponent {
      id
      containerStyle
      src
      style
      type
      value
    }
  }
`;

export const PROJECTS_QUERY = gql`
  query queryProject($username: String!) {
    getUser(username: $username) {
      projects {
        id
        projectName
      }
    }
  }
`;
