import { gql } from '@apollo/client';

export const PROJECT_MUTATION = gql`
  mutation addProject($project: [AddProjectInput!]!) {
    addProject(input: $project, upsert: true) {
      project {
        layout
        projectName
        id
        created
        modified
        user {
          username
        }
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
        projects {
          id
          layout
          projectName
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!) {
    addUser(input: { username: $username }, upsert: true) {
      user {
        username
      }
    }
  }
`;

export const REMOVE_PROJECT_FROM_USER = gql`
  mutation updateUser($id: String!) {
    updateUser(
      input: { filter: { username: { eq: "guest" } }, remove: { projects: { id: $id } } }
    ) {
      numUids
    }
  }
`;

export const RENAME_PROJECT = gql`
  mutation updateProject($project: UpdateProjectInput!) {
    updateProject(input: $project) {
      project {
        id
        projectName
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation MyMutation($id: String!) {
    deleteProject(filter: { id: { eq: $id } }) {
      msg
    }
  }
`;
