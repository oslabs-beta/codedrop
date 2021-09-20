/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      projects {
        id
        projectName
        user {
          id
          username
          createdAt
          updatedAt
        }
        layout
        components {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      projects {
        id
        projectName
        user {
          id
          username
          createdAt
          updatedAt
        }
        layout
        components {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      projects {
        id
        projectName
        user {
          id
          username
          createdAt
          updatedAt
        }
        layout
        components {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      projectName
      user {
        id
        username
        projects {
          id
          projectName
          layout
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      layout
      components {
        items {
          id
          projectID
          componentID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      projectName
      user {
        id
        username
        projects {
          id
          projectName
          layout
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      layout
      components {
        items {
          id
          projectID
          componentID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      projectName
      user {
        id
        username
        projects {
          id
          projectName
          layout
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      layout
      components {
        items {
          id
          projectID
          componentID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProjectComponents = /* GraphQL */ `
  mutation CreateProjectComponents(
    $input: CreateProjectComponentsInput!
    $condition: ModelProjectComponentsConditionInput
  ) {
    createProjectComponents(input: $input, condition: $condition) {
      id
      projectID
      componentID
      project {
        id
        projectName
        user {
          id
          username
          createdAt
          updatedAt
        }
        layout
        components {
          nextToken
        }
        createdAt
        updatedAt
      }
      component {
        id
        containerStyle
        type
        src
        style
        value
        labelStyle
        createdAt
        updatedAt
        projects {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProjectComponents = /* GraphQL */ `
  mutation UpdateProjectComponents(
    $input: UpdateProjectComponentsInput!
    $condition: ModelProjectComponentsConditionInput
  ) {
    updateProjectComponents(input: $input, condition: $condition) {
      id
      projectID
      componentID
      project {
        id
        projectName
        user {
          id
          username
          createdAt
          updatedAt
        }
        layout
        components {
          nextToken
        }
        createdAt
        updatedAt
      }
      component {
        id
        containerStyle
        type
        src
        style
        value
        labelStyle
        createdAt
        updatedAt
        projects {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProjectComponents = /* GraphQL */ `
  mutation DeleteProjectComponents(
    $input: DeleteProjectComponentsInput!
    $condition: ModelProjectComponentsConditionInput
  ) {
    deleteProjectComponents(input: $input, condition: $condition) {
      id
      projectID
      componentID
      project {
        id
        projectName
        user {
          id
          username
          createdAt
          updatedAt
        }
        layout
        components {
          nextToken
        }
        createdAt
        updatedAt
      }
      component {
        id
        containerStyle
        type
        src
        style
        value
        labelStyle
        createdAt
        updatedAt
        projects {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createComponent = /* GraphQL */ `
  mutation CreateComponent(
    $input: CreateComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    createComponent(input: $input, condition: $condition) {
      id
      containerStyle
      type
      src
      style
      value
      labelStyle
      createdAt
      updatedAt
      projects {
        items {
          id
          projectID
          componentID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateComponent = /* GraphQL */ `
  mutation UpdateComponent(
    $input: UpdateComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    updateComponent(input: $input, condition: $condition) {
      id
      containerStyle
      type
      src
      style
      value
      labelStyle
      createdAt
      updatedAt
      projects {
        items {
          id
          projectID
          componentID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteComponent = /* GraphQL */ `
  mutation DeleteComponent(
    $input: DeleteComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    deleteComponent(input: $input, condition: $condition) {
      id
      containerStyle
      type
      src
      style
      value
      labelStyle
      createdAt
      updatedAt
      projects {
        items {
          id
          projectID
          componentID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
