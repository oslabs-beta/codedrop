import { gql } from "@apollo/client";

export const PROJECT_QUERY = gql `
  query getProject($id: String!) {
    getProject(id: $id) {
      layout
      projectName
    }
}
`