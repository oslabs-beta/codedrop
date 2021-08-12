import { gql } from "@apollo/client";

export const PROJECT_QUERY = gql `
  query getProject($id: ID!) {
    project(id: $id) {
      projectName
      layout
    }
  }
`