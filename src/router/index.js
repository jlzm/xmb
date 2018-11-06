import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

let pathRedirect = '/addressBook'



export default new Router({
  routes: [
    {
      path: '/',
      redirect: pathRedirect
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/dashboard.vue'], resolve),
          meta: { title: '数据统计与分析', page: 'dashboard' , tags: true }
        },
        {
          path: '/marketClue',
          component: resolve => require(['../components/page/MarketClue/index.vue'], resolve),
          meta: { title: '销售线索', page: 'marketClue', tags: true },
        },
        {
          path: '/marketClueDetails',
          component: resolve => require(['../components/page/MarketClue/details.vue'], resolve),
          meta: { title: '销售线索详情', page: 'marketClue' }
        },
        {
          path: '/newMarket',
          component: resolve => require(['../components/page/MarketClue/new.vue'], resolve),
          meta: { title: '新建销售线索', page: 'marketClue' }
        },
        {
          path: '/bid',
          component: resolve => require(['../components/page/Bid/index.vue'], resolve),
          meta: { title: '招投标项目', page: 'bid', tags: true },
        },
        {
          path: '/bidDetails',
          component: resolve => require(['../components/page/Bid/details.vue'], resolve),
          meta: { title: '招投标项目详情', page: 'bid' }
        },
        {
          path: '/marketAnalyze',
          component: resolve => require(['../components/page/marketAnalyze/marketAnalyze.vue'], resolve),
          meta: { title: '销售分析', page: 'marketAnalyze', tags: true },
        },
        {
          path: '/project',
          component: resolve => require(['../components/page/Project/index.vue'], resolve),
          meta: { title: '项目管理', page: 'project', tags: true }
        },
        {
          path: '/projectDetails',
          component: resolve => require(['../components/page/Project/details.vue'], resolve),
          meta: { title: '项目详情', page: 'project', tags: true },
        },
        {
          path: '/financeFundsMore',
          component: resolve => require(['../components/page/Project/FinanceFundsMore.vue'], resolve),
          meta: {
            title: '财务资金明细',
            page: 'projectDetails'
          }
        },
        {
          path: '/outlayStatistics',
          component: resolve => require(['../components/page/Project/OutlayStatistics.vue'], resolve),
          meta: {
            title: '支出统计明细',
            page: 'projectDetails'
          }
        },
        {
          path: '/schedule',
          component: resolve => require(['../components/page/Schedule/index.vue'], resolve),
          meta: { title: '进度管理', page: 'schedule', tags: true }
        },
        {
          path: '/scheduleDetails',
          component: resolve => require(['../components/page/Schedule/details.vue'], resolve),
          meta: { title: '项目详情', page: 'schedule' }
        },
        {
          path: '/document',
          component: resolve => require(['../components/page/Document/index.vue'], resolve),
          meta: { title: '文档管理', page: 'document', tags: true }
        },
        {
          path: '/documentDetails',
          component: resolve => require(['../components/page/Document/details.vue'], resolve),
          meta: { title: '文档管理详情', page: 'document' }
        },
        {
          path: '/purchase',
          component: resolve => require(['../components/page/Purchase/index.vue'], resolve),
          meta: { title: '采购管理', page: 'purchase' , tags: true }
        },
        {
          path: '/purchaseDetails',
          component: resolve => require(['../components/page/Purchase/details.vue'], resolve),
          meta: { title: '采购管理详情', page: 'purchase' }
        },
        {
          path: '/purchaseNew',
          component: resolve => require(['../components/page/Purchase/new.vue'], resolve),
          meta: { title: '添加采购记录', page: 'purchase' }
        },
        {
          path: '/afterSale',
          component: resolve => require(['../components/page/AfterSale/index.vue'], resolve),
          meta: { title: '售后工单', page: 'afterSale',tags: true }
        },
        {
          path: '/newAfterSale',
          component: resolve => require(['../components/page/AfterSale/new.vue'], resolve),
          meta: { title: '新建售后工单', page: 'afterSale' }
        },
        {
          path: '/afterSaleDetails',
          component: resolve => require(['../components/page/AfterSale/details.vue'], resolve),
          meta: { title: '售后工单详情', page: 'afterSale' }
        },
        {
          path: '/finance',
          component: resolve => require(['../components/page/Finance/index.vue'], resolve),
          meta: { title: '财务分析', page: 'finance', tags: true }
        },
        {
          path: '/fundMore',
          component: resolve => require(['../components/page/Finance/fundMore.vue'], resolve),
          meta: { title: '资金明细', page: 'finance' }
        },
        {
          path: '/financeDetails',
          component: resolve => require(['../components/page/Finance/details.vue'], resolve),
          meta: { title: '财务分析详情', page: 'finance' }
        },
        {
          path: '/returnedDetails',
          component: resolve => require(['../components/page/Finance/details1.vue'], resolve),
          meta: { title: '财务分析详情', page: 'finance' }
        },
        {
          path: '/backlog',
          component: resolve => require(['../components/page/Backlog/index.vue'], resolve),
          meta: { title: '我的待办', page: 'backlog', tags: true }
        },
        {
          path: '/emit',
          component: resolve => require(['../components/page/Backlog/emit.vue'], resolve),
          meta: { title: '我发出的', page: 'emit', tags: true }
        },
        {
          path: '/conference',
          component: resolve => require(['../components/page/Conference/index.vue'], resolve),
          meta: { title: '会议纪要', page: 'conference', tags: true }
        },
        {
          path: '/purchaseType',
          component: resolve => require(['../components/page/Administration/purchaseType.vue'], resolve),
          meta: { title: '采购类型', page: 'purchaseType', tags: true }
        },
        {
          path: '/folder',
          component: resolve => require(['../components/page/Administration/folder.vue'], resolve),
          meta: { title: '文件夹', page: 'folder', tags: true }
        },
        {
          path: '/expenditure',
          component: resolve => require(['../components/page/Administration/expenditure.vue'], resolve),
          meta: { title: '支出类别', page: 'expenditure', tags: true }
        },
        {
          path: '/sourceOfFunds',
          component: resolve => require(['../components/page/Administration/sourceOfFunds.vue'], resolve),
          meta: { title: '资金来源', page: 'sourceOfFunds', tags: true }
        },
        {
          path: '/meetingType',
          component: resolve => require(['../components/page/Administration/meetingType.vue'], resolve),
          meta: { title: '会议类型', page: 'meetingType', tags: true }
        },
        {
          path: '/customerManagement',
          component: resolve => require(['../components/page/Administration/customerManagement.vue'], resolve),
          meta: { title: '客户管理', page: 'customerManagement', tags: true }
        },
        {
          path: '/addressBook',
          component: resolve => require(['../components/page/System/addressBook.vue'], resolve),
          meta: { title: '企业通讯录', page: 'addressBook', tags: true }
        },
        {
          path: '/role',
          component: resolve => require(['../components/page/System/roleIndex.vue'], resolve),
          meta: { title: '角色管理', page: 'role', tags: true },
          redirect: '/role',
          children:[
            {
              path: '/role',
              component: resolve => require(['../components/page/System/role.vue'], resolve),
              meta: { title: '角色管理', page: 'role', tags: true }
            },
            {
              path: '/newRole',
              component: resolve => require(['../components/page/System/newRole.vue'], resolve),
              meta: { title: '新建角色', page: 'role' }
            },
            {
              path: '/compileRole',
              component: resolve => require(['../components/page/System/compileRole.vue'], resolve),
              meta: { title: '编辑角色', page: 'role' }
            },
          ]
        },
        {
          path: '/announcement',
          component: resolve => require(['../components/page/System/announcement.vue'], resolve),
          meta: { title: '企业通知公告', page: 'announcement', tags: true }
        },
        {
          path: '/account',
          component: resolve => require(['../components/page/System/account.vue'], resolve),
          meta: { title: '申请账号', page: 'account', tags: true }
        },

       
        
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/page/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})


