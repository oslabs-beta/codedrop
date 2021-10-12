import { v4 as uuidv4 } from 'uuid';
import initialData from '../dnd/initial-data';

const createNewProject = (router, updateProject, username) => {
  const initialLayout = initialData.layout;
  const projectId = uuidv4();
  const date = new Date();
  const currentDate = date.toDateString();

  updateProject({
    variables: {
      project: {
        layout: JSON.stringify(initialLayout),
        id: projectId,
        projectName: 'Project name',
        modified: currentDate,
        created: currentDate,
        user: {
          username,
        },
      },
    },
  });

  router.push(`/project/${projectId}`);
};

export default createNewProject;
