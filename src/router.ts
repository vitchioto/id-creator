import { createMemoryHistory, createRouter } from 'vue-router';

import IdGenerator from './pages/IdGenerator.vue';
import BirthCertificateGenerator from './pages/BirthCertificateGenerator.vue';

const routes = [
  { path: '/', component: IdGenerator },
  { path: '/birth-certificate', component: BirthCertificateGenerator },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
