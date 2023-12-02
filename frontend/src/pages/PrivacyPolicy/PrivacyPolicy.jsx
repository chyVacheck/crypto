// ? components
import PolicyListParagraphs from './../../components/PolicyListParagraphs/PolicyListParagraphs';
import PolicyMainTitle from './../../components/PolicyMainTitle/PolicyMainTitle';
import PolicyPage from '../../components/PolicyPage/PolicyPage';

function PrivacyPolicy() {
  return (
    <PolicyPage>
      <PolicyMainTitle>Privacy Policy</PolicyMainTitle>
      <PolicyListParagraphs
        index={1}
        title={'General Provision'}
        paragraphs={[
          'The Website is owned by the Company Coin Experts EOOD (hereinafter – the “Company”), registered at Republic of Bulgaria, Sofia 1797, Studentski District, zh.k. Musagenitsa, bl. 91B, entr.A, ap.14 with the company number 207144090',
          'This Privacy Policy governs the handling of Personal Information by Coin Experts EOOD. It applies to the collection, processing, and use of Personal Information by Coin Experts EOOD. For the purposes of this policy, "Personal Information" refers to information that can be used to identify you as an individual, such as your name, address, email address, trading information, and banking details.',
          'We collect information from you when you register an account, log into your account, make a purchase, sale, or exchange order, and when you log out of your account.',
          'Additionally, we automatically collect information about your computer, browser, including your IP address, as well as information about your software and hardware. We also gather information regarding the specific pages of our website that you visit.',
          'At Coin Experts EOOD, safeguarding your private information is of utmost importance to us. We are dedicated to adhering to the policies outlined in this document in a lawful, transparent, and diligent manner.',
        ]}
      />
      <PolicyListParagraphs
        index={2}
        title={'Purpose Of Privacy Policy'}
        paragraphs={[
          'The purpose of this Privacy Policy is to provide you with information regarding:',
          <PolicyListParagraphs
            index={'2.1'}
            paragraphs={[
              'The types of Personal Information that Coin Experts EOOD may collect from you and how it may be used;',
              'Our use of IP addresses and cookies to gather information;',
              'The circumstances under which we may disclose your Personal Information to third parties;',
              'The transfer of your Personal Information within and outside the European Economic Area (EEA);',
              'Your rights to correct, update, and delete your Personal Information;',
              'The security measures implemented by Coin Experts EOOD to protect your Personal Information from loss, misuse, or unauthorized alteration;',
              "Coin Experts EOOD's policies regarding the retention of your Personal Information.",
            ]}
          />,
        ]}
      />
      <PolicyListParagraphs
        index={3}
        title={'Use Of Personal Information'}
        paragraphs={[
          'We may utilize your personal information for the following purposes:',
          <PolicyListParagraphs
            index={'3.1'}
            paragraphs={[
              'To verify your identity;',
              'To process your orders for the purchase, sale, or exchange of cryptocurrencies;',
              'To notify you about trading and financing features, as well as any promotions available on our website;',
              'To provide you with news and updates about recent events;',
              'To personalize your user experience;',
              "To analyze the usage of Coin Experts EOOD's website and improve its functionality and offerings;",
              'To respond to your inquiries and fulfill your requests;',
              'To provide you with information related to your cryptocurrency orders;',
              "To communicate any changes to our website's services or policies.",
            ]}
          />,
        ]}
      />
      <PolicyListParagraphs
        index={4}
        title={'Collection Of Information'}
        paragraphs={[
          'We collect information directly from you when you register or place an order for the purchase, sale, or exchange of cryptocurrencies. The information we may collect includes:',
          <PolicyListParagraphs
            index={'4.1'}
            paragraphs={[
              'Your full name;',
              'Your photographic identification;',
              'Social security number or other government ID number;',
              'Address, city, state, country, postal code, where you reside;',
              'E-mail address;',
              'Phone number;',
              'Birth date;',
              'Banking details, including bank statement;',
              'Your virtual currency wallet address information;',
              'Any other information you choose to provide.',
            ]}
          />,
          "In addition to the information, you submit to us, we gather information about you automatically when you access or use our Services. This information is used to give statistical statistics about our users' browsing habits and tendencies, but it does not identify individuals. This data might include:",
          <PolicyListParagraphs
            index={'4.2'}
            paragraphs={[
              'Information about the type of browser you use, access times, pages viewed, your IP address, and the page you visited before navigating to our Services.',
              'Information about the computer or mobile device you use to access our Services, including the hardware model, operating system and version, unique device identifiers, and mobile network information.',
              'Information about the exchange transactions you complete on this Website, including the amount of virtual currency associated with an exchange transaction, the types of exchanges executed, and other transaction information.',
            ]}
          />,
        ]}
      />
      <PolicyListParagraphs
        index={5}
        title={'Disclosure To Third Parties'}
        paragraphs={[
          'Coin Experts EOOD is committed to protecting your Personal Information and does not sell, share, or disclose it to third parties except as described below.',
          'In order to fulfill the purposes for which we collected your Personal Information, Coin Experts EOOD may share it with third parties who work on our behalf. These may include:',
          <PolicyListParagraphs
            index={'5.2'}
            paragraphs={[
              'Business partners, suppliers, sub-contractors and other service providers;',
              'Advertisers and/or advertising networks that require data in order to select and show you relevant advertisements;',
              'Analytics and/or search engine providers that assist us in the optimization of our site.',
              'All third-party service providers are contractually obligated to protect and use your Personal Information only for the purposes outlined above, unless otherwise required by law.',
            ]}
          />,
          'In the event of a partial or complete sale, assignment, or transfer of Coin Experts EOOD to a third party, your Personal Information may be transferred to the third party and handled in accordance with this Privacy Policy.',
          'In addition, your Personal Information may be disclosed to third parties if we are required to do so by law, court order, or government act, if the disclosure is required in any other way to facilitate criminal or any other lawful investigation or any other legal proceedings in the country or abroad, or if the disclosure is required to prevent or inform authorities of frauds and/or illegal activities.',
        ]}
      />
      <PolicyListParagraphs
        index={6}
        title={'IP Addresses'}
        paragraphs={[
          'In order to improve our website and provide a better user experience, we may collect certain information about your computer, such as your IP address, operating system, and browser type. This information is used for system administration purposes and to generate aggregated data that we may share with our advertisers. Please note that this data is purely statistical and does not identify any individual user.',
        ]}
      />
      <PolicyListParagraphs
        index={7}
        title={'Usage Of Cookies'}
        paragraphs={[
          'To improve the functionality and performance of our website, we utilize cookies to gather information and analyze trends. These cookies help us understand which parts of our website are frequently visited and identify any issues our users may encounter. By collecting this information, we can enhance your experience on our platform by providing more desired features and resolving accessibility problems. The information collected by cookies may include your IP address, the specific page you visited on our website, your internet service provider, operating system, and the date and time of your visit. Please note that third-party services may also use cookies to collect the information described in this section.',
          'Additionally, we may use cookies, action tags, and other tracking technologies provided by third-party advertising providers or web analytics services. These cookies and tags may be placed on advertisements that direct you to our website or other pages of the website. We use these technologies to gain insights into how our website is used, including user navigation patterns, viewed products, and general transaction information. This helps us assess the effectiveness of our advertisements and improve our overall website experience. Our service providers analyze this data and provide us with aggregate reports. The information gathered by our service providers may be combined with the information we collect when you use our platform. Our service providers may also share this information with third parties as required by law or when processing the information on our behalf.',
          'You have the option to block cookies and similar tracking technologies by adjusting the settings in your browser. However, please be aware that by doing so, certain functionalities of our website may be limited.',
        ]}
      />
      <PolicyListParagraphs
        index={8}
        title={'Links'}
        paragraphs={[
          'This Privacy Policy specifically applies to the website operated by Coin Experts EOOD. Please note that our website may contain references or links to other websites maintained by third parties. Coin Experts EOOD bears no responsibility for the privacy practices or policies of these third-party websites. It is important for you to review and familiarize yourself with their respective Privacy Policies.',
          'Coin Experts EOOD cannot be held accountable for the actions or privacy practices of external websites that are linked to on our website. We encourage you to exercise caution and read the Privacy Policies of any external websites you visit.',
        ]}
      />
      <PolicyListParagraphs
        index={9}
        title={'International Transfer of Personal Information'}
        paragraphs={[
          'In order to provide our services, Coin Experts EOOD may store and process your Personal Information in data centers located worldwide, including countries outside the European Economic Area (EEA) that may have different data protection regulations. However, we assure you that any such transfers will be conducted in accordance with the rigorous standards outlined in our Privacy Policy, ensuring the protection and security of your Personal Information.',
        ]}
      />
      <PolicyListParagraphs
        index={10}
        title={
          'Rights To Access, Correct, Object and Delete Your Personal Information'
        }
        paragraphs={[
          'At Coin Experts EOOD, we understand the importance of maintaining accurate and up-to-date Personal Information. You have the right to access, correct, update, or delete any inaccurate or incorrect data we hold about you. To exercise this right, please contact us through the designated contact form on our Website.',
          'We are committed to ensuring that your Personal Information is processed accurately and only for the purposes for which it was collected. If you believe that certain Personal Information is no longer necessary for the specified purposes outlined in this Privacy Policy or for compliance with applicable laws, you have the right to object to its collection.',
          'Requests for account deletion or destruction of Personal Information will be carefully reviewed and processed in accordance with our legal and regulatory obligations. Please note that certain legal and regulatory requirements may prevent us from fulfilling such requests in some cases.',
        ]}
      />
      <PolicyListParagraphs
        index={11}
        title={'Security Of Personal Information'}
        paragraphs={[
          "At Coin Experts EOOD, we take the security of our users' Personal Information and accounts seriously. We have implemented various security measures to ensure the protection of your data, including:",
          <PolicyListParagraphs
            index={'11.1'}
            paragraphs={[
              'Password protected directories and databases;',
              'Only authorized personnel, required to treat the information as confidential, have access to your Personal Information;',
              'Secure Sockets Layered (SSL) technology to encrypt and send your information across the Internet securely;',
              'We retain Personal Information for the duration necessary to fulfill the purposes outlined in this Privacy Policy.',
            ]}
          />,
          'We will retain your Personal Information for as long as it is required to fulfill the purposes stated in this Privacy Policy, taking into account our legal and regulatory obligations. Specifically, we will retain Account and other Personal Information for a period of five years following the cancellation of an Account to comply with our record-keeping responsibilities.',
        ]}
      />
      <PolicyListParagraphs
        index={12}
        title={'Unsubscribing'}
        paragraphs={[
          'At Coin Experts EOOD, we use the email address provided by you to send important information and updates related to your purchases, corporate news, and product information. If you wish to unsubscribe from receiving non-order related communications, you can easily do so by clicking on the unsubscribe link located at the bottom of each non-order related email.',
        ]}
      />
      <PolicyListParagraphs
        index={13}
        title={'Unsubscribing'}
        paragraphs={[
          'Coin Experts EOOD reserves the right to revise, modify, update, and/or supplement this Privacy Policy at any time without prior notice. We will notify all website visitors of any changes to this Privacy Policy and post the updated version on our Website.',
          'It is your responsibility as a user to review the amended Privacy Policy. By continuing to use the Website after the revised Privacy Policy has been published, you acknowledge and agree to the changes made by Coin Experts EOOD.',
          'If you have any questions regarding this Privacy Policy, please feel free to contact us through the designated contact form or by sending an email to the address provided on our Website.',
        ]}
      />
    </PolicyPage>
  );
}

export default PrivacyPolicy;
