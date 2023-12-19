import DarkModeSwitcher from '@/components/dark-mode-switcher/Main';
import dom from '@left4code/tw-starter/dist/js/dom';
import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import { useEffect, useState } from 'react';
// import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../config/UserPool';
import { Link } from 'react-router-dom';

function Main() {
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userdetail, setUserdetail] = useState({
    username: '',
    email: '',
    password: '',
    confirmpwd: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmpwd: '', // Updated to match the Errors interface
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleRegistration = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!validateForm()) {
      return;
    }
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: userdetail?.email,
      })
    );
    let username = userdetail?.username;
    UserPool.signUp(
      username,
      userdetail?.password,
      attributeList,
      null,
      (err, data) => {
        if (err) {
          console.log(err);
          setErrorMessage(err.message);
          // alert("Couldn't sign up");
        } else {
          console.log(data);
          setVerifyProcess(true);
          // alert('User Added Successfully');
        }
      }
    );
  };

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmpwd: '', // Updated to match the Errors interface
    };

    if (!userdetail.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // if (!userdetail.password.trim()) {
    //   newErrors.password = 'Password is required';
    // }

    if (!userdetail.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (userdetail.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(userdetail.password)) {
      newErrors.password = 'Password must contain at least 1 number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userdetail.password)) {
      newErrors.password = 'Password must contain at least 1 special character';
    } else if (!/[A-Z]/.test(userdetail.password)) {
      newErrors.password = 'Password must contain at least 1 uppercase letter';
    } else if (!/[a-z]/.test(userdetail.password)) {
      newErrors.password = 'Password must contain at least 1 lowercase letter';
    }

    if (userdetail.password !== userdetail.confirmpwd) {
      newErrors.confirmpwd = 'Passwords do not match';
    }
    if (!userdetail.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !userdetail.email
        .trim()
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      newErrors.email = 'Email is not correct';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const verifyAccount = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: userdetail?.username,
      Pool: UserPool,
    });
    console.log(user);
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't verify account");
      } else {
        console.log(data);
        const apiPayload = {
          method: 'insertUser',
          name: userdetail?.username,
          email: userdetail?.email,
        };

        // Make an API request to your backend to register the user
        fetch(
          'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/register-user/insertUser',
          {
            method: 'POST', // Use the appropriate HTTP method for your API
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiPayload),
          }
        )
          .then((response) => response.json())
          .then((item) => {
            console.log('response--', item);
            alert('Account verified successfully');
            window.location.href = '/login';
          })
          .catch((error) => {
            console.error('Error in API request:', error);
            // Handle the error appropriately, e.g., show an error message.
          });
        // alert('Account verified successfully');
        // window.location.href = '/login';
      }
    });
  };

  // const getPayload = {
  //   method: 'insertUser',
  //   name: userdetail.username,
  //   email: userdetail.email,
  // };

  // useEffect(() => {
  //   if (verifyProcess === 'true') {
  //     setLoading(true);
  //     fetchData(
  //       'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/register-user/insertUser',
  //       getPayload
  //     )
  //       .then((item) => {
  //         console.log('response--', item);
  //         setResponse(item);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error('Error in fetch:', error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    dom('body').removeClass('main').removeClass('error-page').addClass('login');
  }, []);

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-6"
                  src={logoUrl}
                />
                <span className="text-white text-lg ml-3"> GoAccess </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign up to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>
              </div>
            </div>

            {verifyProcess == false ? (
              <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Sign Up
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
                    A few more clicks to sign in to your account. Manage all
                    your e-commerce accounts in one place
                  </div>
                  <div className="intro-x mt-8">
                    <input
                      type="text"
                      className={`block px-4 py-3 intro-x min-w-full xl:min-w-[350px] ${
                        errors.username ? 'border-red-500' : ''
                      }`}
                      // className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="User Name"
                      value={userdetail?.username}
                      onChange={(e) =>
                        setUserdetail({
                          ...userdetail,
                          username: e.target.value,
                        })
                      }
                    />
                    {errors.username.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.username}
                      </p>
                    )}
                    {/* <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Last Name"
                    value={userdetail?.lastname}
                    onChange={(e) =>
                      setUserdetail({
                        ...userdetail,
                        lastname: e.target.value,
                      })
                    }
                  /> */}
                    <input
                      type="text"
                      // className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Email"
                      className={`block px-4 py-3  mt-4 intro-x min-w-full xl:min-w-[350px] ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      value={userdetail?.email}
                      onChange={(e) =>
                        setUserdetail({
                          ...userdetail,
                          email: e.target.value,
                        })
                      }
                    />
                    {errors.email.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                    <input
                      type="password"
                      // className="intro-x login__input form-control py-3 px-4 block mt-4"
                      className={`block px-4 py-3  mt-4 intro-x min-w-full xl:min-w-[350px] ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      placeholder="Password"
                      value={userdetail?.password}
                      onChange={(e) =>
                        setUserdetail({
                          ...userdetail,
                          password: e.target.value,
                        })
                      }
                    />
                    {errors.password.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                    <input
                      type="password"
                      // className="intro-x login__input form-control py-3 px-4 block mt-4"
                      className={`block px-4 py-3  mt-4 intro-x min-w-full xl:min-w-[350px] ${
                        errors.confirmpwd ? 'border-red-500' : ''
                      }`}
                      placeholder="Confirm Password"
                      value={userdetail?.confirmpwd}
                      onChange={(e) =>
                        setUserdetail({
                          ...userdetail,
                          confirmpwd: e.target.value,
                        })
                      }
                    />
                    {errors.confirmpwd.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmpwd}
                      </p>
                    )}
                    {/* <div className="intro-x w-full grid grid-cols-12 gap-4 h-1 mt-3">
                    <div className="col-span-3 h-full rounded bg-success"></div>
                    <div className="col-span-3 h-full rounded bg-success"></div>
                    <div className="col-span-3 h-full rounded bg-success"></div>
                    <div className="col-span-3 h-full rounded bg-slate-100 dark:bg-darkmode-800"></div>
                  </div>
                  <a
                    href=""
                    className="intro-x text-slate-500 block mt-2 text-xs sm:text-sm"
                  >
                    What is a secure password?
                  </a> */}
                    {/* <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Password Confirmation"
                    value={userdetail?.confirmpwd}
                    onChange={(e) =>
                      setUserdetail({
                        ...userdetail,
                        confirmpwd: e.target.value,
                      })
                    }
                  /> */}
                  </div>
                  {errorMessage.length > 0 && (
                    <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                      <div className="flex items-center mr-auto">
                        <label
                          className="cursor-pointer select-none text-red-800"
                          htmlFor="remember-me"
                        >
                          {errorMessage}
                        </label>
                      </div>
                    </div>
                  )}
                  <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <div className="flex items-center mr-auto">
                      <label
                        className="select-none text-violet-800 text-xs"
                        
                      >
                        <span className='font-semibold'>Password Policy:</span> <br/>
                        Contains at least 1 number
                        <br /> Contains at least 1 special character
                        <br /> Contains at least 1 uppercase letter
                        <br /> Contains at least 1 lowercase letter
                      </label>
                    </div>
                  </div>
                  {/* <div className="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="form-check-input border mr-2"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      I agree to the Envato
                    </label>
                    <a
                      className="text-primary dark:text-slate-200 ml-1"
                      href=""
                    >
                      Privacy Policy
                    </a>
                    .
                  </div> */}
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                      onClick={handleRegistration}
                    >
                      Register
                    </button>
                    <Link
                      to="/login"
                      className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Sign Up
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
                    A few more clicks to sign in to your account. Manage all
                    your e-commerce accounts in one place
                  </div>
                  <div className="intro-x mt-8">
                    <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                      Enter OTP
                    </h2>
                    <input
                      type="text"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="User Name"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                      <button
                        className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                        onClick={verifyAccount}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
