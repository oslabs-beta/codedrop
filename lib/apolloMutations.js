import { gql } from '@apollo/client';

export const PROJECT_MUTATION = gql`
  mutation addProject($project: [AddProjectInput!]!) {
    addProject(input: $project, upsert: true) {
      project {
        layout
        projectName
        id
      }
    }
  }
`;

export const ADD_COMPONENT = gql`
  mutation addComponent($component: [AddComponentInput!]!) {
    addComponent(input: $component, upsert: true) {
      component {
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
