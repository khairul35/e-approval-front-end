import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "./main.less";

const app = createApp(App);

import {
  Layout,
  Menu,
  DatePicker,
  Avatar,
  Row,
  Col,
  Divider,
  Card,
  Input,
  InputNumber,
  Form,
  Button,
  List,
  Carousel,
  Modal,
  Table,
  Badge,
  Tabs,
  Select,
  Drawer,
  Dropdown,
  Affix,
  Tag,
  message,
  notification,
  Popover,
  Checkbox,
  Slider,
  Upload,
  Switch,
  Radio,
  Progress,
  Calendar,
  TimePicker,
  Timeline,
  Tooltip,
  Spin,
} from "ant-design-vue";

/** Installing Ant Design Vue Elements here -----------------------------*/
app.use(DatePicker);
app.use(Button);
app.use(Input);
app.use(InputNumber);
app.use(Layout);
app.use(Menu);
app.use(Avatar);
app.use(Row);
app.use(Col);
app.use(Divider);
app.use(Card);
app.use(Form);
app.use(List);
app.use(Carousel);
app.use(Modal);
app.use(Table);
app.use(Badge);
app.use(Tabs);
app.use(Select);
app.use(Drawer);
app.use(Dropdown);
app.use(Affix);
app.use(Tag);
app.use(Popover);
app.use(Checkbox);
app.use(Switch);
app.use(Radio);
app.use(Slider);
app.use(Upload);
app.use(Progress);
app.use(Calendar);
app.use(TimePicker);
app.use(Switch);
app.use(Timeline);
app.use(Tooltip);
app.use(Spin);
app.use(store).use(router).mount('#app')

app.config.globalProperties.$notification = notification;
app.config.globalProperties.$message = message;
app.config.globalProperties.$confirm = Modal.confirm;
