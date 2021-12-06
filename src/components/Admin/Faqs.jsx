/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

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

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import Search from '../../assets/Search.svg';

import {
  FAQS,
  DELETE_FAQ,
} from '../../graphqlQueries';

import AddFaqDialog from './AddFaqDialog';
import EditFaqDialog from './EditFaqDialog';

export default function Faqs() {
  const dispatch = useDispatch();
  const [offset, setOffset] = React.useState(0);
  const [openNewFaqDialog, setOpenNewFaqDialog] = useState(false);
  const [updateFaq, setUpdateFaq] = useState({});
  const [openUpdateFaqDialog, setOpenUpdateFaqDialog] = useState(false);
  function doUpdateFaq(faq) {
    setUpdateFaq(faq);
    setOpenUpdateFaqDialog(true);
  }
  const { loading, data } = useQuery(FAQS, { fetchPolicy: 'cache-and-network', variables: { offset, limit: 10 } });
  const [deleteFaq] = useMutation(DELETE_FAQ, { refetchQueries: [{ query: FAQS }] });
  const [searchValue, setSearchValue] = React.useState('');
  function handleDelete(_id) {
    deleteFaq({ variables: { id: Number(_id) } })
      .then(() => dispatch(addToast({ message: 'Faq deleted successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  function nextPage() {
    if (data && offset < data.allFaqs) {
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
      <AddFaqDialog open={openNewFaqDialog} handleClose={() => setOpenNewFaqDialog(false)} />
      {
        openUpdateFaqDialog && (
          <EditFaqDialog
            open={openUpdateFaqDialog}
            handleClose={() => setOpenUpdateFaqDialog(false)}
            faq={updateFaq}
          />
        )
      }
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Faq&apos;s List</Typography>
        <div className="flex-grow" />
        <TextField
          variant="outlined"
          size="small"
          value={searchValue}
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
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => setOpenNewFaqDialog(true)}>Add New Faq</Button>
      </div>
      <TableContainer className="w-full max-h-full bg-white mt-14 md:mt-0">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-gray-400">ID</TableCell>
              <TableCell className="text-lg font-semibold text-gray-400">Faq Title</TableCell>
              <TableCell className="font-semibold text-gray-400">Category</TableCell>
              <TableCell className="font-semibold text-center text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHead>
          {
            !loading && data && (
              <TableBody>
                {
                  data?.faqs.filter(
                    (faq) => faq.title.toLowerCase().includes(searchValue),
                  ).map((faq) => (
                    <TableRow key={faq._id} className="hover:shadow-md">
                      <TableCell className="text-gray-400">{faq._id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black">{faq.title}</TableCell>
                      <TableCell className="text-gray-400">{faq.category}</TableCell>
                      <TableCell className="text-center">
                        <IconButton onClick={() => doUpdateFaq(faq)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(faq._id)}>
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
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.allFaqs ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
