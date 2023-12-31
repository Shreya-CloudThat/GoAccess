console.log('Inside Index first');
import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SimpleMenu from '../layouts/simple-menu/Main';
import TopMenu from '../layouts/top-menu/Main';
import About from '../pages/About';
import Admin from '../pages/Admin';
import Bookings from '../pages/Bookings';
import Events from '../pages/Events';
import Login from '../pages/Login';
import Monitors from '../pages/Monitor';
import Register from '../pages/Register';
import Venues from '../pages/Venues';
import Accordion from '../views/accordion/Main';
import Alert from '../views/alert/Main';
import BlogLayout1 from '../views/blog-layout-1/Main';
import BlogLayout2 from '../views/blog-layout-2/Main';
import BlogLayout3 from '../views/blog-layout-3/Main';
import Button from '../views/button/Main';
import Calendar from '../views/calendar/Main';
import ChangePassword from '../views/change-password/Main';
import Chart from '../views/chart/Main';
import Chat from '../views/chat/Main';
import CrudDataList from '../views/crud-data-list/Main';
import CrudForm from '../views/crud-form/Main';
import DashboardOverview1 from '../views/dashboard-overview-1/Main';
import DashboardOverview2 from '../views/dashboard-overview-2/Main';
import DashboardOverview3 from '../views/dashboard-overview-3/Main';
import DashboardOverview4 from '../views/dashboard-overview-4/Main';
import Datepicker from '../views/datepicker/Main';
import Dropdown from '../views/dropdown/Main';
import ErrorPage from '../views/error-page/Main';
import FaqLayout1 from '../views/faq-layout-1/Main';
import FaqLayout2 from '../views/faq-layout-2/Main';
import FaqLayout3 from '../views/faq-layout-3/Main';
import FileManager from '../views/file-manager/Main';
import FileUpload from '../views/file-upload/Main';
import Icon from '../views/icon/Main';
import ImageZoom from '../views/image-zoom/Main';
import Inbox from '../views/inbox/Main';
import InvoiceLayout1 from '../views/invoice-layout-1/Main';
import InvoiceLayout2 from '../views/invoice-layout-2/Main';
import LoadingIcon from '../views/loading-icon/Main';
import Modal from '../views/modal/Main';
import Notification from '../views/notification/Main';
import PointOfSale from '../views/point-of-sale/Main';
import Post from '../views/post/Main';
import PricingLayout1 from '../views/pricing-layout-1/Main';
import PricingLayout2 from '../views/pricing-layout-2/Main';
import ProfileOverview1 from '../views/profile-overview-1/Main';
import ProfileOverview2 from '../views/profile-overview-2/Main';
import ProfileOverview3 from '../views/profile-overview-3/Main';
import ProgressBar from '../views/progress-bar/Main';
import RegularForm from '../views/regular-form/Main';
import RegularTable from '../views/regular-table/Main';
import SlideOver from '../views/slide-over/Main';
import Slider from '../views/slider/Main';
import Tab from '../views/tab/Main';
import Tabulator from '../views/tabulator/Main';
import TomSelect from '../views/tom-select/Main';
import Tooltip from '../views/tooltip/Main';
import Typography from '../views/typography/Main';
import UpdateProfile from '../views/update-profile/Main';
import UsersLayout1 from '../views/users-layout-1/Main';
import UsersLayout2 from '../views/users-layout-2/Main';
import UsersLayout3 from '../views/users-layout-3/Main';
import Validation from '../views/validation/Main';
import WizardLayout1 from '../views/wizard-layout-1/Main';
import WizardLayout2 from '../views/wizard-layout-2/Main';
import WizardLayout3 from '../views/wizard-layout-3/Main';
import WysiwygEditor from '../views/wysiwyg-editor/Main';
import UpdateVenue from '../pages/AdminVenue/UpdateVenue';
import AdminVenue from '../pages/AdminVenue/AdminVenue';
import BookTicktes from '../pages/BookTicktes';
import Checkout from '../pages/Checkout';
import CheckoutfromVenue from '../pages/CheckoutfromVenue';

function Router() {
  console.log('Inside Index');
  
  function Protected({ isAuth, children }) {
    console.log('Inside Protected');
    if (!isAuth) {
      return <Navigate to="/login"  replace/>;
    }
    return children;
  }
  
  const { user } = useAuth();
  console.log('Inside Index -after userAuth',user);

  const routes = [
    {
      path: '/',
      element: (
        <Protected isAuth={!!user}>
        <TopMenu />
         </Protected>
      ),
      children: [
        {
          path: '/',
          element: <About />,
        },
        {
          path: 'dashboard-overview-2',
          element: <DashboardOverview2 />,
        },
        {
          path: 'dashboard-overview-3',
          element: <DashboardOverview3 />,
        },
        {
          path: 'dashboard-overview-4',
          element: <DashboardOverview1 />,
        },
        {
          path: 'about',
          element: (
            <Protected isAuth={!!user}>
              <About />
            </Protected>
          ),
        },
        {
          path: 'events',
          element: (
            <Protected isAuth={!!user}>
              <Events />
            </Protected>
          ),
        },
        {
          path: 'venues',
          element: (
            <Protected isAuth={!!user}>
              <Venues />
            </Protected>
          ),
        },
        {
          path: 'bookings',
          element: (
            <Protected isAuth={!!user}>
              <Bookings />
            </Protected>
          ),
        },
        // {
        //   path: 'monitors',
        //   element: (
        //     <Protected isAuth={!!user}>
        //       <Monitors />
        //     </Protected>
        //   ),
        // },
        {
          path: 'admin',
          element: (
            <Protected isAuth={!!user}>
              <Admin />
            </Protected>
          ),
        },
        {
          path: 'updatevenue',
          element: (
            <Protected isAuth={!!user}>
              <UpdateVenue />
            </Protected>
          ),
        },
        {
          path: 'adminvenue',
          element: (
            <Protected isAuth={!!user}>
              <AdminVenue />
            </Protected>
          ),
        },
        {
          path: 'booking-ticket',
          element: (
            <Protected isAuth={!!user}>
              <BookTicktes />
            </Protected>
          ),
        },
        {
          path: 'checkout',
          element: (
            <Protected isAuth={!!user}>
              <Checkout />
            </Protected>
          ),
        },
        {
          path: 'checkout-venue',
          element: (
            <Protected isAuth={!!user}>
              <CheckoutfromVenue />
            </Protected>
          ),
        },
        {
          path: 'inbox',
          element: <Inbox />,
        },
        {
          path: 'file-manager',
          element: <FileManager />,
        },
        {
          path: 'point-of-sale',
          element: <PointOfSale />,
        },
        {
          path: 'chat',
          element: <Chat />,
        },
        {
          path: 'post',
          element: <Post />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'crud-data-list',
          element: <CrudDataList />,
        },
        {
          path: 'crud-form',
          element: <CrudForm />,
        },
        {
          path: 'users-layout-1',
          element: <UsersLayout1 />,
        },
        {
          path: 'users-layout-2',
          element: <UsersLayout2 />,
        },
        {
          path: 'users-layout-3',
          element: <UsersLayout3 />,
        },
        {
          path: 'profile-overview-1',
          element: <ProfileOverview1 />,
        },
        {
          path: 'profile-overview-2',
          element: <ProfileOverview2 />,
        },
        {
          path: 'profile-overview-3',
          element: <ProfileOverview3 />,
        },
        {
          path: 'wizard-layout-1',
          element: <WizardLayout1 />,
        },
        {
          path: 'wizard-layout-2',
          element: <WizardLayout2 />,
        },
        {
          path: 'wizard-layout-3',
          element: <WizardLayout3 />,
        },
        {
          path: 'blog-layout-1',
          element: <BlogLayout1 />,
        },
        {
          path: 'blog-layout-2',
          element: <BlogLayout2 />,
        },
        {
          path: 'blog-layout-3',
          element: <BlogLayout3 />,
        },
        {
          path: 'pricing-layout-1',
          element: <PricingLayout1 />,
        },
        {
          path: 'pricing-layout-2',
          element: <PricingLayout2 />,
        },
        {
          path: 'invoice-layout-1',
          element: <InvoiceLayout1 />,
        },
        {
          path: 'invoice-layout-2',
          element: <InvoiceLayout2 />,
        },
        {
          path: 'faq-layout-1',
          element: <FaqLayout1 />,
        },
        {
          path: 'faq-layout-2',
          element: <FaqLayout2 />,
        },
        {
          path: 'faq-layout-3',
          element: <FaqLayout3 />,
        },
        {
          path: 'update-profile',
          element: <UpdateProfile />,
        },
        {
          path: 'change-password',
          element: <ChangePassword />,
        },
        {
          path: 'regular-table',
          element: <RegularTable />,
        },
        {
          path: 'tabulator',
          element: <Tabulator />,
        },
        {
          path: 'modal',
          element: <Modal />,
        },
        {
          path: 'slide-over',
          element: <SlideOver />,
        },
        {
          path: 'notification',
          element: <Notification />,
        },
        {
          path: 'tab',
          element: <Tab />,
        },
        {
          path: 'accordion',
          element: <Accordion />,
        },
        {
          path: 'button',
          element: <Button />,
        },
        {
          path: 'alert',
          element: <Alert />,
        },
        {
          path: 'progress-bar',
          element: <ProgressBar />,
        },
        {
          path: 'tooltip',
          element: <Tooltip />,
        },
        {
          path: 'dropdown',
          element: <Dropdown />,
        },
        {
          path: 'typography',
          element: <Typography />,
        },
        {
          path: 'icon',
          element: <Icon />,
        },
        {
          path: 'loading-icon',
          element: <LoadingIcon />,
        },
        {
          path: 'regular-form',
          element: <RegularForm />,
        },
        {
          path: 'datepicker',
          element: <Datepicker />,
        },
        {
          path: 'tom-select',
          element: <TomSelect />,
        },
        {
          path: 'file-upload',
          element: <FileUpload />,
        },
        {
          path: 'wysiwyg-editor',
          element: <WysiwygEditor />,
        },
        {
          path: 'validation',
          element: <Validation />,
        },
        {
          path: 'chart',
          element: <Chart />,
        },
        {
          path: 'slider',
          element: <Slider />,
        },
        {
          path: 'image-zoom',
          element: <ImageZoom />,
        },
      ],
    },
    {
      path: '/simple-menu',
      element: <SimpleMenu />,
      children: [
        {
          path: 'dashboard-overview-1',
          element: <DashboardOverview1 />,
        },
        {
          path: 'dashboard-overview-2',
          element: <DashboardOverview2 />,
        },
        {
          path: 'dashboard-overview-3',
          element: <DashboardOverview3 />,
        },
        {
          path: 'dashboard-overview-4',
          element: <DashboardOverview4 />,
        },
        {
          path: 'inbox',
          element: <Inbox />,
        },
        {
          path: 'file-manager',
          element: <FileManager />,
        },
        {
          path: 'point-of-sale',
          element: <PointOfSale />,
        },
        {
          path: 'chat',
          element: <Chat />,
        },
        {
          path: 'post',
          element: <Post />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'crud-data-list',
          element: <CrudDataList />,
        },
        {
          path: 'crud-form',
          element: <CrudForm />,
        },
        {
          path: 'users-layout-1',
          element: <UsersLayout1 />,
        },
        {
          path: 'users-layout-2',
          element: <UsersLayout2 />,
        },
        {
          path: 'users-layout-3',
          element: <UsersLayout3 />,
        },
        {
          path: 'profile-overview-1',
          element: <ProfileOverview1 />,
        },
        {
          path: 'profile-overview-2',
          element: <ProfileOverview2 />,
        },
        {
          path: 'profile-overview-3',
          element: <ProfileOverview3 />,
        },
        {
          path: 'wizard-layout-1',
          element: <WizardLayout1 />,
        },
        {
          path: 'wizard-layout-2',
          element: <WizardLayout2 />,
        },
        {
          path: 'wizard-layout-3',
          element: <WizardLayout3 />,
        },
        {
          path: 'blog-layout-1',
          element: <BlogLayout1 />,
        },
        {
          path: 'blog-layout-2',
          element: <BlogLayout2 />,
        },
        {
          path: 'blog-layout-3',
          element: <BlogLayout3 />,
        },
        {
          path: 'pricing-layout-1',
          element: <PricingLayout1 />,
        },
        {
          path: 'pricing-layout-2',
          element: <PricingLayout2 />,
        },
        {
          path: 'invoice-layout-1',
          element: <InvoiceLayout1 />,
        },
        {
          path: 'invoice-layout-2',
          element: <InvoiceLayout2 />,
        },
        {
          path: 'faq-layout-1',
          element: <FaqLayout1 />,
        },
        {
          path: 'faq-layout-2',
          element: <FaqLayout2 />,
        },
        {
          path: 'faq-layout-3',
          element: <FaqLayout3 />,
        },
        {
          path: 'update-profile',
          element: <UpdateProfile />,
        },
        {
          path: 'change-password',
          element: <ChangePassword />,
        },
        {
          path: 'regular-table',
          element: <RegularTable />,
        },
        {
          path: 'tabulator',
          element: <Tabulator />,
        },
        {
          path: 'modal',
          element: <Modal />,
        },
        {
          path: 'slide-over',
          element: <SlideOver />,
        },
        {
          path: 'notification',
          element: <Notification />,
        },
        {
          path: 'tab',
          element: <Tab />,
        },
        {
          path: 'accordion',
          element: <Accordion />,
        },
        {
          path: 'button',
          element: <Button />,
        },
        {
          path: 'alert',
          element: <Alert />,
        },
        {
          path: 'progress-bar',
          element: <ProgressBar />,
        },
        {
          path: 'tooltip',
          element: <Tooltip />,
        },
        {
          path: 'dropdown',
          element: <Dropdown />,
        },
        {
          path: 'typography',
          element: <Typography />,
        },
        {
          path: 'icon',
          element: <Icon />,
        },
        {
          path: 'loading-icon',
          element: <LoadingIcon />,
        },
        {
          path: 'regular-form',
          element: <RegularForm />,
        },
        {
          path: 'datepicker',
          element: <Datepicker />,
        },
        {
          path: 'tom-select',
          element: <TomSelect />,
        },
        {
          path: 'file-upload',
          element: <FileUpload />,
        },
        {
          path: 'wysiwyg-editor',
          element: <WysiwygEditor />,
        },
        {
          path: 'validation',
          element: <Validation />,
        },
        {
          path: 'chart',
          element: <Chart />,
        },
        {
          path: 'slider',
          element: <Slider />,
        },
        {
          path: 'image-zoom',
          element: <ImageZoom />,
        },
      ],
    },
    {
      path: '/top-menu',
      element: <TopMenu />,
      children: [
        {
          path: 'dashboard-overview-1',
          element: <DashboardOverview1 />,
        },
        {
          path: 'dashboard-overview-2',
          element: <DashboardOverview2 />,
        },
        {
          path: 'dashboard-overview-3',
          element: <DashboardOverview3 />,
        },
        {
          path: 'dashboard-overview-4',
          element: <DashboardOverview4 />,
        },
        {
          path: 'inbox',
          element: <Inbox />,
        },
        {
          path: 'file-manager',
          element: <FileManager />,
        },
        {
          path: 'point-of-sale',
          element: <PointOfSale />,
        },
        {
          path: 'chat',
          element: <Chat />,
        },
        {
          path: 'post',
          element: <Post />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'crud-data-list',
          element: <CrudDataList />,
        },
        {
          path: 'crud-form',
          element: <CrudForm />,
        },
        {
          path: 'users-layout-1',
          element: <UsersLayout1 />,
        },
        {
          path: 'users-layout-2',
          element: <UsersLayout2 />,
        },
        {
          path: 'users-layout-3',
          element: <UsersLayout3 />,
        },
        {
          path: 'profile-overview-1',
          element: <ProfileOverview1 />,
        },
        {
          path: 'profile-overview-2',
          element: <ProfileOverview2 />,
        },
        {
          path: 'profile-overview-3',
          element: <ProfileOverview3 />,
        },
        {
          path: 'wizard-layout-1',
          element: <WizardLayout1 />,
        },
        {
          path: 'wizard-layout-2',
          element: <WizardLayout2 />,
        },
        {
          path: 'wizard-layout-3',
          element: <WizardLayout3 />,
        },
        {
          path: 'blog-layout-1',
          element: <BlogLayout1 />,
        },
        {
          path: 'blog-layout-2',
          element: <BlogLayout2 />,
        },
        {
          path: 'blog-layout-3',
          element: <BlogLayout3 />,
        },
        {
          path: 'pricing-layout-1',
          element: <PricingLayout1 />,
        },
        {
          path: 'pricing-layout-2',
          element: <PricingLayout2 />,
        },
        {
          path: 'invoice-layout-1',
          element: <InvoiceLayout1 />,
        },
        {
          path: 'invoice-layout-2',
          element: <InvoiceLayout2 />,
        },
        {
          path: 'faq-layout-1',
          element: <FaqLayout1 />,
        },
        {
          path: 'faq-layout-2',
          element: <FaqLayout2 />,
        },
        {
          path: 'faq-layout-3',
          element: <FaqLayout3 />,
        },
        {
          path: 'update-profile',
          element: <UpdateProfile />,
        },
        {
          path: 'change-password',
          element: <ChangePassword />,
        },
        {
          path: 'regular-table',
          element: <RegularTable />,
        },
        {
          path: 'tabulator',
          element: <Tabulator />,
        },
        {
          path: 'modal',
          element: <Modal />,
        },
        {
          path: 'slide-over',
          element: <SlideOver />,
        },
        {
          path: 'notification',
          element: <Notification />,
        },
        {
          path: 'tab',
          element: <Tab />,
        },
        {
          path: 'accordion',
          element: <Accordion />,
        },
        {
          path: 'button',
          element: <Button />,
        },
        {
          path: 'alert',
          element: <Alert />,
        },
        {
          path: 'progress-bar',
          element: <ProgressBar />,
        },
        {
          path: 'tooltip',
          element: <Tooltip />,
        },
        {
          path: 'dropdown',
          element: <Dropdown />,
        },
        {
          path: 'typography',
          element: <Typography />,
        },
        {
          path: 'icon',
          element: <Icon />,
        },
        {
          path: 'loading-icon',
          element: <LoadingIcon />,
        },
        {
          path: 'regular-form',
          element: <RegularForm />,
        },
        {
          path: 'datepicker',
          element: <Datepicker />,
        },
        {
          path: 'tom-select',
          element: <TomSelect />,
        },
        {
          path: 'file-upload',
          element: <FileUpload />,
        },
        {
          path: 'wysiwyg-editor',
          element: <WysiwygEditor />,
        },
        {
          path: 'validation',
          element: <Validation />,
        },
        {
          path: 'chart',
          element: <Chart />,
        },
        {
          path: 'slider',
          element: <Slider />,
        },
        {
          path: 'image-zoom',
          element: <ImageZoom />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },

    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/error-page',
      element: <ErrorPage />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
