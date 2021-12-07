/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  CircularProgress,
} from '@mui/material';

import {
  ChevronLeft,
  ChevronRight,
  DeleteForever,
  Visibility,
} from '@mui/icons-material';

import { useQuery, useMutation } from '@apollo/client';

import moment from 'moment';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';
import { addToast } from '../../redux/toastsActions';

import Search from '../../assets/Search.svg';

import {
  BLOGS, DELETE_BLOG,
} from '../../graphqlQueries';

export default function Blogs() {
  const dispatch = useDispatch();
  const [offset, setOffset] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, data } = useQuery(BLOGS, { fetchPolicy: 'cache-and-network', variables: { offset, limit: 10 } });
  const [deleteBlog] = useMutation(DELETE_BLOG, { refetchQueries: [{ query: BLOGS }] });
  function handleDelete(_id) {
    deleteBlog({ variables: { id: Number(_id) } })
      .then(() => dispatch(addToast({ message: 'Blog deleted successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  function nextPage() {
    if (data && offset < data.allBlogs) {
      setOffset((off) => off + 10);
    }
  }
  function prevPage() {
    if (data && offset > 0) {
      setOffset((off) => off - 10);
    }
  }
  return (
    <div className="flex flex-col w-full gap-9">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Posts</Typography>
        <div className="flex-grow" />
        <TextField
          variant="outlined"
          size="small"
          value={setSearchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Search} alt="search icon" className="h-9" />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'addBlog', data: null }))}>Add Post</Button>
      </div>
      <TableContainer className="w-full max-h-full bg-white mt-14 md:mt-0">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-gray-400">ID</TableCell>
              <TableCell className="text-lg font-semibold text-gray-400">Title</TableCell>
              <TableCell className="font-semibold text-gray-400">Register</TableCell>
              <TableCell className="font-semibold text-center text-gray-400">Action</TableCell>
            </TableRow>
          </TableHead>
          {
            !loading && data && (
              <TableBody>
                {
                  data?.blogs.filter(
                    (blg) => blg.title.toLowerCase().includes(searchValue),
                  ).map((blog) => (
                    <TableRow key={blog._id} className="hover:shadow-md">
                      <TableCell className="m-3 leading-9 text-gray-400">{blog._id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black">{blog.title}</TableCell>
                      <TableCell className="leading-9 text-gray-400">{moment().from(blog.registeredAt)}</TableCell>
                      <TableCell className="text-center">
                        <IconButton onClick={() => dispatch(setCurrentTab({ name: 'editBlog', data: blog }))}><Visibility /></IconButton>
                        <IconButton
                          onClick={() => handleDelete(blog._id)}
                        >
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            )
          }
          {
            loading && <div className="absolute inset-x-0 flex items-center justify-center"><CircularProgress /></div>
          }
        </Table>
      </TableContainer>
      <div className="flex justify-end w-full gap-12 mt-16">
        <IconButton className={`rounded-none shadow-lg ${(offset - 10) < 0 ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => prevPage()}>
          <ChevronLeft className="w-10 h-10" htmlColor="white" />
        </IconButton>
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.allBlogs ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
