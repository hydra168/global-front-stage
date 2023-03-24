import { loadView_pc } from '@UTILS';
export const helpCentreChildren = [
  {
    path: 'about',
    name: 'about',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
  {
    path: 'problem',
    name: 'problem',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
  {
    path: 'features',
    name: 'features',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
  {
    path: 'terms',
    name: 'terms',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
  {
    path: 'disclaimer',
    name: 'disclaimer',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
  {
    path: 'policies',
    name: 'policies',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
  {
    path: 'rules',
    name: 'rules',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
  {
    path: 'agreement',
    name: 'agreement',
    component: loadView_pc('helpCommon', 'helpCentre'),
  },
];
/**
 * 幫助中心
 */
export default [
  {
    path: '/helpCentre',
    name: 'helpCentre',
    component: loadView_pc('index', 'helpCentre'),
    // meta: { requireAuth: true },
    redirect: { name: 'about' },
    children: helpCentreChildren,
  },
];
