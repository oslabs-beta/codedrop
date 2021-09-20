/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
export const onCreateProjectComponents = /* GraphQL */ `
  subscription OnCreateProjectComponents {
    onCreateProjectComponents {
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
export const onUpdateProjectComponents = /* GraphQL */ `
  subscription OnUpdateProjectComponents {
    onUpdateProjectComponents {
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
export const onDeleteProjectComponents = /* GraphQL */ `
  subscription OnDeleteProjectComponents {
    onDeleteProjectComponents {
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
export const onCreateComponent = /* GraphQL */ `
  subscription OnCreateComponent {
    onCreateComponent {
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
export const onUpdateComponent = /* GraphQL */ `
  subscription OnUpdateComponent {
    onUpdateComponent {
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
export const onDeleteComponent = /* GraphQL */ `
  subscription OnDeleteComponent {
    onDeleteComponent {
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
