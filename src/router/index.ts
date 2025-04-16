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
import NewTicket from '@/views/NewTicket.vue'
import QRCodeView from '@/views/QRCodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/flight/:id/book',
      name: 'new-ticket',
      component: NewTicket,
      meta: {
        title: 'New Ticket'
      }
    },
    {
      path: '/flight/:id',
      name: 'flight',
      component: FlightView,
      meta: {
        title: 'Details'
      }
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
      meta: {
        title: 'Table'
      }
    },
    {
      path: '/airline',
      name: 'airline',
      component: AirlineView,
      meta: {
        title: 'Airlines'
      }
    },
    {
      path: '/airline/new',
      name: 'new-airline',
      component: NewAirline,
      meta: {
        title: 'Create Airline'
      }
    },
    {
      path: '/airline/:id',
      name: 'edit-airline',
      component: EditAirline,
      meta: {
        title: 'Edit Airline'
      }
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView,
      meta: {
        title: 'Tickets'
      }
    },
    {
      path: '/ticket/:id/qrcode',
      name: 'qrcode',
      component: QRCodeView,
      meta: {
        title: 'QRCode'
      }
    },
    {
      path: '/ticket/:id',
      name: 'edit-ticket',
      component: EditTicket,
      meta: {
        title: 'Edit Ticket'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} :: SASE 2025`
  }
  next()
})

export default router
