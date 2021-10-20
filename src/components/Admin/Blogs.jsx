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
} from '@mui/material';

import {
  ChevronLeft,
  ChevronRight,
  DeleteForever,
  Visibility,
} from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

export default function Blogs() {
  const { admin: { blogs } } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-full gap-9">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Posts</Typography>
        <div className="flex-grow" />
        <TextField
          variant="outlined"
          size="small"
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
          <TableBody>
            {
              blogs.map((blog) => (
                <TableRow key={blog.id} className="hover:shadow-md">
                  <TableCell className="text-gray-400">{blog.id}</TableCell>
                  <TableCell className="text-lg font-semibold text-black">{blog.title}</TableCell>
                  <TableCell className="text-gray-400">{blog.register}</TableCell>
                  <TableCell className="text-center">
                    <IconButton onClick={() => dispatch(setCurrentTab({ name: 'editBlog', data: { title: 'blog', tags: ['t1', 't2'], content: 'contetn' } }))}><Visibility /></IconButton>
                    <IconButton><DeleteForever /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end w-full gap-12 mt-16">
        <IconButton className="bg-gray-400 rounded-none shadow-lg">
          <ChevronLeft className="w-10 h-10" htmlColor="white" />
        </IconButton>
        <IconButton className="rounded-none shadow-lg bg-primary">
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
