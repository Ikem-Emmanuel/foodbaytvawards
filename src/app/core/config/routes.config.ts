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

  lotCollection: {
    items: 'lot/item',
    lots: 'lot',
    export: 'lot/export/',
    printed: 'lot/mark-as-printed/',
    delete: 'lot/',
  },

  batchColloection: {
    batch: 'batch',
    deleteEdit: 'batch/',
    addPromo: 'batch/add-promo/',
    promotion: 'batch/add-promo',
  },

  productCollection: {
    product: 'product',
    updateEdit: 'product/',
  },
  promoCollection: {
    promoCreate: 'promo-type',
    promoShow: 'promo-type/',
  },
  password: {
    initiateReset: "password/create?_allow_anonymous=true'", //POST
    confirmReset: "password/reset?_allow_anonymous=true'", //POST
    findToken: 'password/find/', //GET
  },
  notification: {
    alert: {
      list: 'alerts', //POST
    },
  },
};
