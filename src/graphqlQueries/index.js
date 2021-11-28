import { gql } from '@apollo/client';

export const USERS = gql`
  query users($offset:Int $limit:Int) {
    users(offset:$offset limit:$limit) {
      _id
      firstName
      lastName
      email
      password
      registeredAt
    }
  }
`;

export const NEW_USER = gql`
  mutation NewUser($firstName:String! $lastName:String! $email:String! $password:String! $confirmPassword:String!) {
    newUser(firstName:$firstName lastName:$lastName email:$email password:$password confirmPassword:$confirmPassword) {
      firstName
      lastName
      email
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id:Int! $firstName:String! $lastName:String! $email:String! $password:String! $confirmPassword:String!) {
    updateUser(_id:$id firstName:$firstName lastName:$lastName email:$email password:$password confirmPassword:$confirmPassword) {
      firstName
      lastName
      email
      password
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id:Int!) {
    deleteUser(_id:$id)
  }
`;

export const ADMINS = gql`
  query Admins {
    admins {
      _id
      name
      email
      password
      status
    }
  }
`;

export const NEW_ADMIN = gql`
  mutation NewAdmin($name:String! $email:String! $password:String! $confirmPassword:String!) {
    newAdmin(name:$name email:$email password:$password confirmPassword:$confirmPassword) {
      _id
      name
      email
      password
      status
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin($id:Int! $name:String! $email:String! $password:String! $confirmPassword:String! $status:String!) {
    updateAdmin(_id:$id name:$name email:$email password:$password confirmPassword:$confirmPassword status:$status) {
      _id
      name
      email
      password
      status
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation DeleteAdmin($id:Int!) {
    deleteAdmin(_id:$id)
  }
`;
