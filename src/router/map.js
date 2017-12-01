export default [{
  path: '/',
  name: 'Index',
  meta: {},
  component: resolve => require(['../views/index'], resolve)
}, {
  path: '*',
  name: '404',
  meta: {},
  component: resolve => require(['../views/errorPage/404'], resolve)
},{
	path: '/previewPage/:id',
  name: '预发布',
  meta: {},
  component: resolve => require(['../views/previewPage'], resolve)
}]
