import { gql } from "@apollo/client";

export const PROJECT_MUTATION = gql `

mutation addProject($project: [AddProjectInput!]!) {
  addProject(input: $project, upsert: true) {
    project {
      layout
      projectName
      id
    }
  }
}
`