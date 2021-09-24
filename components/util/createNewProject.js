import { v4 as uuidv4 } from 'uuid';
import initialData  from '../dnd/initial-data';

const createNewProject = async (router, addUser, updateProject, username ) => {
  
  const initialLayout = initialData.layout;
  const projectId = uuidv4();
  
  const date = new Date();
  let currentDate = date.toDateString();    
 
  
  await addUser({
    variables: {
      username
    },
  }); 
    
  await updateProject({
    variables: {
      project: {
        layout: JSON.stringify(initialLayout),
        id: projectId.toString(),
        projectName: 'default',
        modified: currentDate,
        created: currentDate,
        user: {
          username: username
        }
      },
    },
    awaitRefetchQueries: true,
  }); 
  
  router.push(`/project/${projectId}`)
};

export default createNewProject