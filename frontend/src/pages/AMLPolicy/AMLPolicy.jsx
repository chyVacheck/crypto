// ? components
import PolicyListParagraphs from './../../components/PolicyListParagraphs/PolicyListParagraphs';
import PolicyMainTitle from './../../components/PolicyMainTitle/PolicyMainTitle';
import PolicyPage from '../../components/PolicyPage/PolicyPage';

function AMLPolicy() {
  return (
    <PolicyPage>
      <PolicyMainTitle>
        Anti-Money Laundering and Counter-Terrorist Financing Policy
      </PolicyMainTitle>
      <PolicyListParagraphs
        index={1}
        title={'General Provisions'}
        paragraphs={[
          'The Anti-Money Laundering and Combating the Financing of Terrorism Policy (hereinafter – the “Policy”) of COIN EXPERTS EOOD (hereinafter – the “Company”), registered at Republic of Bulgaria, Sofia 1797, Studentski District, zh.k. Musagenitsa, bl. 91B, entr.A, ap.14, with the company number 207144090, sets out the measures for the prevention of money laundering and terrorist financing (hereinafter – “ML/СTF”) implemented by the Company in respect of the platform operated by the Company (the “Platform”).',
          'Coin Experts EOOD is fully committed to adhering to all applicable local, regional, and European laws, specifically those related to anti-money laundering (AML) and countering the financing of terrorism (CFT). Our objective is to prevent any suspicious or criminal activities and ensure strict compliance with AML/CFT regulations.',
          'All transactions conducted on the Platform must be free from any involvement in money laundering or terrorist financing. In the event that a Customer using the Platform fails to comply with the restrictions outlined in this policy, their account may be terminated, and a report will be filed with the appropriate authorities in accordance with this policy. It is important to note that if a Customer is found to have engaged in money laundering activities, they are solely responsible for any resulting harm or loss, and the Company bears no liability for their fraudulent actions. Should any transaction on the Platform raise doubts regarding its legality, the Company reserves the right to cancel or reject the transaction at any time.',
          'Coin Experts EOOD strictly adheres to the requirements outlined in the Measures Against Money Laundering Act (Law on the Measures Against Money Laundering). In accordance with this Act, money laundering is defined as intentional conduct involving:',
          <PolicyListParagraphs
            index={'1.4'}
            paragraphs={[
              'Converting or transferring property, with knowledge that the property is derived from criminal activity or participation in such activity, in order to conceal or disguise the illicit origin of the property or to assist any person involved in the commission of such activity in evading legal consequences.',
              'Concealing or disguising the true nature, source, location, disposition, movement, rights related to, or ownership of property, with knowledge that the property is derived from criminal activity or participation in such activity.',
              'Acquiring, possessing, holding, or using property, with knowledge at the time of receipt that the property was derived from criminal activity or participation in such activity.',
              'Participating in any of the activities described in Items 1 to 3, associating to commit such activities, attempting to commit such activities, as well as aiding, abetting, facilitating, or counseling the commission of any such activities, inciting, facilitating, or performing such activities, or concealing such activities.',
              'Knowledge, intent, or purpose required for the above-mentioned activities may be inferred from objective factual circumstances.',
              'Money laundering is considered as such even if the crime that generated the property described in the above items was committed in a third country and does not fall under the jurisdiction of the Republic of Bulgaria.',
            ]}
          />,
          'Coin Experts EOOD has implemented comprehensive internal rules to manage and mitigate the risks associated with money laundering and terrorist financing. These rules encompass various processes and measures, including but not limited to:',
          <PolicyListParagraphs
            index={'1.5'}
            paragraphs={[
              'Customer Due Diligence: The Company conducts thorough customer due diligence to verify the identity of its customers and assess any potential risks associated with their transactions.',
              'Ongoing Customer Monitoring and Screening: Coin Experts EOOD continuously monitors customer activities to detect and prevent suspicious transactions. It also screens customers against relevant watchlists and databases to ensure compliance with anti-money laundering (AML) regulations.',
            ]}
          />,
          'For the purposes of this Policy, the following terms shall be interpreted as follows:',
          <PolicyListParagraphs
            index={'1.6'}
            paragraphs={[
              'Identification document(s):',
              <PolicyListParagraphs
                index={'1.6.1'}
                paragraphs={[
                  '​ID card or the passport issued by the official entity.',
                  "A document confirming the client's place of residence, such as a utility bill or bank statement, etc; or",
                  'Any other document that may be requested by the Company.',
                ]}
              />,
              'A politically exposed person (PEP) a customer which is a legal person or other legal entity who are politically exposed persons in the Republic of Bulgaria, in another Member State or in a third country, or in international organizations, as well as with respect to potential customers, existing customers and beneficial owners of a customer which is a legal person or other legal entity who are closely linked with any such politically exposed persons.:',
              <PolicyListParagraphs
                index={'1.6.2'}
                paragraphs={[
                  'Heads of State, heads of government, ministers and deputy ministers or assistant ministers;',
                  'Members of parliament or of other legislative bodies;',
                  'Members of supreme courts, of constitutional courts or of other high-level judicial bodies, the decisions of which are not subject to appeal, except in exceptional circumstances;',
                  'Members of a court of auditors;',
                  'Members of the boards of central banks;',
                  'Ambassadors and charges d’affaires;',
                  'High-ranking officers in the armed forces;',
                  'Members of the administrative, management or supervisory bodies of State-owned enterprises and wholly State-owned commercial corporations;',
                  'Municipality mayors and deputy mayors, borough mayors and deputy mayors and chairpersons of a municipal council;',
                  'Members of the governing bodies of political parties;',
                  'Heads and deputy heads of international organizations, members of the management or supervisory bodies at international organizations or persons performing an equivalent function in any such organizations.',
                  'The categories defined in Items 1 to 7 of Paragraph (2) shall include, mutatis mutandis and if applicable, positions in the institutions and bodies of the European Union and in international organizations.',
                  'The categories defined in Items 1 to 8 of Paragraph (2) shall not cover middle-ranking or more junior officials.',
                ]}
              />,
              'Closely linked to PEP persons:',
              <PolicyListParagraphs
                index={'1.6.3'}
                paragraphs={[
                  'The spouses or the de facto cohabitants;',
                  'The first-degree descendants and the spouses or the de facto cohabitants thereof;',
                  'The first-degree ascendants and the spouses or the de facto cohabitants thereof;',
                  'The second-degree correlative relatives and the spouses or the de facto cohabitants hereof;',
                  'Any natural person who is known to have joint beneficial ownership with any person referred to in point 1.6.2. of a legal person or other legal entity or to be in other close commercial, professional or other business relationships with any person referred to in point 1.6.2.;',
                  'Any natural person who has sole ownership or sole beneficial ownership of a legal person or other legal entity which is known to have been set up for the benefit of any person referred to in point 1.6.2',
                ]}
              />,
              'A Sanctions List is a consolidated list of countries, entities, and individuals, engaged in or suspected of money laundering or terrorism financing activities – and therefore subject to economic sanctions by the European Union, OFAC, the EU, the UN, etc.',
              'A Beneficial ownership refers to the person(s) with ultimate control over funds in the account, whether through ownership or other means:',
              <PolicyListParagraphs
                index={'1.6.5'}
                paragraphs={[
                  'A person who directly or indirectly owns a sufficient percentage of the shares, shares or voting rights, including by holding bearer shares, according to § 2, para. 1, item 1 of the additional provisions of the AMLMA;',
                  'A person exercising control within the meaning of § 1c of the additional provisions of the Trade Act;',
                  'A person exercising decisive influence in making decisions to determine the composition of the management and control bodies, transformation, termination of the activity and other matters of essential importance for the activity, according to § 2, para. 3 of the additional provisions of AMLMA;',
                  'A person who exercises final effective control through the exercise of rights through third parties, including, but not limited to, granted by virtue of a power of attorney, contract or other type of transaction, as well as through other legal forms providing the possibility of exercising decisive influence through third parties, according to § 2, para. 4 of the additional provisions of AMLMA;',
                  'Settlor, trust owner, custodian, beneficiary, or person in whose primary interest the trust is created or managed, or a person who ultimately exercises control over the trust by direct or indirect ownership or by other means, or a person holding office, equivalent or similar to the previously mentioned;',
                  'A person on whose behalf and/or on whose account a given operation, transaction or activity is carried out and who meets at least one of the conditions specified in § 2, para. 1, items 1 – 3 of the additional provisions of AMLMA;',
                  'A person acting as a senior executive when no other person can be identified as the beneficial owner.',
                ]}
              />,
            ]}
          />,
        ]}
      />

      <PolicyListParagraphs
        index={2}
        title={'Customer Identification And Standard Due Diligence Procedures'}
        paragraphs={[
          'Coin Experts EOOD adheres to a robust "Know Your Customer" (KYC) approach to verify the identity of clients before entering into any commercial engagement.',
          'The identity verification process requires customers to provide valid and independent-source documents, data, and information to the Company. Coin Experts EOOD reserves the right to collect customer identity information in order to fulfill its obligations under the AML policy.',
          'The Company is committed to validating the authenticity of documents and information provided by customers. It employs various legal methods to verify customer identities and may conduct enhanced due diligence for customers who appear suspicious or present a higher risk profile.',
          "Coin Experts EOOD maintains the right to regularly review and verify customers' proof of identity, especially in cases where there are changes to the provided information or when customer behavior raises suspicion. The Company exercises its discretion to assess whether certain characteristics or actions are indicative of potential risk.",
          'The Company reserves the right to request updated documents from customers, even if they have previously passed the identity verification process.',
          "Customer identification information collected by Coin Experts EOOD is stored, shared, and protected in strict accordance with the Company's Privacy Policy.",
          'Identification of Natural Persons. For an individual to access the Services, he/she shall provide the Company the following:',
          <PolicyListParagraphs
            index={'2.7'}
            paragraphs={[
              'full name;',
              'date and place of birth;',
              'national ID card or international passport;',
              'an official personal identification number or another unique item for identification;',
              'current address;',
              'country of residence;',
              'any citizenship that the person holds;',
              'information regarding the professional occupation and activity of the person;',
              'the expected volume of planned transactions;',
              'information regarding the source of funds and the purposes of the business relationship.',
            ]}
          />,
          'Identification of Legal Persons and Other Legal Entities:\nFor a company or other legal entity to access the Services, it shall provide the following:',
          <PolicyListParagraphs
            index={'2.8'}
            paragraphs={[
              'name and legal form of the entity;',
              'country of incorporation;',
              'unique identification code;',
              'registration, correspondence, and tax address;',
              'e-mail, website, and telephone of the entity;',
              'information regarding the activity of the entity;',
              'information regarding the structure of ownership of the entity;',
              'information regarding the professional occupation and activity of the person;',
              'the expected volume of planned transactions;',
              'information regarding the source of funds and the purposes of the business relationship.',
            ]}
          />,
          'The person opening the corporate account is required to provide the information under point 2.3.1, as well as documents under point 2.1. for each of the ultimate beneficial owners, directors, managers, and other persons exercising control over the respective legal entity.',
          'Coin Experts EOOD employs a comprehensive approach to verify the accuracy and authenticity of customer information. This involves conducting both manual and automated checks on the gathered documents and data to ensure completeness and accuracy. The Company utilizes a reliable verification software solution that enhances identity verification and assesses the legitimacy of customer-provided documents.',
          'As part of its AML measures, the Company conducts initial and ongoing screening of customers against international sanction and watch lists, politically exposed persons (PEP) lists, and negative media sources. This helps to identify any potential risks associated with customers and ensures compliance with regulatory requirements.',
          "In accordance with applicable legal provisions and at its sole discretion, the Company may refuse to open an account for a customer or terminate an existing account if there are reasonable doubts regarding the accuracy, sufficiency, or integrity of the customer's information obtained during the KYC procedure. These actions are taken to comply with relevant regulations and maintain the integrity of the Company's AML framework.",
        ]}
      />

      <PolicyListParagraphs
        index={3}
        title={
          'Identification Of Politically Exposed Persons, Enhanced Customer Due Diligence And Ongoing Monitoring'
        }
        paragraphs={[
          "As part of our comprehensive anti-money laundering (AML) strategy, Coin Experts EOOD adopts a risk-based approach to customer verification. Each customer's verification process is treated individually, taking into consideration the specific risk factors associated with their profile. In line with this approach, the Company reserves the right to contact customers at any time to request the resubmission of documents and seek additional clarifications, information, and supporting documents to ensure ongoing compliance with AML regulations.",
          'To ensure compliance with AML requirements, the Company conducts ongoing monitoring of customer activity. This monitoring involves both quantitative and qualitative assessments of customer transactions and behavior. By continuously reviewing customer activity, we aim to detect and prevent any suspicious or potentially illicit activities, thereby maintaining a secure and compliant environment.',
          'Identification of Politically Exposed Persons.\nThe Company must always establish whether the Customer (its manager / representative) and the Beneficial Owner are Politically Exposed Persons.',
          <PolicyListParagraphs
            index={'3.3'}
            paragraphs={[
              'In order to establish whether the Customer (its manager / representative) and the Beneficial Owner are Politically Exposed Persons, the Company shall perform the following steps when establishing the identity of the Customer and the Beneficial Owner:',
              'Request the Customer or its representative to go through the KYC procedure, where the Customer or its representative is asked to provide information about the political exposure of the Customer (its manager / representative) and the Beneficial Owner;',
              'Verify the information received from the Customer and its representative against available databases. The Company shall carry out such screening in databases owned or operated by third parties.',
              'If it is determined that the Customer or the Beneficial Owner is a Politically Exposed Person, enhanced Customer and Beneficial Owner due diligence shall be carried out.',
              'The determination whether the Customer and the Beneficial Owner is a Politically Exposed Person must be made prior to the completion of the Customer due diligence procedure.',
            ]}
          />,
        ]}
      />

      <PolicyListParagraphs
        index={4}
        title={'Monitoring Of Transactions'}
        paragraphs={[
          'Coin Experts EOOD requires all customers to undergo a thorough identity verification process before engaging in trading activities. Once the verification is successfully completed, customers explicitly consent to the ongoing monitoring of their transactions. This allows the Company to analyze transactional patterns and identify any potential suspicious activities or deviations from expected patterns.',
          'As part of our robust anti-money laundering (AML) measures, Coin Experts EOOD utilizes advanced data analysis tools to assess risks and detect suspicious activities. These tools are designed to perform a range of compliance-related tasks, including data capture, filtering, record-keeping, investigation management, and reporting. By leveraging data analysis, we aim to enhance our ability to identify and prevent money laundering or other illicit activities, ensuring a secure and compliant trading environment for our customers.',
          'In connection with the AML/CFT Policy, the Company will:',
          <PolicyListParagraphs
            index={'4.3'}
            paragraphs={[
              'Monitor all transactions. The Company reserves the right to ensure that transactions of suspicious nature are reported to the proper law enforcement;',
              'Request the Customer to provide any additional information and documents in case of suspicious transactions;',
              'Suspend or terminate Customer’s Account when the Company has a reasonable suspicion that such Customer is engaged in illegal activity.',
            ]}
          />,
          'The aforementioned measures are not comprehensive, and our Compliance Officer will conduct regular monitoring of customer transactions to assess whether any of these transactions should be flagged and reported as suspicious. This ongoing monitoring ensures that we remain vigilant in detecting and addressing potential money laundering or illicit activities.',
          "Coin Experts EOOD is committed to conducting continuous monitoring of each customer's business relationship and their associated operations and transactions. This monitoring enables us to ensure that the customer's activities align with our understanding of their profile, business operations, risk level, and the source of funds involved. By maintaining a thorough understanding of our customers and their activities, we can proactively identify any discrepancies or red flags and take appropriate actions to mitigate potential risks.",
        ]}
      />

      <PolicyListParagraphs
        index={5}
        title={'Compliance Officer and Trainings'}
        paragraphs={[
          'The designated Compliance Officer at Coin Experts EOOD is a duly authorized individual responsible for ensuring the effective implementation and enforcement of the AML policy. The Compliance Officer possesses the necessary qualifications, education, and expertise in AML/CTF principles and practical matters.',
          "The Compliance Officer holds the primary responsibility for overseeing all aspects of policy implementation, including but not limited to: collecting and verifying customers' identification information; establishing and regularly updating internal policies and procedures for the completion, review, submission, and retention of all necessary reports and records as mandated by applicable laws and regulations; monitoring asset transfers and promptly investigating any significant deviations from normal transfer activity; implementing a robust records management system to ensure proper storage and retrieval of documents, files, forms, and logs; and conducting regular risk assessments to enhance the effectiveness of our AML measures. The Compliance Officer's role is crucial in maintaining the highest standards of compliance and mitigating the risk of money laundering and terrorist financing within our operations.",
          'The Compliance Officer at Coin Experts EOOD has the authority to collaborate with competent authorities involved in preventing all forms of illicit activity:',
          <PolicyListParagraphs
            index={'5.3'}
            paragraphs={[
              'It is the responsibility of the Compliance Officer to take immediate action and report relevant information to the appropriate authorities if there is suspicion that any assets are derived from or involved in criminal or terrorist activities.',
              'In the event of suspicious activity or a suspicious transaction by a Customer, the Compliance Officer is obligated to halt such operation or transaction (unless prevented by the nature, method, or other objectively impossible circumstances) and promptly notify the relevant authorities.',
              "The Compliance Officer is responsible for notifying the relevant authorities of any information received regarding a Customer's intentions or attempts to engage in suspicious operations or transactions. Upon verification of the legitimacy of the funds, the authorities will issue a notification to the Company. Upon receipt of such notification, the Company may resume the operation or transaction.",
              "If the relevant authorities issue a notice to suspend a Customer's suspicious activities, the Company will temporarily suspend the Customer's activities for the designated period as directed by the authorities.",
            ]}
          />,
          'At Coin Experts EOOD, all employees and officers undergo continuous comprehensive training on Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) measures. This training covers both general AML/CTF principles as well as specific requirements relevant to their respective roles. Employees are required to complete this training at least once every twelve (12) months to ensure their knowledge is up to date and they remain fully compliant with all relevant laws and regulations. New employees receive training within thirty (30) days of their start date.',
        ]}
      />

      <PolicyListParagraphs
        index={6}
        title={'Sensitive Personal Information'}
        paragraphs={[
          'At Coin Experts EOOD, we recognize the importance of protecting sensitive personnel information. This refers to any personal data that can be used to identify an individual, such as their name, date of birth, address, identification number, passport number, social security number, and financial information. We collect, share, and store this information securely in accordance with our Privacy Policy and the General Data Protection Regulation (GDPR).',
          "We have implemented robust procedures to handle any suspected or confirmed breaches of sensitive personnel information. In the event of a breach, we take immediate action by promptly notifying the affected individuals and relevant authorities. Additionally, we conduct a thorough investigation to determine the extent and cause of the breach. Our priority is to mitigate any potential harm and prevent future breaches to ensure the security and confidentiality of our customers' personal information.",
        ]}
      />

      <PolicyListParagraphs
        index={7}
        title={'Terminations Of Terms and Business'}
        paragraphs={[
          'In accordance with our AML policy, Coin Experts EOOD reserves the right to refuse to perform operations or transactions if any of the following conditions are met:',
          <PolicyListParagraphs
            index={'7.1'}
            paragraphs={[
              'The customer fails to provide the requested information within the specified deadlines set by the Company;',
              'The customer fails to fulfill their contractual obligations as outlined in the agreement;',
              'The customer does not provide the necessary data to verify their identity or provides false or incomplete information;',
              'The customer attempts to open an anonymous account or opens an account on behalf of a non-existent person;',
              'The customer is suspected of involvement in money laundering or terrorist financing activities, and the additional verification process raises suspicions that their further activities may need to be reported to law enforcement agencies.',
            ]}
          />,
          'In addition to the conditions mentioned above, Coin Experts EOOD retains the right to refuse to perform operations or transactions in the following circumstances:',
          <PolicyListParagraphs
            index={'7.2'}
            paragraphs={[
              'Violation of the rules governing relationships with cloud banks or banks that allow the use of their accounts;',
              'Inability to ensure compliance with the requirements stated in our AML policy;',
              "Failure to confirm the customer's identity or suspicion of falsification of identity;",
              'Operations or transactions that may contravene or violate international financial sanctions or other restrictive measures.',
            ]}
          />,
        ]}
      />

      <PolicyListParagraphs
        index={8}
        title={'Terminations Of Terms and Business'}
        paragraphs={[
          'Coin Experts EOOD reserves the right to revise and modify the Anti-Money Laundering (AML) policy by publishing the updated version on the Website. If a Customer disagrees with any such modifications, it is advised to close their Account and discontinue the use of the Website, Platform, and Services.',
          'The AML policy undergoes regular review and updates, at least once a year or in the event of significant developments. The most current version of the policy is always accessible on the Website.',
          "Should you have any inquiries regarding Coin Experts EOOD's anti-money laundering and anti-terrorist financing policy, please reach out to us by contacting our support team through the injury field on our Website.",
        ]}
      />
    </PolicyPage>
  );
}

export default AMLPolicy;
