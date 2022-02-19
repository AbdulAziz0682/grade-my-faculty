import { gql } from '@apollo/client';

export const COUNT_ALL = gql`
  query CountAll {
    allFaculties
    allUsers
    allInstitutes
    allRatings
    allMembers
  }
`;

export const ADMIN_USERS = gql`
  query Users($firstName:String $offset:Int $limit:Int) {
    users(firstName:$firstName offset:$offset limit:$limit) {
      _id
      firstName
      lastName
      email
      registeredAt
    }
    allUsers
  }
`;

export const ADMIN_USER_RATINGS = gql`
  query AdminUserRatings($user:Int!) {
    ratings(user:$user) {
      thoughts
      course
      createdAt
      faculty {
        firstName
        institute {
          name
        }
      }
    }
  }
`;

export const USERS = gql`
  query users($offset:Int $limit:Int) {
    users(offset:$offset limit:$limit) {
      _id
      firstName
      lastName
      email
      registeredAt
    }
    allUsers
  }
`;

export const NEW_USER = gql`
  mutation NewUser($firstName:String! $lastName:String! $email:String! $password:String! $confirmPassword:String!) {
    newUser(firstName:$firstName lastName:$lastName email:$email password:$password confirmPassword:$confirmPassword) {
      firstName
      lastName
      email
    }
  }
`;

export const ADMIN_UPDATE_USER = gql`
  mutation AdminUpdateUser($id:Int! $firstName:String $lastName:String $email:String $password:String $confirmPassword:String) {
    adminUpdateUser(_id:$id firstName:$firstName lastName:$lastName email:$email password:$password confirmPassword:$confirmPassword) {
      firstName
      lastName
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id:Int! $firstName:String! $lastName:String! $email:String! $password:String $confirmPassword:String $institute:Int $graduationYear:Int) {
    updateUser(_id:$id firstName:$firstName lastName:$lastName email:$email password:$password confirmPassword:$confirmPassword institute:$institute graduationYear:$graduationYear) {
      _id
      firstName
      lastName
      email
      ratings
      savedFaculties
      institute
      graduationYear
    }
  }
`;

export const UPDATE_USER_EMAIL = gql`
  mutation UpdateUserEmail($id:Int! $email:String! $password:String!) {
    updateUserEmail(_id:$id email:$email password:$password)
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($id:Int! $oldPassword:String! $newPassword:String!) {
    updateUserPassword(_id:$id oldPassword:$oldPassword newPassword:$newPassword)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id:Int!) {
    deleteUser(_id:$id)
  }
`;

export const ADMINS = gql`
  query Admins($name:String $offset:Int $limit:Int) {
    admins(name:$name offset:$offset limit:$limit) {
      _id
      name
      email
      status
      facebookLink
      instagramLink
      twitterLink
    }
    allAdmins
  }
`;

export const NEW_ADMIN = gql`
  mutation NewAdmin($name:String! $email:String! $password:String! $confirmPassword:String! $facebookLink:String $instagramLink:String $twitterLink:String) {
    newAdmin(name:$name email:$email password:$password confirmPassword:$confirmPassword facebookLink:$facebookLink instagramLink:$instagramLink twitterLink:$twitterLink) {
      _id
      name
      email
      status
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin($id:Int! $name:String $email:String $password:String $newPassword:String $status:String $facebookLink:String $instagramLink:String $twitterLink:String) {
    updateAdmin(_id:$id name:$name email:$email password:$password newPassword:$newPassword status:$status facebookLink:$facebookLink instagramLink:$instagramLink twitterLink:$twitterLink) {
      _id
      name
      email
      status
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation DeleteAdmin($id:Int!) {
    deleteAdmin(_id:$id)
  }
`;

export const ADMIN_INSTITUTES = gql`
  query Institutes($name:String $offset:Int $limit:Int) {
    institutes(name:$name offset:$offset limit:$limit) {
      _id
      name
      email
      createdAt
      courses
    }
    allInstitutes
  }
`;

export const INSTITUTES = gql`
  query Institutes($offset:Int $limit:Int) {
    institutes(offset:$offset limit:$limit) {
      _id
      name
      email
      courses
      faculties
      createdAt
    }
    allInstitutes
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
  mutation UpdateInstitute($id:Int! $name:String $email:String $courses:[String]) {
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
  query Faculties($offset:Int $limit:Int) {
    faculties(offset:$offset limit:$limit) {
      _id
      firstName
      lastName
      email
      institute
      department
      courses
    }
    allFaculties
  }
`;

export const ADMIN_FACULTIES = gql`
  query AdminFaculties($firstName:String $offset:Int $limit:Int) {
    faculties(firstName:$firstName offset:$offset limit:$limit) {
      _id
      firstName
      lastName
      email
      courses
      department
      institute {
        _id
        name
        courses
      }
    }
    allFaculties
  }
`;

export const ADMIN_FACULTY_RATINGS = gql`
  query AdminFacultyRatings($faculty:Int $offset:Int $limit:Int) {
    ratings(faculty:$faculty offset:$offset limit:$limit) {
      _id
      thoughts
      course
      createdAt
      overAllRating # This is required in edit professor component
    }
    allRatings
  }
`;

export const ADMIN_INSTITUTE_FACULTIES = gql`
  query InstituteFaculties($institute:Int $firstName:String $offset:Int $limit:Int) {
    faculties(institute:$institute firstName:$firstName offset:$offset limit:$limit) {
      _id
      firstName
      lastName
      email
      institute {
        _id
        name
      }
      department
      courses
      attributes
    }
    allFaculties
  }
`;

export const FACULTIES_AND_INSTITUTES = gql`
  query Faculties($offset:Int $limit:Int) {
    faculties(offset:$offset limit:$limit) {
      _id
      firstName
      lastName
      email
      department
      courses
      attributes
    }
    allFaculties
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
      department
      courses
    }
  }
`;

export const UPDATE_FACULTY = gql`
  mutation UpdateFaculty($id:Int! $firstName:String $lastName:String $email:String $institute:Int $department:String $courses:[String]) {
    updateFaculty(_id:$id firstName:$firstName lastName:$lastName email:$email institute:$institute department:$department courses:$courses) {
      _id
      firstName
      lastName
      email
      institute {
        _id
        name
      }
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
  query Ads($offset:Int $limit:Int) {
    ads(offset:$offset limit:$limit) {
      _id
      title
      status
      locationId
      code
      status
    }
    allAds
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($id:Int!) {
    deleteAd(_id:$id)
  }
`;

export const DASHBOARD_RATINGS = gql`
  query Ratings($date:Date) {
    ratings(date:$date) {
      createdAt
    }
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
      likes
      disLikes
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
      likes
      disLikes
    }
    totalRatings: ratings {
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
      likes
      disLikes
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

export const ADD_LIKE = gql`
  mutation AddLike($user:Int! $rating:Int!) {
    addLike(user:$user rating:$rating)
  }
`;

export const ADD_DISLIKE = gql`
  mutation AddDisLike($user:Int! $rating:Int!) {
    addDisLike(user:$user rating:$rating)
  }
`;

export const ALLOWED_EMAILS = gql`
  query AllowedEmails($offset:Int $limit:Int) {
    allowedEmails(offset:$offset limit:$limit) {
      _id
      emailDomain
      isAllowed
      status
    }
    allAllowedEmails
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
  query Faqs($offset:Int $limit:Int) {
    faqs(offset:$offset limit:$limit) {
      _id
      title
      category
      answer
    }
    allFaqs
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
      ourMission
    }
  }
`;

export const UPDATE_ABOUT_US = gql`
  mutation UpdateAboutUs($ourStory:String $whoWeAre:String $ourMission:String) {
    updateAboutUs(ourStory:$ourStory whoWeAre:$whoWeAre ourMission:$ourMission) {
      ourStory
      whoWeAre
      ourMission
    }
  }
`;

export const DELETE_RATING = gql`
  mutation DeleteRating($id:Int!) {
    deleteRating(_id:$id)
  }
`;

export const BLOGS = gql`
  query Blogs($offset:Int $limit:Int) {
    blogs(offset:$offset limit:$limit) {
      _id
      title
      content
      createdAt
      writtenBy
      tags
    }
    allBlogs
  }
`;

export const BLOGS_AND_ADMINS_AND_ADS = gql`
  query BlogsAndAdmins($offset:Int $limit:Int) {
    blogs(offset:$offset limit:$limit) {
      _id
      title
      content
      createdAt
      writtenBy
      tags
    }
    allBlogs
    admins {
      _id
      name
      facebookLink
      instagramLink
      twitterLink
    }
    ads {
      _id
      code
      locationId
      status
    }
  }
`;

export const NEW_BLOG = gql`
  mutation NewBlog($title:String! $content:String! $writtenBy:Int! $tags:[String]) {
    newBlog(title:$title content:$content writtenBy:$writtenBy tags:$tags) {
      _id
      title
      content
      writtenBy
      tags
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id:Int! $title:String! $content:String! $tags:[String]) {
    updateBlog(_id:$id title:$title content:$content tags:$tags) {
      _id
      title
      content
      writtenBy
      tags
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id:Int!) {
    deleteBlog(_id:$id)
  }
`;

export const REPORTS = gql`
  query Reports($offset:Int $limit:Int) {
    reports(offset:$offset limit:$limit) {
      _id
      user
      rating
      summary
      details
    }
    allReports
  }
`;

export const NEW_REPORT = gql`
  mutation NewReport($user:Int! $rating:Int! $summary:String! $details:String!) {
    newReport(user:$user rating:$rating summary:$summary details:$details) {
      _id
    }
  }
`;

export const DELETE_REPORT = gql`
  mutation DeleteReport($id:Int!) {
    deleteReport(_id:$id)
  }
`;

export const SAVE_FACULTY = gql`
  mutation SaveFaculty($user:Int! $faculty:Int!) {
    saveFaculty(user:$user faculty:$faculty)
  }
`;

export const MEMBERS = gql`
  query Members($offset:Int $limit:Int) {
    members(offset:$offset limit:$limit) {
      _id
      image
      name
      role
      facebookLink
      instagramLink
      linkedinLink
    }
    allMembers
  }
`;

export const NEW_MEMBER = gql`
  mutation NewMember($image:String! $name:String! $role:String! $facebookLink:String! $instagramLink:String! $linkedinLink:String!) {
    newMember(
      image: $image
      name: $name
      role: $role
      facebookLink: $facebookLink
      instagramLink: $instagramLink
      linkedinLink: $linkedinLink
    ) {
      _id
      name
      role
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($id:Int! $image:String! $name:String! $role:String! $facebookLink:String! $instagramLink:String! $linkedinLink:String!) {
    updateMember(
      _id: $id
      image: $image
      name: $name
      role: $role
      facebookLink: $facebookLink
      instagramLink: $instagramLink
      linkedinLink: $linkedinLink
    ) {
      _id
      name
      role
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation DeleteMember($id:Int!) {
    deleteMember(_id:$id)
  }
`;
