// import { Link } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
// import '../assets/css/style.css'

const About = () => {
  // const features = [
  //   {
  //     icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/jdf_mark_50px.png',
  //     title: 'showcase',
  //     text: "TicketMonster's architecture uses the best technologies that make up the JBoss Developer Framework. Learn how easy it is to harness the power of Java EE with HTML5 + REST.",
  //   },
  //   {
  //     icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/glyphicons_163_iphone.png',
  //     title: 'Responsive-UI',
  //     text: 'When you interact with TicketMonster on a mobile device, you will get a mobile-specific interface. Learn how easy it is to write Java EE applications that can accommodate desktop and mobile clients.',
  //   },
  //   {
  //     icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/glyphicons_232_cloud.png',
  //     title: 'Cloud-ready',
  //     text: 'A deployment of TicketMonster runs continuously in the cloud on the OpenShift platform. Learn how easy it is to write Java EE applications that can deploy both locally and in the cloud.',
  //   },
  //   {
  //     icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/GitHub_Logo.png',
  //     title: 'Fork in on',
  //     text: 'TicketMonster is available on GitHub. Within a click, you can get the source code, build it and run it!',
  //   },
  //   {
  //     icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/glyphicons_351_book_open.png',
  //     title: 'Learn with it',
  //     text: 'TicketMonster is accompanied by a tutorial that walks your through the application architecture. Read it to learn how the application is built.Or even build it yourself following our instructions.',
  //   },
  //   {
  //     icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/glyphicons_019_cogwheel.png',
  //     title: 'Customize it',
  //     text: 'TicketMonster an example that you can follow, but you can also use the predefined application structure to implement your own use cases and test your ideas, and to contribute back to the community with fixes and extensions.',
  //   },
  // ];

  const features = [
    {
      icon: '',
      title: 'AWS Serverless Architecture',
      text: "TicketMonster's architecture uses the best technologies that make up the JBoss Developer Framework. Learn how easy it is to harness the power of Java EE with HTML5 + REST.",
    },
    {
      icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/glyphicons_163_iphone.png',
      title: 'Responsive-UI',
      text: 'When you interact with TicketMonster on a mobile device, you will get a mobile-specific interface. Learn how easy it is to write Java EE applications that can accommodate desktop and mobile clients.',
    },
    {
      icon: 'http://13.54.90.159:8080/ticket-monster/resources/img/glyphicons_232_cloud.png',
      title: 'Moderization with CloudThat',
      text: 'A deployment of TicketMonster runs continuously in the cloud on the OpenShift platform. Learn how easy it is to write Java EE applications that can deploy both locally and in the cloud.',
    },
  ];

  const featureDescriptions = {
    'AWS Serverless Architecture': [
      'Discover efficiency redefined with our AWS serverless architecture. Experience rapid scalability, minimal maintenance, and cost-effectiveness. Elevate your operations with seamless, event-driven solutions on the cloud.',
    ],
    'Responsive-UI': [
      'Introducing GoAccess Tickets– the responsive ticketing solution. Seamlessly book tickets for all events on any device. Experience effortless ticketing, anytime, anywhere.',
      // 'When you interact with TicketMonster on a ',
      // <b>mobile</b>,
      // ' device, you will get a mobile-specific interface. Learn how easy it is to write Java EE applications that can accommodate desktop and mobile clients.',
    ],
    'Moderization with CloudThat': [
      'Step into the future with our modernized, cloud-powered system. Enjoy enhanced performance, top-notch security, and limitless scalability. Embrace innovation seamlessly with CloudThat Services.',
    ],
    'fork it on': [
      'TicketMonster is available on ',
      <b>GitHub.</b>,
      ' Within a click, you can get the source code, build it and run it!',
    ],
    'learn with it': [
      'TicketMonster is accompanied by a ',
      <b>tutorial</b>,
      ' that walks your through the application architecture. Read it to learn how the application is built. Or even build it yourself following our instructions.',
    ],
    'customize it': [
      'TicketMonster an example that you can follow, but you can also use the predefined application structure to ',
      <b>implement your own use cases</b>,
      ' and test your ideas, and to contribute back to the ',
      <b>community</b>,
      ' with fixes and extensions.',
    ],
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row p-4  mx-4 md:mx-40 md:p-2">
        <div className="w-full md:w-auto mb-4 md:mb-0 md:mr-4">
          <img
            src="https://ticketmonster-web-hosting.s3.ap-south-1.amazonaws.com/assets/Screenshot+2023-11-21+111231.08ed81be.png"
            className="h-60 p-2 mt-9 border-r-4"
            alt="TicketMonster"
          />
        </div>
        <div className="w-full md:w-3/4">
          <p className="text-2xl md:text-5xl font-bold font-serif mb-4 md:mt-10">
            GoAccess Tickets
            <br /> An Event-Driven Serverless Architecture Example.
          </p>
          <p className="text-xs md:text-lg mt-2">
            GoAccess Tickets modernized app, powered by Event-Driven
            Architecture (EDA), redefines event access. Enjoy personalized
            options, and swift bookings tailored to you. Elevate your event
            experience with our cutting-edge technology. Upgrade to GoAccess
            Tickets for seamless, personalized event access.
          </p>
          <Link to="/events">
            <button
              type="button"
              class="text-white bg-gradient-to-br mt-5 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Buy Tickets Now
            </button>
            {/* <button
              type="button"
              class="text-white bg-gradient-to-r mt-4 from-purple-600 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            ></button> */}
            {/* <button className="py-2 px-5 border border-black bg-violet-500 rounded-lg text-white hover:bg-violet-400 shadow-md shadow-black mt-4">
              Buy tickets now
            </button> */}
          </Link>
        </div>
      </div>
      {/* grid----------------------------------------------- */}
      <div className="p-3 lg:mx-10">
        <div className="p-4 mx-4 md:mx-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="mx-2 mt-10 md:mt-0 lg:my-10 md:my-5 cursor-pointer bg-gray-100 border border-gray-200 p-5 hover:bg-white ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex items-center ">
                  {feature.title === 'AWS Serverless Architecture' ? (
                    <>
                      <img
                        src="https://ticketmonster-web-hosting.s3.ap-south-1.amazonaws.com/assets/MicrosoftTeams-image+(14).png"
                        className="ml-2 h-14"
                        alt={feature.title}
                      />
                      <p className="text-xl md:text-2xl font-bold ml-4">
                        {feature.title}
                      </p>
                    </>
                  ) : feature.title === 'Moderization with CloudThat' ? (
                    <>
                      <img
                        src="https://ticketmonster-web-hosting.s3.ap-south-1.amazonaws.com/assets/MicrosoftTeams-image+(16).6f7c4fce.png"
                        className="ml-2 h-14"
                        alt={feature.title}
                      />
                      <p className="text-xl md:text-2xl ml-4 font-bold">
                        {feature.title}
                      </p>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://ticketmonster-web-hosting.s3.ap-south-1.amazonaws.com/assets/MicrosoftTeams-image+(15).d717d699.png"
                        className="ml-2 h-14"
                        alt={feature.title}
                      />
                      <p className="text-xl md:text-2xl ml-4 font-bold">
                        {feature.title}
                      </p>
                    </>
                  )}
                </div>
                <hr className="my-2" />
                <p className="mt-4 text-base">
                  {featureDescriptions[feature.title] || feature.text}
                </p>
                {/* {feature.title === 'Fork in on' ? (
                    <>
                      <p className="text-xl md:text-2xl font-bold">
                        {feature.title}
                      </p>
                      <img
                        src={feature.icon}
                        className="ml-2 "
                        alt={feature.title}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={feature.icon}
                        className="ml-2 mr-2"
                        alt={feature.title}
                      />
                      <p className="text-xl md:text-2xl font-bold">
                        {feature.title}
                      </p>
                    </>
                  )} */}
                {/* </div>
                <hr className="my-2" />
                <p className="mt-4 text-base">
                  {featureDescriptions[feature.title] || feature.text}
                </p> */}
                {/* <p className="mt-4 text-base">{feature.text}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
