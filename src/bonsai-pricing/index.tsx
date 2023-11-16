import { useState } from "react";

import HomeLink from "../home-link";

type Pricing = {
  monthly: number;
  yearly: number;
};

type PricingPlan = {
  title: string;
  subtitle: string;
  features: string[];
  pricing: Pricing;
};

type AddOn = {
  title: string;
  subtitle: string;
  pricing: Pricing;
};

type FAQ = {
  question: string;
  answer: string;
};

const PricingPlans: PricingPlan[] = [
  {
    title: "Starter",
    subtitle: "Ideal for freelancers and contractors just starting out.",
    features: [
      "All Templates",

      "Unlimited Clients & Projects",

      "Invoicing & Payments",

      "Proposals & Contracts",

      "Tasks & Time Tracking",

      "Client CRM",

      "Expense Tracking",
      "20 Automations",

      "Up to 5 Project Collaborators",
    ],
    pricing: {
      monthly: 24,
      yearly: 17,
    },
  },
  {
    title: "Professional",
    subtitle: "Everything a growing independent business needs to thrive.",
    features: [
      "Everything in Starter plus...",
      "Custom Branding",
      "Forms & Questionnaires",
      "Workflow Automations",
      "Client Portal",
      "QuickBooks Integration",
      "Calendly Integration",
      "Zapier Integration",

      "Up to 15 Project Collaborators",
    ],
    pricing: {
      monthly: 39,
      yearly: 32,
    },
  },
  {
    title: "Business",
    subtitle: "The perfect package for small businesses and agencies.",
    features: [
      "Everything in Starter and Professional plus...",

      "Subcontractor Management",

      "Hiring Agreement Templates (1099 contracts)",

      "Subcontractor Onboarding",

      "Talent Pool",

      "Accountant Access",

      "Connect Multiple Bank Accounts",

      "Unlimited Subcontractors",

      "Unlimited Project Collaborators",
    ],
    pricing: {
      monthly: 79,
      yearly: 52,
    },
  },
];

const AddOns: AddOn[] = [
  {
    title: "Accounting & Tax Assistant",
    subtitle:
      "Manage your freelance finances and always be ready for tax season with easy-to-use accounting and tax tools.",
    pricing: {
      monthly: 9,
      yearly: 100,
    },
  },
  {
    title: "Partners",
    subtitle:
      "Invite other users for full account access and company management.",
    pricing: {
      monthly: 10,
      yearly: 90,
    },
  },
  {
    title: "Collaborators",
    subtitle:
      "Invite other users to specific projects for limited access and functionality.",
    pricing: {
      monthly: 0,
      yearly: 0,
    },
  },
];

const FAQS: FAQ[] = [
  {
    question: "How does the free trial work?",
    answer:
      "When you start your trial with Bonsai you'll receive full, unlimited access to all of Bonsai's Workflow or Workflow Plus Features! You will need to enter your credit card information to begin your trial, but don't worry - we won't charge you anything until the subscription ends! If you wish to cancel at any time during the trial period, you can do so through your Subscriptions Settings Page.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes, you can from within your account. If you have already subscribed to a plan, or want to downgrade or upgrade your current one, you can do this by going to your 'Settings' and  'Subscription'.",
  },
  {
    question: "How do I pause my Bonsai subscription?",
    answer:
      "We totally understand that with the nature of freelancing, work ebbs and flows so you might not always need your Bonsai subscription to remain active! The good news is that you can cancel or pause your monthly subscription at any time without penalty. Once cancelled, you'll be able to continue logging in to access all your documents and even continue to use our free features, like Time Tracking! In order to cancel your subscription, login to your Bonsai account.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "If you contact us within 2 weeks of being charged for your subscription, we will be happy to issue a refund for you!Beyond those 2 weeks, you will need to cancel or modify the subscription from the Subscriptions Tab in Settings to avoid future charges, but refunds will not be issued. This applies to both monthly and annual plans.",
  },
];

const BonsaiPricing = () => {
  const [monthly, setMonthly] = useState(true);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <header className="flex p-2 w-full h-full bg-yellow-400 text-white items-center justify-center">
        <HomeLink />
        <h1 className="text-4xl py-2 font-bold">Bonsai</h1>
      </header>
      <main className="flex p-4 flex-col w-full gap-2 bg-gray-200">
        <h2 className="text-lg font-bold">Plans & Pricing</h2>

        <div className="flex items-center justify-center p-4 gap-2">
          <div className="flex flex-col items-center -mt-4">
            <p className="text-green-400 font-bold">2 Months Free</p>
            <p className="text-2xl font-bold">Annual</p>
          </div>

          <div className="flex relative">
            <input
              id="frequency"
              className="hidden"
              type="checkbox"
              checked={monthly}
              aria-label="Change frequency"
              onChange={() => setMonthly((prev) => !prev)}
            />
            <label
              htmlFor="frequency"
              className={`px-12 py-6 rounded-3xl bg-green-600`}
            >
              {" "}
              <div
                className={`absolute top-0 right-0 bottom-0 bg-white border-4 rounded-full h-12 w-12`}
                style={{
                  left: monthly ? "50%" : "0",
                  transition: "left 0.2s ease-in-out",
                }}
              ></div>
            </label>
          </div>
          <p className="text-2xl font-bold">Monthly</p>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          {PricingPlans.map((plan, i) => {
            const pricingKey = monthly ? "monthly" : "yearly";
            return (
              <div
                className="flex flex-col relative lg:w-1/3 w-full bg-white rounded-lg px-4 py-8 text-gray-700"
                key={`plan-${i}`}
              >
                <p className="font-bold text-2xl">{plan.title}</p>
                <p className="w-2/3">{plan.subtitle}</p>
                <div className="inline-flex items-baseline gap-2 text-3xl my-6">
                  <p className="self-center">$</p>
                  <p className="text-8xl">{plan.pricing[pricingKey]} </p>/ MONTH
                </div>
                {!monthly && <p className="text-lg">Billed Yearly</p>}
                <hr className="border-green-400 border-2 mb-2 w-full"></hr>
                {plan.features.map((feature, index) => {
                  return (
                    <p className="p-2" key={`feature-${i}-${index}`}>
                      ✔️ {feature}
                    </p>
                  );
                })}
                <button className="p-4 bg-green-400 text-white w-full my-4 rounded-lg relative bottom-0">
                  START FREE
                </button>
              </div>
            );
          })}
        </div>

        <h2 className="text-lg  my-8 font-bold">
          Customize your workflow with add-ons
        </h2>
        <div className="flex flex-col w-full gap-4">
          {AddOns.map((addon, i) => {
            const pricingKey = monthly ? "monthly" : "yearly";
            const price = addon.pricing[pricingKey];
            return (
              <div
                key={`addon-${i}`}
                className="rounded-lg bg-white px-4 py-8 text-gray-800"
              >
                {price === 0 ? (
                  <p className="text-4xl font-bold">FREE</p>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold">$ {price}</p>/{" "}
                    {monthly ? "MONTH" : "YEAR"}
                  </div>
                )}
                <p className="pt-4 text-lg font-bold">{addon.title}</p>
                <p>{addon.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-100 rounded-lg flex items-center justify-center py-4 px-8 my-4 gap-2">
          <p className="w-1/2 lg:w-1/3 text-3xl text-center font-bold">
            It&apos;s <span className="text-green-400">your</span> business.
            We&apos;re here to help it grow.
          </p>
          <button className="p-2 bg-green-400 w-1/2 text-white font-bold rounded-lg">
            START FREE
          </button>
        </div>

        <h2 className="text-lg my-8 font-bold">Frequently Asked Questions</h2>
        <div className="flex flex-col bg-white px-4 py-8">
          {FAQS.map((faq, i) => {
            return (
              <details key={`faq-${i} p-4`}>
                <summary className="font-bold p-2">{faq.question}</summary>
                {faq.answer}
              </details>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default BonsaiPricing;
