import React, { useState } from 'react';

import {
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import { Logout, Menu } from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { logout } from '../../redux/accountActions';

import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Users from './Users';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Professors from './Professors';
import Institutes from './Institutes';
import ViewInstitute from './ViewInstitute';
import EditInstitue from './EditInstitute';
import AddInstitute from './AddInstitute';
import Blogs from './Blogs';
import AddAdmin from './AddAdmin';
import ViewUser from './ViewUser';
import EditProfessor from './EditProfessor';
import ViewProfessor from './ViewProfessor';
import AddProfessor from './AddProfessor';
import EditAdmin from './EditAdmin';
import Ads from './Ads';
import AllowedEmails from './AllowedEmails';
import Faqs from './Faqs';
import EditBlog from './EditBlog';
import AddBlog from './AddBlog';
import Admins from './Admins';
import TeamMembers from './TeamMembers';
import AddMember from './AddMember';
import EditMember from './EditMember';
import Reports from './Reports';
import ViewReport from './ViewReport';

export default function Admin() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const isMediumOrLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const { admin, account } = useSelector((state) => state);
  function adminLogout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    dispatch(logout());
  }
  if (!account.admin) return <Redirect push to="/adminlogin" />;
  return (
    <div className="flex w-full">
      {
        isMediumOrLargerScreen
          ? (
            <div
              id="sidebar"
              className={`h-screen ${open ? 'md:w-4/12 lg:w-3/12' : 'w-24'} border-r`}
              style={{ maxWidth: '256px' }}
            >
              <Sidebar isMediumOrLargerScreen setOpen={setOpen} open={open} />
            </div>
          )
          : (
            <Drawer
              id="lgDrawer"
              variant="temporary"
              open={open}
              classes={{ paper: 'w-4/6' }}
            >
              <Sidebar setOpen={setOpen} open={open} />
            </Drawer>
          )
      }
      <div id="cont" className="flex flex-col flex-grow w-full bg-gray-50">
        <div className={`flex items-center px-6 md:pl-6 md:pr-16 bg-white h-14 ${isMediumOrLargerScreen ? 'justify-end' : 'justify-between'}`}>
          { !isMediumOrLargerScreen
            && (
              <IconButton onClick={() => setOpen(!open)}>
                <Menu />
              </IconButton>
            )}
          <IconButton onClick={() => adminLogout()}><Logout /></IconButton>
        </div>
        <div className="flex flex-col p-6 overflow-auto md:py-6 md:pl-6 md:pr-10" style={{ maxHeight: 'calc(100vh - 56px)', minHeight: 'calc(100vh - 56px)' }}>
          {
            admin.currentTab.name === 'dashboard' && <Dashboard />
          }
          {
            admin.currentTab.name === 'users' && <Users />
          }
          {
            admin.currentTab.name === 'viewUser' && <ViewUser user={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'addUser' && <AddUser />
          }
          {
            admin.currentTab.name === 'editUser' && <EditUser user={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'professors' && <Professors />
          }
          {
            admin.currentTab.name === 'addProfessor' && <AddProfessor />
          }
          {
            admin.currentTab.name === 'viewProfessor' && <ViewProfessor professor={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'editProfessor' && <EditProfessor professor={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'institutes' && <Institutes />
          }
          {
            admin.currentTab.name === 'viewInstitute' && <ViewInstitute institute={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'editInstitute' && <EditInstitue institute={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'addInstitute' && <AddInstitute />
          }
          {
            admin.currentTab.name === 'blogs' && <Blogs />
          }
          {
            admin.currentTab.name === 'addBlog' && <AddBlog />
          }
          {
            admin.currentTab.name === 'editBlog' && <EditBlog blog={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'reports' && <Reports />
          }
          {
            admin.currentTab.name === 'viewReport' && <ViewReport report={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'admins' && <Admins />
          }
          {
            admin.currentTab.name === 'addAdmin' && <AddAdmin />
          }
          {
            admin.currentTab.name === 'editAdmin' && <EditAdmin admin={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'teamMembers' && <TeamMembers />
          }
          {
            admin.currentTab.name === 'addMember' && <AddMember />
          }
          {
            admin.currentTab.name === 'editMember' && <EditMember member={admin.currentTab.data} />
          }
          {
            admin.currentTab.name === 'ads' && <Ads />
          }
          {
            admin.currentTab.name === 'allowedMails' && <AllowedEmails />
          }
          {
            admin.currentTab.name === 'faqs' && <Faqs />
          }
        </div>
      </div>
    </div>
  );
}
