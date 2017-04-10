module.exports = [
  {
    key: 'dashboard',
    name: '用户大盘数据',
    icon: 'laptop',
  },
  {
    key: 'users',
    name: '用户管理',
    icon: 'user',
  },
  {
    key: 'request',
    name: '数据库管理',
    icon: 'api',
  },
  {
    key: 'chart',
    name: '分类图表',
    icon: 'code-o',
    child: [
      {
        key: 'lineChart',
        name: 'LineChart',
        icon: 'line-chart',
      },
      {
        key: 'barChart',
        name: 'BarChart',
        icon: 'bar-chart',
      },
      {
        key: 'areaChart',
        name: 'AreaChart',
        icon: 'area-chart',
      },
    ],
  },
  {
    key: 'UIElement',
    name: 'UI Element',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'iconfont',
        name: 'IconFont',
        icon: 'heart-o',
      },
      {
        key: 'dataTable',
        name: 'DataTable',
        icon: 'database',
      },
      {
        key: 'dropOption',
        name: 'DropOption',
        icon: 'bars',
      },
      {
        key: 'search',
        name: 'Search',
        icon: 'search',
      },
      {
        key: 'editor',
        name: 'Editor',
        icon: 'edit',
      },
      {
        key: 'layer',
        name: 'layer (Function)',
        icon: 'credit-card',
      },
    ],
  },
  {
    key: 'navigation',
    name: 'Test Navigation',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: 'Test Navigation1',
      },
      {
        key: 'navigation2',
        name: 'Test Navigation2',
        child: [
          {
            key: 'navigation21',
            name: 'Test Navigation21',
          },
          {
            key: 'navigation22',
            name: 'Test Navigation22',
          },
        ],
      },
    ],
  },
]
