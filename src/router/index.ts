import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightView from '@/views/FlightView.vue'
import TableView from '@/views/TableView.vue'
import AirlineView from '@/views/AirlineView.vue'
import LoginView from '@/views/LoginView.vue'
import EditAirline from '@/views/EditAirline.vue'
import NewAirline from '@/views/NewAirline.vue'
import TicketView from '@/views/TicketView.vue'
import EditTicket from '@/views/EditTicket.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/flight/:id',
      name: 'flight',
      component: FlightView,
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
    },
    {
      path: '/airline',
      name: 'airline',
      component: AirlineView,
    },
    {
      path: '/airline/new',
      name: 'new-airline',
      component: NewAirline,
    },
    {
      path: '/airline/:id',
      name: 'edit-airline',
      component: EditAirline,
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView,
    },
    {
      path: '/ticket/:id',
      name: 'edit-ticket',
      component: EditTicket,
    }
  ]
})

export default router
