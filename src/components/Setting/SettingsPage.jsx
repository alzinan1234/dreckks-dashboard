// components/SettingsPage.js
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic'; // Import dynamic for SSR compatibility

// Mock data for dynamic content
const contentData = {
  'privacy-security': {
    title: 'Privacy Policy',
    date: 'Dec 4, 2019 21:42',
    text: `<h1>Privacy Policy</h1>
<p>1. Information We Collect</p>
<p>We collect personal information to provide and improve our services. The types of information we collect include:</p>
<p>a. Information You Provide Directly:</p>
<ul>
  <li>Account Registration: Name, email address, team name, age group, and other details required for registration.</li>
  <li>Uploaded Content: Videos, scores, and other materials submitted for events.</li>
  <li>Communication: Any messages or inquiries sent to us.</li>
</ul>
<p>b. Automatically Collected Information:</p>
<ul>
  <li>Device Information: IP address, browser type, operating system, and device identifiers.</li>
  <li>Usage Data: Pages visited, time spent on pages, and navigation patterns.</li>
</ul>
<p>c. Cookies and Tracking Technologies:</p>
<p>We use cookies to enhance your experience, track usage, and analyze performance. You can manage your cookie preferences in your browser settings.</p>`,
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    date: 'Dec 4, 2019 21:42',
    text: `<h1>Terms & Conditions</h1>
<p>1. Acceptance of Terms</p>
<p>By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.</p>
<p>2. User Conduct</p>
<p>You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the services. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our services.</p>
<p>3. Intellectual Property</p>
<p>All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Service, is the property of [Your Company Name] or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.</p>`,
  },
  'about-us': {
    title: 'About Us',
    date: 'Dec 4, 2019 21:42',
    text: `<h1>Welcome to [Your Company Name]!</h1>
<p>We are dedicated to providing you with the best experience for [briefly describe your service/platform]. Our mission is to [state your mission].</p>
<p>Founded in [Year], we have been committed to [key values/goals]. We believe in [something you believe in, e.g., innovation, community, excellence].</p>
<p>Our team is passionate about [area of expertise] and strives to [what your team does]. We are constantly working to improve our services and offer new features to meet your needs.</p>
<p>Thank you for being a part of our community!</p>`,
  },
  // New FAQs data structure
  faqs: {
    title: 'FAQs',
    date: 'Dec 4, 2019 21:42',
    questions: [
      {
        id: 1,
        question: 'What is your refund policy?',
        answer: '<p>Our refund policy states that...</p>',
      },
      {
        id: 2,
        question: 'How do I reset my password?',
        answer: '<p>You can reset your password by...</p>',
      },
      {
        id: 3,
        question: 'How can I contact support?',
        answer: '<p>You can contact support via...</p>',
      },
    ],
  },
};

// Dynamically import JoditEditor to prevent SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const SettingsPage = ({ onBackClick }) => {
  const editor = useRef(null);
  const [activeTab, setActiveTab] = useState('privacy-security');
  const [editableContent, setEditableContent] = useState('');
  const [faqs, setFaqs] = useState(contentData.faqs.questions);
  const [selectedFaq, setSelectedFaq] = useState(faqs[0] || null);

  const [tabContents, setTabContents] = useState(contentData);

  // Effect hook to update the editableContent or selectedFaq when the activeTab changes.
  useEffect(() => {
    if (activeTab === 'faqs') {
      // For FAQs, ensure selectedFaq is set when the tab is activated
      if (faqs.length > 0 && !selectedFaq) {
        setSelectedFaq(faqs[0]);
      }
      setEditableContent(selectedFaq ? selectedFaq.answer : '');
    } else {
      setEditableContent(tabContents[activeTab].text);
    }
  }, [activeTab, tabContents, faqs, selectedFaq]);

  // Jodit editor config
  const joditConfig = useMemo(
    () => ({
      readonly: false,
      spellcheck: false,
      buttons:
        'undo,redo,|,bold,italic,underline,strikethrough,|,ul,ol,|,link,cut,copy,paste,|,align,|,source',
      buttonsMD:
        'undo,redo,|,bold,italic,underline,strikethrough,|,ul,ol,|,link,cut,copy,paste,|,align,|,source',
      buttonsSM:
        'undo,redo,|,bold,italic,underline,strikethrough,|,ul,ol,|,link,cut,copy,paste,|,align,|,source',
      buttonsXS:
        'undo,redo,|,bold,italic,underline,strikethrough,|,ul,ol,|,link,cut,copy,paste,|,align,|,source',
      colors: {
        '#E1E1E1': '#E1E1E1',
      },
      toolbarButtonSize: 'large',
      theme: 'dark',
    }),
    [],
  );

  // Handler for the "Save & Change" button.
  const handleSaveAndChange = () => {
    if (activeTab === 'faqs' && selectedFaq) {
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.id === selectedFaq.id
            ? { ...faq, question: selectedFaq.question, answer: editableContent }
            : faq,
        ),
      );
      alert(`FAQ "${selectedFaq.question}" updated!`);
    } else {
      setTabContents((prevContents) => ({
        ...prevContents,
        [activeTab]: {
          ...prevContents[activeTab],
          text: editableContent, // Save the content from Jodit
        },
      }));
      alert(`Content for "${tabContents[activeTab].title}" saved!`);
    }
    console.log(`Saving content for ${tabContents[activeTab].title}:`, editableContent);
  };

  const handleQuestionChange = (e) => {
    if (selectedFaq) {
      setSelectedFaq({ ...selectedFaq, question: e.target.value });
    }
  };

  const handleFaqSelection = (faqId) => {
    setSelectedFaq(faqs.find((faq) => faq.id === faqId));
  };

  return (
    <div className="bg-[#343434] rounded-2xl min-h-screen text-white p-6 sm:p-6 lg:p-8">
      {/* Header section with Back button and Settings title */}
      <div className="flex items-center mb-6">
        {onBackClick && (
          <button
            className="text-light-gray-text hover:text-white transition-colors duration-200 mr-4"
            onClick={onBackClick}
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
      </div>

      {/* Tab Navigation for Privacy and security, Terms & Conditions, About Us, and FAQs */}
      <div className="border-b">
        <div className="md:w-[800px] flex justify-start bg-dark-bg rounded-t-lg ">
          {['privacy-security', 'terms-conditions', 'about-us', 'faqs'].map((tabId) => (
            <button
              key={tabId}
              className={`
                flex-1 py-4 text-center text-lg font-medium relative focus:outline-none transition-colors duration-200
                ${
                  activeTab === tabId
                    ? 'text-[#00C1C9]'
                    : 'text-light-gray-text hover:text-white'
                }
              `}
              onClick={() => setActiveTab(tabId)}
            >
              {tabContents[tabId].title}
              {activeTab === tabId && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] -mb-[1px] bg-[#00C1C9]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area for the selected tab */}
      <div className="bg-dark-bg p-4 rounded-b-lg -mt-px">
        {activeTab !== 'faqs' && (
          <>
            {/* Title and date of the current content for non-FAQ tabs */}
            <h2 className="text-xl font-semibold mb-1">{tabContents[activeTab].title}</h2>
            <p className="text-sm text-light-gray-text mb-4">
              {tabContents[activeTab].date}
            </p>

            {/* Jodit Editor for non-FAQ tabs */}
            <div className="rounded-md mb-6 py-2 ">
              <JoditEditor
                className=""
                ref={editor}
                value={editableContent}
                config={joditConfig}
                onChange={(newContent) => setEditableContent(newContent)}
              />
            </div>
          </>
        )}

        {activeTab === 'faqs' && (
          <div className="flex flex-col md:flex-row gap-4">
            {/* FAQ List Sidebar */}
            <div className="md:w-1/3 border-r border-gray-700 pr-4">
              <h3 className="text-lg font-semibold mb-3">Questions</h3>
              <ul>
                {faqs.map((faq) => (
                  <li key={faq.id} className="mb-2">
                    <button
                      className={`text-left w-full p-2 rounded-md transition-colors duration-200 ${
                        selectedFaq && selectedFaq.id === faq.id
                          ? 'bg-gray-700 text-white'
                          : 'text-light-gray-text hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => handleFaqSelection(faq.id)}
                    >
                      {faq.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Editor Area */}
            <div className="md:w-2/3">
              {selectedFaq ? (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="faq-question"
                      className="block text-sm font-medium text-light-gray-text mb-1"
                    >
                      Question:
                    </label>
                    <input
                      type="text"
                      id="faq-question"
                      value={selectedFaq.question}
                      onChange={handleQuestionChange}
                      className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[#00C1C9]"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="faq-answer"
                      className="block text-sm font-medium text-light-gray-text mb-1"
                    >
                      Answer:
                    </label>
                    <JoditEditor
                      className=" "
                      ref={editor}
                      value={editableContent}
                      config={joditConfig}
                      onChange={(newContent) => setEditableContent(newContent)}
                    />
                  </div>
                </>
              ) : (
                <p className="text-light-gray-text">Select an FAQ to edit.</p>
              )}
            </div>
          </div>
        )}

        {/* Save & Change Button */}
        <div className="col-span-full mt-4">
          <button
            type="button"
            onClick={handleSaveAndChange}
            className="w-full mx-auto flex justify-center items-center rounded-[4px] bg-cyan-400 hover:bg-cyan-300 text-white py-2 font-medium border-b-4 border-lime-400"
          >
            Save & Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;