import Router from 'vue-router';
import { store } from '../modules';
import pcRoutes from './pc';
import mobileRoutes from './mobile';
import { isMobile, IS_USERCENTRE_DIALOG, IS_HELPCENTRE_DIALOG, PC_SHOW_LOGIN_PAGE, MOBILE_SHOW_LOGIN_PAGE, IS_GUEST_LOGIN } from '../consts';

let TICK = 0;
export let router = null;
export const mergeRouter = ({ Vue, agentRoutes = {}, otherConfig = {} }) => {
  let routes = isMobile ? [...mobileRoutes] : [...pcRoutes];
  function defaultScrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
  function defaultBeforeEach(to, from, next) {
    async function returnMoney() {
      // const isAutoReturn = !Number(store.getters.config.no_autoReturn_mainWallet);
      const isAutoReturn = false; // 強制不主動轉回主錢包 > 錢留在遊戲錢包
      isAutoReturn && (await store.dispatch('POST_BALANCE'));
    }
    if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.getters.token || window.localStorage.getItem('token')) {
        returnMoney();
        if (IS_USERCENTRE_DIALOG && to.path.match(/userCentre/g)) {
          store.commit('SET_DIALOG_PAGE', to.path);
          next({ name: from.name });
        } else {
          next();
        }
      } else {
        store.commit('SET_LOGIN_REDIRECT', to);
        if (PC_SHOW_LOGIN_PAGE || MOBILE_SHOW_LOGIN_PAGE) {
          if (['iStart'].includes(to.name)) {
            if (to.params.code) {
              store.commit('SET_REFERRAL_CODE', to.params.code || '');
              next({ name: 'register' });
            }
          } else if (['asToken'].includes(to.name)) {
            store.dispatch('GET_LOGIN_BY_TOKEN', { token: to.params.token || '' });
          } else {
            next({ name: 'login' });
          }
        } else if (isMobile) {
          next({ name: 'login' });
        } else {
          store.commit('CLEAR_DIALOG_PAGE');
          store.commit('SET_GLOBAL_BOX', 'LoginBox');
        }
      }
    } else {
      if (store.getters.token || window.localStorage.getItem('token')) returnMoney();
      if (IS_HELPCENTRE_DIALOG && to.path.match(/helpCentre/g)) {
        store.commit('SET_DIALOG_PAGE', to.path);
        next({ name: from.name });
      } else {
        next();
      }
    }
    // store.commit('SET_APP_FLAG');
  }
  Vue.use(Router);
  const rootChildren = [
    {
      path: '/',
      component: () => import(/*webpackChunkName:'home'*/ `@/views/index.vue`),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import(/*webpackChunkName:'home'*/ `@/views/home.vue`),
          meta: {
            requireAuth: PC_SHOW_LOGIN_PAGE || MOBILE_SHOW_LOGIN_PAGE ? true : false,
          },
        },
        {
          path: '/reg/:code?',
          name: 'iStart',
          component: () => import(/*webpackChunkName:'home'*/ `@/views/home.vue`),
          meta: {
            requireAuth: PC_SHOW_LOGIN_PAGE || MOBILE_SHOW_LOGIN_PAGE ? true : false,
          },
        },
        {
          path: '/as/:token',
          name: 'asToken',
          component: () => import(/*webpackChunkName:'home'*/ `@/views/home.vue`),
          meta: {
            requireAuth: PC_SHOW_LOGIN_PAGE || MOBILE_SHOW_LOGIN_PAGE ? true : false,
          },
        },
        {
          path: '/guest',
          name: 'guest',
          component: () => import(/*webpackChunkName:'home'*/ `@/views/home.vue`),
          meta: {
            requireAuth: false,
          },
        },
        ...agentRoutes,
        ...routes,
      ],
    },
  ];
  if (PC_SHOW_LOGIN_PAGE) {
    rootChildren.push({
      path: '/login',
      name: 'login',
      component: () => import(/*webpackChunkName:'pc-login'*/ `@G/views/pc/login.vue`),
    });
    rootChildren.push({
      path: '/register',
      name: 'register',
      component: () => import(/*webpackChunkName:'pc-login'*/ `@G/views/pc/login.vue`),
    });
  }
  if (MOBILE_SHOW_LOGIN_PAGE) {
    rootChildren.push({
      path: '/login',
      name: 'login',
      component: () => import(/*webpackChunkName:'mobile-login'*/ `@G/views/mobile/login.vue`),
    });
    rootChildren.push({
      path: '/register',
      name: 'register',
      component: () => import(/*webpackChunkName:'mobile-login'*/ `@G/views/mobile/login.vue`),
    });
  }
  router = new Router({
    base: '/',
    routes: [
      {
        path: '/',
        component: () => import(/*webpackChunkName:'globalLayout'*/ `../views/globalLayout.vue`),
        children: rootChildren,
      },
      {
        path: '/error403',
        name: 'error403',
        component: () => import(/*webpackChunkName:'error-403'*/ `@VIEWS/errorPage/error403.vue`),
      },
      {
        path: '/error404',
        name: 'error404',
        component: () => import(/*webpackChunkName:'error-404'*/ `@VIEWS/errorPage/error404.vue`),
      },
      {
        path: '*',
        redirect: { name: 'home' },
        component: () => import(/*webpackChunkName:'home'*/ `@/views/home.vue`),
      },
    ],
    scrollBehavior: defaultScrollBehavior,
    ...otherConfig,
  });
  router.beforeEach(defaultBeforeEach);
  const originalPush = Router.prototype.push;
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
  };
  return router;
};
