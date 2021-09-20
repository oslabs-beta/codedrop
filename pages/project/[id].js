import React, { useEffect, useState, useCallback } from 'react';

import { API, withSSRContext } from 'aws-amplify';
import { listProjects } from '../../src/graphql/queries';
import { getProject } from '../../src/graphql/customQueries';

import { createComponent, updateProject, updateComponent, createProjectComponents } from '../../src/graphql/mutations';

import {
  onCreateComponent,
  onUpdateComponent,
  onUpdateProject,
} from '../../src/graphql/subscriptions';

import { makeStyles } from '@material-ui/styles';
import SidebarPanel from '../../components/SidebarPanel';
import EditorPanel from '../../components/EditorPanel';
import DropZone from '../../components/dnd/DropZone';
import TrashDropZone from '../../components/dnd/TrashDropZone';
import Row from '../../components/dnd/Row';
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout,
} from '../../components/dnd/helpers';

import { SIDEBAR_ITEM, COMPONENT, COLUMN } from '../../components/dnd/constants';

import shortid from 'shortid';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
});

async function handleUpdateComponent(updatedComponent) {
  const { projects, ...componentToUpdate } = updatedComponent;
  try {
    await API.graphql({
      query: updateComponent,
      variables: {
        input: componentToUpdate,
      },
    });
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

async function handleCreateComponent(newComponent, projectId) {
  try {
    await API.graphql({
      query: createComponent,
      variables: {
        input: newComponent,
      },
    });
    await API.graphql({
      query: createProjectComponents,
      variables: {
        input: {
          componentID: newComponent.id,
          projectID: projectId,
        },
      },
    });
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

async function handleUpdateProject(updatedProject) {
  try {
    await API.graphql({
      query: updateProject,
      variables: {
        input: updatedProject,
      },
    });
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

const Container = ({ initialProject, initialComponents = [] }) => {
  const classes = useStyles();
  const [previewMode, setPreviewMode] = useState(false);
  const [showEditor, setShowEditor] = useState(null);
  const [components, setComponents] = useState(initialComponents);
  const [project, setProject] = useState(initialProject);
  const projectId = initialProject.id;

  let layout = JSON.parse(project?.layout || '[]');

  useEffect(() => {
    subscribeComponentCreation();
    subscribeComponentUpdate();
    subscribeProjectUpdate();
  }, []);

  const subscribeComponentCreation = () => {
    API.graphql({ query: onCreateComponent }).subscribe({
      next: (componentData) => {
        const newComponent = componentData.value.data.onCreateComponent;
        setComponents([...components, newComponent]);
      },
    });
  };

  const subscribeProjectUpdate = () => {
    API.graphql({ query: onUpdateProject }).subscribe({
      next: (projectData) => setProject(projectData.value.data.onUpdateProject),
    });
  };

  const subscribeComponentUpdate = () => {
    API.graphql({ query: onUpdateComponent }).subscribe({
      next: (componentData) => {
        const updatedComponent = componentData.value.data.onUpdateComponent;
        const updatedComponents = components.map(c => {
          if (c.id === updatedComponent.id) return updatedComponent
          return c
        })
        setShowEditor(updatedComponent)
        setComponents(updatedComponents);
      },
    });
  };

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      console.log('dropZone, item', dropZone, item);
      const splitItemPath = item.path.split('-');
      const newLayout = handleRemoveItemFromLayout(layout, splitItemPath);
      handleUpdateProject({
        layout: JSON.stringify(newLayout),
        id: projectId.toString(),
        projectName: 'test',
      });
    },
    [layout, projectId]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log('dropZone', dropZone);
      console.log('item', item);

      const splitDropZonePath = dropZone.path.split('-');
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        handleCreateComponent(newComponent, projectId);
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        const newLayout = handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem);
        handleUpdateProject({
          layout: JSON.stringify(newLayout),
          id: projectId.toString(),
          projectName: 'test',
        });
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split('-');
      const pathToItem = splitItemPath.slice(0, -1).join('-');

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          const newLayout = handleMoveWithinParent(layout, splitDropZonePath, splitItemPath);
          handleUpdateProject({
            layout: JSON.stringify(newLayout),
            id: projectId.toString(),
            projectName: 'test',
          });
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        const newLayout = handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        );
        handleUpdateProject({
          layout: JSON.stringify(newLayout),
          id: projectId.toString(),
          projectName: 'test',
        });
        return;
      }

      // 3. Move + Create
      const newLayout = handleMoveToDifferentParent(
        layout,
        splitDropZonePath,
        splitItemPath,
        newItem
      );
      handleUpdateProject({
        layout: JSON.stringify(newLayout),
        id: projectId.toString(),
        projectName: 'test',
      });
    },
    [layout, projectId]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
        previewMode={previewMode}
        setShowEditor={setShowEditor}
      />
    );
  };

  return (
    <div className={classes.body}>
      <SidebarPanel
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        components={components}
        layout={layout}
      />
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>

        <TrashDropZone
          data={{
            layout,
          }}
          onDrop={handleDropToTrashBin}
        />
      </div>
      {showEditor && (
        <EditorPanel
          component={showEditor}
          handleUpdateComponent={handleUpdateComponent}
          setShowEditor={setShowEditor}
        />
      )}
    </div>
  );
};

// Get the project from the db
export async function getStaticPaths() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({ query: listProjects });
  const paths = data.listProjects.items.map((project) => ({
    params: { id: project.id },
  }));

  return {
    fallback: true,
    paths,
  };
}

// Get the project from the db
export async function getStaticProps({ params }) {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({
    query: getProject,
    variables: {
      id: params.id,
    },
  });
  const components = data.getProject.components.items.map(c => c.component)
  return {
    props: {
      initialProject: data.getProject,
      initialComponents: components,
    },
  };
}

export default Container;
