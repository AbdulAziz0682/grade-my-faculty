import { gql } from '@apollo/client';

export const COUNT_ALL = gql`
  query CountAll {
    allFaculties
    allUsers
    allInstitutes
    allRatings
  }
`;

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
  mutation UpdateUser($id:Int! $firstName:String! $lastName:String! $email:String! $password:String! $confirmPassword:String! $institute:Int $graduationYear:Int $savedFaculties:[Int]) {
    updateUser(_id:$id firstName:$firstName lastName:$lastName email:$email password:$password confirmPassword:$confirmPassword institute:$institute graduationYear:$graduationYear savedFaculties:$savedFaculties) {
      _id
      firstName
      lastName
      email
      ratings
      savedFaculties
      institute
      graduationYear
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

export const INSTITUTES = gql`
  query Institutes {
    institutes {
      _id
      name
      email
      courses
      faculties
      createdAt
    }
  }
`;

export const NEW_INSTITUTE = gql`
  mutation NewInstitute($name:String! $email:String! $courses:[String]!) {
    newInstitute(name:$name email:$email courses:$courses) {
      _id
      name
      email
      courses
    }
  }
`;

export const UPDATE_INSTITUTE = gql`
  mutation UpdateInstitute($id:Int! $name:String! $email:String! $courses:[String]!) {
    updateInstitute(_id:$id name:$name email:$email courses:$courses) {
      _id
      name
      email
      courses
    }
  }
`;

export const DELETE_INSTITUTE = gql`
  mutation DeleteInstitute($id:Int!) {
    deleteInstitute(_id:$id)
  }
`;

export const FACULTIES = gql`
  query Faculties {
    faculties {
      _id
      firstName
      lastName
      email
      institute
      department
      courses
    }
  }
`;

export const FACULTIES_AND_INSTITUTES = gql`
  query Faculties {
    faculties {
      _id
      firstName
      lastName
      email
      institute
      department
      courses
      attributes
      ratings
    }
    institutes {
      _id
      name
    }
  }
`;

export const FACULTIES_BY_INSTITUTE = gql`
  query FacultiesByInstitute($institute:Int!) {
    faculties(institute:$institute) {
      _id
      firstName
      lastName
      email
      institute
      department
      courses
      attributes
      ratings
    }
  }
`;

export const NEW_FACULTY = gql`
  mutation NewFaculty($firstName:String! $lastName:String! $email:String! $institute:Int! $department:String! $courses:[String!]!) {
    newFaculty(firstName:$firstName lastName:$lastName email:$email institute:$institute department:$department courses:$courses) {
      _id
      firstName
      lastName
      email
      institute
      department
      courses
    }
  }
`;

export const UPDATE_FACULTY = gql`
  mutation UpdateFaculty($id:Int! $firstName:String! $lastName:String! $email:String! $institute:Int! $department:String! $courses:[String!]!) {
    updateFaculty(_id:$id firstName:$firstName lastName:$lastName email:$email institute:$institute department:$department courses:$courses) {
      _id
      firstName
      lastName
      email
      institute
      department
      courses
    }
  }
`;

export const DELETE_FACULTY = gql`
  mutation DeleteFaculty($id:Int!) {
    deleteFaculty(_id:$id)
  }
`;

export const NEW_AD = gql`
  mutation NewAd($title:String! $locationId:String! $code:String!) {
    newAd(title:$title locationId:$locationId code:$code) {
      _id
      title
      locationId
      code
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($id:Int! $title:String! $locationId:String! $code:String! $status:String!) {
    updateAd(_id:$id title:$title locationId:$locationId code:$code status:$status) {
      _id
      title
      locationId
      code
    }
  }
`;

export const ADS = gql`
  query Ads {
    ads {
      _id
      title
      status
      locationId
      code
      status
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($id:Int!) {
    deleteAd(_id:$id)
  }
`;

export const RATINGS = gql`
  query Ratings($faculty:Int) {
    ratings(faculty:$faculty) {
      _id
      user
      faculty
      course
      levelOfDifficulty
      gradeOfUser
      isAttendanceMandatory
      overAllRating
      semester
      tags
      thoughts
      wouldTakeAgain
      createdAt
    }
  }
`;

export const USER_RATINGS = gql`
  query UserRatings($id:Int!) {
    ratings(user:$id) {
      _id
      user
      faculty
      course
      levelOfDifficulty
      gradeOfUser
      isAttendanceMandatory
      overAllRating
      semester
      tags
      thoughts
      wouldTakeAgain
      createdAt
    }
    faculties {
      _id
      firstName
      lastName
      department
      institute
    }
    institutes {
      _id
      name
    }
  }
`;

export const NEW_RATING = gql`
  mutation NewRating(
    $user:Int!
    $faculty:Int!
    $course:String!
    $levelOfDifficulty:Int!
    $gradeOfUser:String!
    $isAttendanceMandatory:Boolean!
    $overAllRating:Int!
    $semester:String!
    $tags:[String]!
    $thoughts:String!
    $wouldTakeAgain:Boolean!
  ) {
    newRating(
      user: $user
      faculty: $faculty
      course: $course
      levelOfDifficulty: $levelOfDifficulty
      gradeOfUser: $gradeOfUser
      isAttendanceMandatory: $isAttendanceMandatory
      overAllRating: $overAllRating
      semester: $semester
      tags: $tags
      thoughts: $thoughts
      wouldTakeAgain: $wouldTakeAgain
    ) {
      _id
    }
  }
`;

export const ALLOWED_EMAILS = gql`
  query AllowedEmails {
    allowedEmails {
      _id
      emailDomain
      isAllowed
      status
    }
  }
`;

export const UPDATE_ALLOWED_EMAIL = gql`
  mutation UpdateAllowedEmail($id:Int! $emailDomain:String! $isAllowed:Boolean! $status:String!) {
    updateAllowedEmail(_id:$id emailDomain:$emailDomain isAllowed:$isAllowed status:$status) {
      _id
      emailDomain
    }
  }
`;

export const NEW_ALLOWED_EMAIL = gql`
  mutation NewAllowedEmail($emailDomain:String! $isAllowed:Boolean!) {
    newAllowedEmail(emailDomain:$emailDomain isAllowed:$isAllowed) {
      _id
      emailDomain
      isAllowed
      status
    }
  }
`;

export const DELETE_EMAIL = gql`
  mutation DeleteEmail($id:Int!) {
    deleteEmail(_id:$id)
  }
`;

export const FAQS = gql`
  query Faqs {
    faqs {
      _id
      title
      category
      answer
    }
  }
`;

export const NEW_FAQ = gql`
  mutation NewFaq($title:String! $category:String! $answer:String!) {
    newFaq(title:$title category:$category answer:$answer) {
      _id
      title
      category
      answer
    }
  }
`;

export const UPDATE_FAQ = gql`
  mutation UpdateFaq($id:Int! $title:String! $category:String! $answer:String!) {
    updateFaq(_id:$id title:$title category:$category answer:$answer) {
      _id
      title
      category
      answer
    }
  }
`;

export const DELETE_FAQ = gql`
  mutation DeleteFaq($id:Int!) {
    deleteFaq(_id:$id)
  }
`;

export const ABOUT_US = gql`
  query AboutUs {
    aboutUs {
      ourStory
      whoWeAre
    }
  }
`;

export const UPDATE_ABOUT_US = gql`
  mutation UpdateAboutUs($ourStory:String $whoWeAre:String) {
    updateAboutUs(ourStory:$ourStory whoWeAre:$whoWeAre) {
      ourStory
      whoWeAre
    }
  }
`;

export const DELETE_RATING = gql`
  mutation DeleteRating($id:Int!) {
    deleteRating(_id:$id)
  }
`;
