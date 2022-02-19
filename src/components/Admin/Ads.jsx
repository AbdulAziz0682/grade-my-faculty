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
// import { setCurrentTab } from '../../redux/adminActions';
import { addToast } from '../../redux/toastsActions';

import Search from '../../assets/Search.svg';

import AddAdDialog from './AddAdDialog';
import EditAdDialog from './EditAdDialog';

import {
  ADS,
  UPDATE_AD,
  DELETE_AD,
} from '../../graphqlQueries';

export default function Ads() {
  const [offset, setOffset] = React.useState(0);
  const [openNewAdDialog, setOpenNewAdDialog] = useState(false);
  const [updateAd, setUpdateAd] = useState({});
  const [openUpdateAdDialog, setOpenUpdateAdDialog] = useState(false);
  function doUpdateAd(ad) {
    setUpdateAd(() => ad);
    setOpenUpdateAdDialog(true);
  }
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, data } = useQuery(
    ADS,
    {
      fetchPolicy: 'cache-and-network',
      variables: { offset, limit: 10, title: searchValue },
    },
  );
  const [update] = useMutation(UPDATE_AD, { refetchQueries: [{ query: ADS }] });
  const [deleteAd] = useMutation(DELETE_AD, { refetchQueries: [{ query: ADS }] });
  function handleUpdate(updatedAd) {
    update({ variables: updatedAd })
      .then(() => dispatch(addToast({ message: 'Ad updated successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  function handleStatusChange(value, ad) {
    const variables = {
      id: Number(ad._id),
      status: value,
    };
    handleUpdate(variables);
  }
  function handleDelete(_id) {
    deleteAd({ variables: { id: Number(_id) } })
      .then(() => dispatch(addToast({ message: 'Ad deleted successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  function nextPage() {
    if (data && offset < data.allAds) {
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
      <AddAdDialog open={openNewAdDialog} handleClose={() => setOpenNewAdDialog(false)} />
      {
        openUpdateAdDialog
        && (
          <EditAdDialog
            open={openUpdateAdDialog}
            handleClose={() => setOpenUpdateAdDialog(false)}
            handleUpdate={(updatedAd) => handleUpdate(updatedAd)}
            ad={{ ...updateAd, _id: Number(updateAd._id) }}
          />
        )
      }
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Ads</Typography>
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
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => setOpenNewAdDialog(true)}>Add New Ad</Button>
      </div>
      <TableContainer className="w-full max-h-full bg-white mt-14 md:mt-0">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-gray-400">ID</TableCell>
              <TableCell className="text-lg font-semibold text-gray-400">Ad Title</TableCell>
              <TableCell className="font-semibold text-gray-400">Status</TableCell>
              <TableCell className="font-semibold text-center text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHead>
          {
            !loading && data && (
              <TableBody>
                {
                  data?.ads.map((ad) => (
                    <TableRow key={ad._id} className="hover:shadow-md">
                      <TableCell className="text-gray-400">{ad._id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black">{ad.title}</TableCell>
                      <TableCell className="text-gray-600">
                        <select value={ad.status} onChange={(event) => handleStatusChange(event.target.value, ad)} className="w-24 min-w-full p-2 bg-gray-200">
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-center">
                        <IconButton onClick={() => doUpdateAd(ad)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(ad._id)}>
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
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.allAds ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
