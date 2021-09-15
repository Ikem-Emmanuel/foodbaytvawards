export const RestApiRoutes = {
  login: 'auth/login',
  register: 'auth/register?_allow_anonymous=true',
  verify: 'auth/verify?_allow_anonymous=true',
  reverify: 'auth/resend-verification?_allow_anonymous=true',
  logout: 'auth/logout',
  forgotPassword: 'password/create',
  getCurrentUser: 'auth/get?_allow_anonymous=true',

  users: {
    list: 'admin', //GET
    show: 'admin/', //GET
    update: 'admin/', //PUT
    create: 'admin', //POST
    delete: 'admin/', //DELETE
  },

  role: {
    list: 'admin/roles', //GET
    show: 'admin/roles', //GET
    update: 'admin/roles', //GET
  },

  nomination: {
    applicaiton: 'form/nomination?_allow_anonymous=true', //GET
    confirmation: 'Confirm-nomination/find/?_allow_anonymous=true',
    list: '',
    shortlist: 'shortListBusiness',
  },
  awards: {
    list: 'listofawards?_allow_anonymous=true',
    create: 'award/category',
  },

  password: {
    initiateReset: "password/create?_allow_anonymous=true'", //POST
    confirmReset: "password/reset?_allow_anonymous=true'", //POST
    findToken: 'password/find/', //GET
  },
};
