import React, { useState, useCallback } from 'react';

import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { API, DataStore, graphqlOperation, withSSRContext } from 'aws-amplify';
import { getProject, listComponents, listProjects } from '../../src/graphql/queries';
import { createComponent, updateProject } from '../../src/graphql/mutations';
import { onCreateComponent, onUpdateProject } from '../../src/graphql/subscriptions';

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

import { PROJECT_QUERY, COMPONENTS_QUERY } from '../../lib/apolloQueries';
import { PROJECT_MUTATION, ADD_COMPONENT } from '../../lib/apolloMutations';
import { SIDEBAR_ITEM, COMPONENT, COLUMN } from '../../components/dnd/constants';

import shortid from 'shortid';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
});

const componentCreationSubscription = API.graphql(graphqlOperation(onCreateComponent)).subscribe({
  next: ({ provider, value }) => console.log({ provider, value }),
  error: (error) => console.warn(error),
});

const projectUpdateSubscription = API.graphql(graphqlOperation(onUpdateProject)).subscribe({
  next: ({ provider, value }) => console.log({ provider, value }),
  error: (error) => console.warn(error),
});

async function handleCreateComponent(newComponent) {
  try {
    const { data } = await API.graphql({
      query: createComponent,
      variables: {
        input: newComponent,
      },
      refetchQueries: [{ query: listComponents }],
    });
    console.log('new component', data);
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

async function handleUpdateProject(updatedProject) {
  try {
    const { data } = await API.graphql({
      query: updateProject,
      variables: {
        input: updatedProject,
      },
      refetchQueries: [
        {
          query: getProject,
          variables: {
            id: updatedProject.id,
          },
        },
      ],
    });
    console.log('updated project', data);
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

const Container = ({ project, components = [] }) => {
  const projectId = project.id;
  const classes = useStyles();
  const [previewMode, setPreviewMode] = useState(false);
  const [showEditor, setShowEditor] = useState(null);

  let layout = JSON.parse(project?.layout || '[]');

  useEffect(() => {
    fetchPosts();
    async function fetchPosts() {
      const postData = await DataStore.query(Post);
      setPosts(postData);
    }
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts());
    return () => subscription.unsubscribe();
  }, []);

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
        handleCreateComponent(newComponent);
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
          component={components.find((c) => c.id === showEditor.id)}
          components={components}
          addComponent={handleCreateComponent}
          setShowEditor={setShowEditor}
          data={{ layout }}
          onDrop={handleDropToTrashBin}
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
  const components = await SSR.API.graphql({ query: listComponents });
  const { data } = await SSR.API.graphql({
    query: getProject,
    variables: {
      id: params.id,
    },
  });

  return {
    props: {
      project: data.getProject,
      components: components.data.listComponents.items,
    },
  };
}

export default Container;
