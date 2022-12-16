import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import Antd from 'ant-design-vue'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'
import {
  DeploymentUnitOutlined,
  SearchOutlined,
  SwapOutlined,
  QuestionCircleOutlined,
  ClockCircleOutlined,
  NodeCollapseOutlined,
  FileTextOutlined,
  NodeIndexOutlined,
  MobileOutlined,
  MessageOutlined,
  SubnodeOutlined,
  SisternodeOutlined,
  AimOutlined
} from '@ant-design/icons-vue'

import 'ant-design-vue/dist/antd.css'
import '@ant-design-vue/pro-layout/dist/style.css'

const app = createApp(App)

app
  .component(DeploymentUnitOutlined.name, DeploymentUnitOutlined)
  .component(SearchOutlined.name, SearchOutlined)
  .component(SwapOutlined.name, SwapOutlined)
  .component(QuestionCircleOutlined.name, QuestionCircleOutlined)
  .component(ClockCircleOutlined.name, ClockCircleOutlined)
  .component(NodeCollapseOutlined.name, NodeCollapseOutlined)
  .component(FileTextOutlined.name, FileTextOutlined)
  .component(NodeIndexOutlined.name, NodeIndexOutlined)
  .component(MobileOutlined.name, MobileOutlined)
  .component(MessageOutlined.name, MessageOutlined)
  .component(SubnodeOutlined.name, SubnodeOutlined)
  .component(SisternodeOutlined.name, SisternodeOutlined)
  .component(AimOutlined.name, AimOutlined)

  .use(Antd).use(router).use(ProLayout).use(PageContainer).mount('#app');