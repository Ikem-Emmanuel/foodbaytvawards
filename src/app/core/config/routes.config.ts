export const RestApiRoutes = {
  login: 'login',
  register: 'auth/register?_allow_anonymous=true',
  verify: 'auth/verify?_allow_anonymous=true',
  reverify: 'auth/resend-verification?_allow_anonymous=true',
  logout: 'logout',
  forgotPassword: 'password/create',
  getCurrentUser: 'auth/get?_allow_anonymous=true',

  users: {
    list: 'user', //GET
    show: 'admin/', //GET
    update: 'admin/', //PUT
    create: 'register', //POST
    delete: 'admin/', //DELETE
  },

  // role: {
  //   list: 'admin/roles', //GET
  //   show: 'admin/roles', //GET
  //   update: 'admin/roles', //GET
  // },

  nomination: {
    applicaiton: 'form/nomination?_allow_anonymous=true', //GET
    findToken: 'Confirm-nomination/find/?_allow_anonymous=true',
    list: 'business/list',
    shortlist: 'shortListBusiness',
    confirmation: 'confirm/',
  },
  business: {
    awards: 'business/award/',
    upload: 'form/upload?_allow_anonymous=true',
    shortlist: 'business/shortlist',
    shortlisted: 'all/shortlisted?_allow_anonymous=true',
    shortlistedList: 'shortlist/shorlisted',
    votelist: 'all/approvedCandidates?_allow_anonymous=true',
    approve: 'publish/business',
    vote: 'vote/',
  },
  locations: {
    list: 'all/locations?_allow_anonymous=true',
    upload: 'location/upload?_allow_anonymous=true',
  },
  awards: {
    data: 'award/list',
    create: 'award/category',
    awardlist: 'all/awards?_allow_anonymous=true',
  },

  password: {
    initiateReset: "password/create?_allow_anonymous=true'", //POST
    confirmReset: "password/reset?_allow_anonymous=true'", //POST
    findToken: 'password/find/', //GET
  },
};
