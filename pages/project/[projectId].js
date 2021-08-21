import React, { useState, useCallback } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { gql, useQuery, useMutation } from '@apollo/client';
import EditorPanel from '../../components/EditorPanel';
import DropZone from '../../components/dnd/DropZone';
import TrashDropZone from '../../components/dnd/TrashDropZone';
import SideBarItem from '../../components/dnd/SideBarItem';
import Row from '../../components/dnd/Row';
import initialData from '../../components/dnd/initial-data';
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout,
} from '../../components/dnd/helpers';
import { initializeApollo } from '../../lib/apolloClient'

import {
  PROJECT_QUERY
} from '../../lib/apolloQueries'

import {
  PROJECT_MUTATION
} from '../../lib/apolloMutations'

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from '../../components/dnd/constants';

import shortid from 'shortid';

const Container = ({ projectId}) => {
  const initialLayout = initialData.layout; // on new project, mutate to add project with layout
  const initialComponents = initialData.components; // on new projected mutate to add components to project
  const [components, setComponents] = useState(initialComponents);
  const [previewMode, setPreviewMode] = useState(false);
  const [showEditor, setShowEditor] = useState(null);
  const [updateProject, { data: mutationData}] = useMutation(PROJECT_MUTATION,{
    awaitRefetchQueries: true,
    refetchQueries:[{query:PROJECT_QUERY, variables:{id:projectId}}], //refetches project layout using most recent variables
  });
  const {data: queryData, loading, error} = useQuery(PROJECT_QUERY,
    {
      variables:{
        id:projectId,
      },  
      fetchPolicy: "network-only",   // Used for first execution
      nextFetchPolicy: "cache-and-network", //all subsequent calls
    });
    let layout = JSON.parse(queryData.getProject.layout) 
  
  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      console.log('dropZone, item', dropZone, item);
      const splitItemPath = item.path.split('-');
      layout = handleRemoveItemFromLayout(layout, splitItemPath);
      updateProject({variables:{project:{layout: JSON.stringify(layout), id: projectId.toString(), projectName:'test'}}}) //// INITIAL MUTATION
    },
    [layout]
  );

  const handleRemoveComponent = (item) => {
    const splitItemPath = item.path.split('-');
    layout = handleRemoveItemFromLayout(layout, splitItemPath);
    updateProject({variables:{project:{layout: JSON.stringify(layout), id: projectId.toString(), projectName:'test'}}}) //// INITIAL MUTATION
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
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        layout = handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem);
        updateProject({variables:{project:{layout: JSON.stringify(layout), id: projectId.toString(), projectName:'test'}}}) //// INITIAL MUTATION
        console.log('state layout:', layout, 'gql layout:')
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split('-');
      const pathToItem = splitItemPath.slice(0, -1).join('-');

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          layout = handleMoveWithinParent(layout, splitDropZonePath, splitItemPath);
          updateProject({variables:{project:{layout: JSON.stringify(layout), id: projectId.toString(), projectName:'test'}}}) //// INITIAL MUTATION
          
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        layout = handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem);
        updateProject({variables:{project:{layout: JSON.stringify(layout), id: projectId.toString(), projectName:'test'}}}) //// INITIAL MUTATION
        return;
      }

      // 3. Move + Create
      layout = handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem);
      updateProject({variables:{project:{layout: JSON.stringify(layout), id: projectId.toString(), projectName:'test'}}}) //// INITIAL MUTATION
      
    },
    [layout, components]
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

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
        <FormControlLabel
          control={
            <Switch
              checked={previewMode}
              onChange={() => setPreviewMode(!previewMode)}
              name="previewMode"
              color="primary"
            />
          }
          label="Preview"
        />
      </div>
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
          component={components[showEditor.id]}
          components={components}
          setComponents={setComponents}
          setShowEditor={setShowEditor}
          data={{ layout }}
          onDrop={handleDropToTrashBin}
        />
      )}
    </div>
  );
};

export async function getServerSidePaths() {
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


export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();
  const projectId = context.params.projectId;

  const projectData = await apolloClient.query({
    query:PROJECT_QUERY,
    variables: {
      id:projectId
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      projectLayout: JSON.parse(projectData.data.getProject.layout),
      projectId,

    },
    
  };
};

export default Container;
