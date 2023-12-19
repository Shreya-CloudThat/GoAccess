import logoUrl from '@/assets/images/logo.svg';
import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
} from '@/base-components';
import { faker as $f } from '@/utils';
import classnames from 'classnames';
import * as $_ from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { callApiForUserDetails } from '../../custom-components/GetUserByEmail';


function Main(props) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };
  const { dispatch } = useAuth();
  console.log('user------>', JSON.parse(localStorage.getItem('user')));
  let username = JSON.parse(localStorage.getItem('user'))?.username || null;
   const firstLetter = username ? username.charAt(0).toUpperCase() : null;

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      window.location.href = '/login';
    }
    else{
      callApiForUserDetails(username);
    }
  }, [localStorage.getItem('user')]);

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div
        className={`${props.className} top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] -mt-7 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700`}
      >
        <div className="h-full flex items-center">
          {/* BEGIN: Logo */}
          <Link
            to="/"
            className="logo -intro-x hidden md:flex xl:w-[180px] block"
          >
            <img
              alt="Enigma Tailwind HTML Admin Template"
              className="logo__image w-6"
              src={logoUrl}
            />
            <span className="logo__text text-white text-lg ml-3">
              GO-ACCESS
            </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {/* Dashboard */}
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          {/* <div className="intro-x relative mr-3 sm:mr-6">
            <div className="search hidden sm:block">
              <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
              />
              <Lucide
                icon="Search"
                className="search__icon dark:text-slate-500"
              />
            </div>
            <a className="notification sm:hidden" href="">
              <Lucide
                icon="Search"
                className="notification__icon dark:text-slate-500"
              />
            </a>
            <div
              className={classnames({
                'search-result': true,
                show: searchDropdown,
              })}
            >
              <div className="search-result__content">
                <div className="search-result__content__title">Pages</div>
                <div className="mb-5">
                  <a href="" className="flex items-center">
                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                      <Lucide icon="Inbox" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Mail Settings</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                      <Lucide icon="Users" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Users & Permissions</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                      <Lucide icon="CreditCard" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Transactions Report</div>
                  </a>
                </div>
                <div className="search-result__content__title">Users</div>
                <div className="mb-5">
                  {$_.take($f(), 4).map((faker, fakerKey) => (
                    <a
                      key={fakerKey}
                      href=""
                      className="flex items-center mt-2"
                    >
                      <div className="w-8 h-8 image-fit">
                        {firstLetter && (
                          <div
                            // className={`${colorScheme} text-white`}
                            style={{
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                            }}
                            className="bg-primary"
                          >
                            {firstLetter}
                          </div>
                        )}
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full"
                          src={faker.photos[0]}
                        /> 
                      </div>
                      <div className="ml-3">{faker.users[0].name}</div>
                      <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                        {faker.users[0].email}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="search-result__content__title">Products</div>
                {$_.take($f(), 4).map((faker, fakerKey) => (
                  <a key={fakerKey} href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.images[0]}
                      />
                    </div>
                    <div className="ml-3">{faker.products[0].name}</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      {faker.products[0].category}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div> */}
          {/* END: Search */}
          {/* BEGIN: Notifications */}
     
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
            >
              {firstLetter && (
                <div
                  // className={`${colorScheme} text-white`}
                  style={{
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                  className="bg-primary "
                >
                  {firstLetter}
                </div>
              )}
              {/* <img
                alt="Midone Tailwind HTML Admin Template"
                // src={$f()[9].photos[0]}
                src=""
              /> */}
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  {/* <div className="font-medium">{$f()[0].users[0].name}</div> */}
                  <div className="font-medium">{username}</div>

                  {/* <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    {$f()[0].jobs[0]}
                  </div> */}
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                {/* <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </DropdownItem> */}
                {/* <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Add Account
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
                </DropdownItem> */}
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem
                  className="hover:bg-white/5"
                  onClick={() => {
                    dispatch({ type: 'SIGN_OUT' });
                  }}
                >
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

Main.propTypes = {
  className: PropTypes.string,
};

Main.defaultProps = {
  className: '',
};

export default Main;
