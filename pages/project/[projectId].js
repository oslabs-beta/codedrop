import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { prettierCode } from '../../components/api/prettierCode';
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

const Container = ({ projectData }) => {
  const projectId = projectData.projectId;
  const classes = useStyles();
  const [previewMode, setPreviewMode] = useState(false);
  const [showEditor, setShowEditor] = useState(null);
  const [codeString, setCodeString] = useState(``);

  // This should be removed once we have the codegen builder created
  useEffect(() => {
    prettierCode(`import React from 'react'`, setCodeString);
  }, []);

  const {
    loading: loadingProject,
    error: loadingProjectError,
    data: projectDataGql,
  } = useQuery(PROJECT_QUERY, {
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "cache-and-network", //all subsequent calls,
    variables: { id: projectId },
  });

  const layout = JSON.parse(projectDataGql?.getProject?.layout || '[]');

  const {
    loading: loadingComponents,
    error: loadingComponentsError,
    data: componentsData,
  } = useQuery(COMPONENTS_QUERY, {
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "cache-and-network", //all subsequent calls,
  });

  const components = componentsData?.queryComponent || '[]';

  const [updateProject, { data, loading, error }] = useMutation(PROJECT_MUTATION);

  const [
    addComponent,
    { data: newComponentData, loading: newComponentLoading, error: newComponentError },
  ] = useMutation(ADD_COMPONENT, {
    refetchQueries: [COMPONENTS_QUERY, 'queryComponent'],
  });

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      console.log('dropZone, item', dropZone, item);
      const splitItemPath = item.path.split('-');
      const newLayout = handleRemoveItemFromLayout(layout, splitItemPath);
      updateProject({
        variables: {
          project: {
            layout: JSON.stringify(newLayout),
            id: projectId.toString(),
            projectName: 'test',
          },
        },
      }); 
    },
    [layout, projectId, updateProject]
  );

  const handleRemoveComponent = (item) => {
    const splitItemPath = item.path.split('-');
    const newLayout = handleRemoveItemFromLayout(layout, splitItemPath);
    updateProject({
      variables: {
        project: {
          layout: JSON.stringify(newLayout),
          id: projectId.toString(),
          projectName: 'test',
        },
      },
    }); 
  };

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
        const dbComponent = {
          variables: {
            component: newComponent,
          },
        };
        addComponent(dbComponent);
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        const newLayout = handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem);
        updateProject({
          variables: {
            project: {
              layout: JSON.stringify(newLayout),
              id: projectId.toString(),
              projectName: 'test',
            },
          },
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
          updateProject({
            variables: {
              project: {
                layout: JSON.stringify(newLayout),
                id: projectId.toString(),
                projectName: 'test',
              },
            },
          });
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        const newLayout = handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem);
        updateProject({
          variables: {
            project: {
              layout: JSON.stringify(newLayout),
              id: projectId.toString(),
              projectName: 'test',
            },
          },
        }); 
        return;
      }

      // 3. Move + Create
      const newLayout = handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem);
      updateProject({
        variables: {
          project: {
            layout: JSON.stringify(newLayout),
            id: projectId.toString(),
            projectName: 'test',
          },
        },
      }); 
    },
    [layout, addComponent, projectId, updateProject]
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

  if (loadingProject || loadingComponents) return 'Loading...';
  if (loadingProjectError || loadingComponentsError) {
    return `Error! ${loadingProjectError?.message || ``} ${loadingComponentsError?.message || ``}`;
  }

  return (
    <div className={classes.body}>
      <SidebarPanel
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        codeString={codeString}
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
          component={components.find(c => c.id === showEditor.id)}
          components={components}
          addComponent={addComponent}
          setShowEditor={setShowEditor}
          data={{ layout }}
          onDrop={handleDropToTrashBin}
        />
      )}
    </div>
  );
};

export async function getStaticPaths() {
  const projects = [];

  return {
    fallback: 'blocking',
    paths: projects.map((project) => ({
      params: {
        projectId: project.projectId,
      },
    })),
  };
}

export async function getStaticProps(context) {
  const projectId = context.params.projectId;
  return {
    props: {
      projectData: { projectId },
    },
  };
}

export default Container;
