// ? components
import PolicyListParagraphs from './../../components/PolicyListParagraphs/PolicyListParagraphs';
import PolicyMainTitle from './../../components/PolicyMainTitle/PolicyMainTitle';
import PolicyPage from '../../components/PolicyPage/PolicyPage';

function CookiesPolicy() {
  return (
    <PolicyPage>
      <PolicyMainTitle>Cookies Policy</PolicyMainTitle>
      <PolicyListParagraphs
        index={1}
        title={'Introduction'}
        paragraphs={[
          'Coin Experts EOOD hereon referred to as the “Company” is a Bulgarian Company incorporated and registered under the laws of Bulgaria, with the company number 207144090, registered at Sofia 1797, Studentski District, zh.k. Musagenitsa, bl. 91B, entr.A, ap.14, an entity existing under the laws of Republic of Bulgaria (“Coin Experts EOOD”)',
        ]}
      />
      <PolicyListParagraphs
        index={2}
        title={'Policy'}
        paragraphs={[
          'This Cookie Policy (the "Policy") outlines the usage and purpose of cookies on the Coin Experts branded website (hereinafter referred to as the "Website").',
        ]}
      />
      <PolicyListParagraphs
        index={3}
        title={'Cookies'}
        paragraphs={[
          "Cookies are small text files that are stored by a web browser on a computer or device when certain web pages are visited or specific actions are taken on the Company's website and other websites. They assist the browser in remembering the visitor's preferences and displaying relevant information, such as items in their shopping cart, instead of treating the visitor as a new user each time a page is accessed.",
          `Some cookies ("session cookies") are only stored for the duration of a visit to aid the visitor in navigating the website and providing relevant information. Others are stored for longer periods ("persistent cookies") to allow the browser to retain preferences from previous visits. Cookies cannot cause harm to a user's device, they are anonymous, and they are unique to the user's browser.`,
        ]}
      />
      <PolicyListParagraphs
        index={4}
        title={'How We Use Cookies'}
        paragraphs={[
          'Coin Experts EOOD uses cookies for the following purposes:',
          <PolicyListParagraphs
            index={'4.1'}
            paragraphs={[
              'To identify the services that a User is interested in and remember details about their application;',
              'To monitor and analyze the usage of the website and for the technical administration of the website;',
              "To improve the website's functionality;",
              'To generate and derive useful data and information regarding the interests, characteristics, usage, and behavior of our visitors.',
            ]}
          />,
          "The cookies used by Coin Experts EOOD do not store sensitive personal information such as a User's name or address. They only contain an anonymous reference that helps us identify the User. Additionally, cookies may be set to assist users in navigating the site, enhancing their experience, or providing important information about their interests.",
          'Coin Experts EOOD may share aggregated information, including non-identifying information and log data, with third parties for industry analysis, demographic profiling, and other commercial purposes. This may also include delivering targeted advertising about products and services. Any aggregated information shared in these instances will not include personally identifiable information.',
          'Coin Experts EOOD collaborates with government and law enforcement officials, as well as private parties, to enforce and comply with the law.',
          'Coin Experts EOOD may provide additional privacy notices related to specific services as needed.',
        ]}
      />
      <PolicyListParagraphs
        index={5}
        title={'Your consent to collection and use of information'}
        paragraphs={[
          "Kindly note that when you access Coin Experts EOOD's website, non-identifiable information is collected in the following ways:",
          <PolicyListParagraphs
            index={'5.1'}
            paragraphs={[
              'Log Data;',
              'Personal Information;',
              'Cookies (including third party Cookies).',
            ]}
          />,
          "By using Coin Experts EOOD's Website and accepting Cookies on your browser, you grant the company access to certain information. Furthermore, if you voluntarily provide personal information on the website, you consent to the collection and use of that information in accordance with this Cookie Policy.",
          'In the event that there are any changes to our Cookie Policy, Coin Experts EOOD will make these changes known on the website. This ensures that users are always informed about the information collected and how these data are used.',
          "Your continued use of Coin Experts EOOD's website signifies the User’s agreement to any such changes made to the Cookie Policy.",
        ]}
      />
      <PolicyListParagraphs
        index={6}
        title={'Cookies Settings'}
        paragraphs={[
          "If a User does not wish to receive specific types of Cookies from Coin Experts EOOD's website, they have the option to opt-out of receiving them. The Company utilizes a Cookie to remember these preferences for subsequent visits from the same browser. As it is currently not technically feasible to synchronize settings across different browsers and devices, the User will need to adjust these settings in each browser they use.",
          'It is important to note that while Coin Experts EOOD strives to respect the User’s preferences, it is possible that not all Cookies will be captured according to their settings. If this issue arises, it is recommended to modify the Cookie settings in the browser.',
          "Users have the ability to disable or block certain cookies in their browser; however, it should be noted that without some of these cookies, Coin Experts EOOD's website may not function correctly, and the user experience may be affected.",
        ]}
      />
      <PolicyListParagraphs
        index={7}
        title={'Third-Party Cookies'}
        paragraphs={[
          'In order to provide visitors with the best possible experience, Coin Experts EOOD may collaborate with third parties to collect anonymous data on how the Website is being used and to present users with relevant information. As part of this process, third-party partners may set their own cookies during a visit to the Website.',
          `A "cookie" is a small text file that can be used to gather information about a user's behavior in connection with the Services, as well as to recall any previously provided personal information, such as user ID and password for accessing the Service(s). Coin Experts EOOD's technology suppliers, in particular, may utilize "Flash Cookies" and/or local storage technologies to enable users to easily access their accounts and store their account settings in their browsers. Please be aware that most browsers provide options for managing cookies, including the ability to accept or reject them and to delete them.`,
        ]}
      />
      <PolicyListParagraphs
        index={8}
        title={'Log Data'}
        paragraphs={[
          `When User visits the Coin Experts EOOD website, we collect information known as "Log Data," which includes details sent by User’s browser whenever User access the website or an online service. This Log Data may include, but is not limited to, your computer's IP address, browser type, the webpage User visited before accessing our website, and the information User searched for on our website. Additionally, if User access our website through a mobile device and provide your consent as specified in the mobile application, we may collect a PushID and Mobile IP associated with User’s device.`,
        ]}
      />
      <PolicyListParagraphs
        index={9}
        title={'Scope of the Policy and Third-Party Sites'}
        paragraphs={[
          'This Cookie Policy specifically pertains to Coin Experts EOOD and its Website. We do not have control over other websites, banners, or links displayed on our website. These external entities may set their own cookies or other files on your computer, gather data, or request personal information from you, all subject to their respective privacy policies. We strongly recommend that you carefully review the privacy policies and terms and conditions of these third-party websites before accessing or using them.',
        ]}
      />
      <PolicyListParagraphs
        index={10}
        title={'Questions'}
        paragraphs={[
          'If you have any inquiries concerning this Cookie Policy, if you would like to access or modify your information, if you have any complaints, or if you have questions about the security measures implemented on our website, please reach out to us using the contact information provided in the designated contact field on our Website.',
        ]}
      />
      <PolicyListParagraphs
        index={11}
        title={'Updates'}
        paragraphs={[
          "Coin Experts EOOD conducts regular reviews of this Cookie Policy, ensuring that it remains aligned with the company's operational model. Any updates or changes in our operations will be accurately reflected in this policy. The latest version of the policy can always be found on our Website.",
        ]}
      />
    </PolicyPage>
  );
}

export default CookiesPolicy;
