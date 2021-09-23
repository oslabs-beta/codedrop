import { useState } from 'react';
import { useRouter } from 'next/router';

import { PROJECTS_QUERY } from '../lib/apolloQueries';
import { useQuery } from '@apollo/client';

import EnhancedTableHead from '../components/util/Table/EnhancedTableHead';
import EnhancedTableToolbar from '../components/util/Table/EnhancedTableToolbar';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';

import { useSession, getSession } from 'next-auth/client';

// this is needed to receive and format the array of users returned the projectsQuery
const parseUser = (user) => {
  const userArray = [];
  user.forEach(userObj => {
    userArray.push(userObj.username)
  })
  //return comma separated usernames as string
  return userArray.join(', ');
}

//this is where data is mocked, id will be passed in here to give project access
function createData({
  id,
  projectName,
  shared = true,
  user,
  created,
  modified,
}) {
  return {
    id,
    name: projectName,
    shared,
    teamMembers: parseUser(user),
    updatedAt: modified,
    createdAt: created,
  };
}




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable({ session }) {
  const router = useRouter();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  //check if session exists, if so pull out username
  const username = ( session ? session.user.email : 'guest')

  //query to pull list of projects
  const { loading, error, data } = useQuery(PROJECTS_QUERY,
    
    {
      variables:{
        username
      },
      fetchPolicy: 'network-only', // Used for first execution
      nextFetchPolicy: 'cache-and-network', //all subsequent calls,

  });

  // projectsArray is an array where each element has an id, and a projectName
  const rows = data?.getUser.projects.map((row) => createData({ ...row })) || '[]';

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // loading and error catch for the gql query
  if (loading) return 'Loading...';
  if (error) {
    return `Error! ${error?.message || ``}`;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} username={username} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.name)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Link color="#333333" underline="hover" onClick={() => router.push(`/project/${row.id}`)}>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Switch checked={row.shared} />
                      </TableCell>
                      <TableCell align="left">{row.teamMembers}</TableCell>
                      <TableCell align="left">{row.updatedAt}</TableCell>
                      <TableCell align="left">{row.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export async function getServerSideProps(context) {
  
  const sessionUser = await getSession(context)
 
  return {
    props: {
      session: sessionUser
    },
  }
}