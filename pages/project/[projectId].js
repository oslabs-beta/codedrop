import React, { useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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

import { PROJECT_QUERY } from '../../lib/apolloQueries';
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

const Container = ({ projectId }) => {
  const classes = useStyles();
  const [previewMode, setPreviewMode] = useState(false);
  const [showEditor, setShowEditor] = useState(null);
  const [project, setProject] = useState({ layout: [], projectName: '', components: [] });

  const {
    loading: loadingProject,
    error: loadingProjectError,
    data: projectDataGql,
  } = useQuery(PROJECT_QUERY, {
    fetchPolicy: 'network-only', // Used for first execution to ensure local data up to date with server
    variables: { id: projectId },
  });

  const [updateProject, { data, loading, error }] = useMutation(PROJECT_MUTATION);
  const [addComponent] = useMutation(ADD_COMPONENT);

  useEffect(() => {
    if (loadingProject) return;
    const updatedProject = {
      ...projectDataGql.getProject,
      layout: JSON.parse(projectDataGql.getProject.layout),
    };
    setProject(updatedProject);
  }, [projectDataGql, loadingProject, data]);

  const { components, layout, projectName } = project;

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
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

  const handleDrop = useCallback(
    (dropZone, item) => {
      const splitDropZonePath = dropZone.path.split('-');
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponentId = shortid.generate();
        const newItem = {
          id: newComponentId,
          type: COMPONENT,
        };
        const newLayout = handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem);
        const newComponent = {
          variables: {
            component: {
              id: newComponentId,
              ...item.component,
              projects: {
                id: projectId,
                layout: JSON.stringify(newLayout),
                projectName,
              },
            },
          },
        };
        addComponent(newComponent);
        updateProject({
          variables: {
            project: {
              id: projectId.toString(),
              layout: JSON.stringify(newLayout),
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
        const newLayout = handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        );
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
      const newLayout = handleMoveToDifferentParent(
        layout,
        splitDropZonePath,
        splitItemPath,
        newItem
      );
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
    [layout, addComponent, projectId, updateProject, projectName]
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

  if (loadingProject) return 'Loading...';
  if (loadingProjectError) {
    return `Error! ${loadingProjectError?.message || ``}}`;
  }

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
          project={project}
          component={showEditor}
          addComponent={addComponent}
          setShowEditor={setShowEditor}
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
      projectId,
    },
  };
}

export default Container;
