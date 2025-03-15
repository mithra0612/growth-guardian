import React, { useState } from "react";

export default function ScamEducationBlog() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [fontSize, setFontSize] = useState("normal");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const increaseFontSize = () => {
    if (fontSize === "normal") setFontSize("large");
    else if (fontSize === "large") setFontSize("x-large");
  };

  const decreaseFontSize = () => {
    if (fontSize === "x-large") setFontSize("large");
    else if (fontSize === "large") setFontSize("normal");
  };

  const fontSizeClasses = {
    normal: "text-base md:text-lg",
    large: "text-lg md:text-xl",
    "x-large": "text-xl md:text-2xl",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg flex gap-2">
        <button
          onClick={increaseFontSize}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded-full"
          aria-label="Increase font size"
        >
          A+
        </button>
        <button
          onClick={decreaseFontSize}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded-full"
          aria-label="Decrease font size"
        >
          A-
        </button>
      </div>

      {/* Hero Section */}
      <header className="text-center py-12 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <h1
            className={`${
              fontSize === "normal"
                ? "text-4xl md:text-5xl"
                : fontSize === "large"
                ? "text-5xl md:text-6xl"
                : "text-6xl md:text-7xl"
            } font-extrabold mb-4`}
          >
            Protect Yourself from Scams and Fraud
          </h1>
          <p
            className={`${
              fontSize === "normal"
                ? "text-xl md:text-2xl"
                : fontSize === "large"
                ? "text-2xl md:text-3xl"
                : "text-3xl md:text-4xl"
            } max-w-3xl mx-auto`}
          >
            Expert advice from AARP and the Federal Trade Commission (FTC)
          </p>
          <div className="mt-8">
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className={`${
                fontSize === "normal"
                  ? "text-lg"
                  : fontSize === "large"
                  ? "text-xl"
                  : "text-2xl"
              } px-8 py-3 bg-yellow-400 text-blue-800 font-bold rounded-full hover:bg-yellow-300 transition shadow-md`}
            >
              Get Help Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2
            className={`${
              fontSize === "normal"
                ? "text-2xl md:text-3xl"
                : fontSize === "large"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            } font-bold text-blue-700 mb-4`}
          >
            Why Older Adults Are Targeted
          </h2>
          <div
            className={`${fontSizeClasses[fontSize]} text-gray-700 space-y-4`}
          >
            <p>
              According to the FBI and FTC, scammers often target older adults
              because they tend to be more trusting, have financial savings, own
              their homes, and have good credit. AARP reports that seniors lose
              billions of dollars annually to fraud.
            </p>
            <p>
              The good news is that being aware of common scams and knowing the
              warning signs can help you protect yourself and your loved ones.
            </p>
          </div>
          <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded">
            <p
              className={`${fontSizeClasses[fontSize]} font-semibold text-gray-800`}
            >
              "Knowledge is your best defense against scammers."
              <span className="block mt-1 font-normal">
                {" "}
                — Federal Trade Commission
              </span>
            </p>
          </div>
        </section>

        {/* Common Scams */}
        <section className="mb-12">
          <h2
            className={`${
              fontSize === "normal"
                ? "text-2xl md:text-3xl"
                : fontSize === "large"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            } font-bold text-blue-700 mb-6 text-center`}
          >
            Common Scams Targeting Older Adults
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Government Impersonation Scams",
                source: "FTC",
                desc: "Scammers pretend to be from Social Security, Medicare, or the IRS, claiming you owe money or need to verify information. Government agencies will NEVER call asking for payment via gift cards or wire transfers.",
                icon: "🏛️",
              },
              {
                title: "Grandparent Scams",
                source: "AARP",
                desc: "Someone calls pretending to be your grandchild (or their lawyer) claiming they're in trouble and need money immediately. They'll beg you not to tell other family members.",
                icon: "👴",
              },
              {
                title: "Tech Support Scams",
                source: "FTC",
                desc: 'Pop-up warnings or phone calls claim your computer has a virus. They\'ll offer to "fix" it for a fee or ask for remote access to your computer, which gives them control of your information.',
                icon: "💻",
              },
              {
                title: "Romance Scams",
                source: "AARP",
                desc: "Scammers create fake profiles on dating sites or social media. After building trust and affection, they make up emergencies and ask for money. They always have excuses for why they can't meet in person.",
                icon: "❤️",
              },
              {
                title: "Lottery & Sweepstakes Scams",
                source: "FTC",
                desc: "You're told you've won a prize but must pay taxes or fees upfront to claim it. Remember: legitimate sweepstakes never ask for payment to receive a prize.",
                icon: "🎟️",
              },
              {
                title: "Medicare Scams",
                source: "AARP",
                desc: 'Callers claim to be Medicare representatives offering new cards or benefits. They ask for your Medicare number to "verify" your identity, then use it for fraudulent billing.',
                icon: "🏥",
              },
            ].map((scam, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-blue-600"
              >
                <div className="flex items-start">
                  <span className="text-4xl mr-4">{scam.icon}</span>
                  <div>
                    <h3
                      className={`${
                        fontSize === "normal"
                          ? "text-xl"
                          : fontSize === "large"
                          ? "text-2xl"
                          : "text-3xl"
                      } font-semibold text-blue-700`}
                    >
                      {scam.title}
                    </h3>
                    <p className="text-sm font-medium text-blue-600 mb-2">
                      Source: {scam.source}
                    </p>
                    <p className={`${fontSizeClasses[fontSize]} text-gray-700`}>
                      {scam.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Signs */}
        <section className="mb-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2
            className={`${
              fontSize === "normal"
                ? "text-2xl md:text-3xl"
                : fontSize === "large"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            } font-bold text-blue-700 mb-4`}
          >
            Warning Signs of a Scam
          </h2>
          <p className={`${fontSizeClasses[fontSize]} text-gray-700 mb-6`}>
            According to AARP and the FTC, these are common tactics scammers
            use:
          </p>
          <div className="space-y-6">
            {[
              {
                sign: "They pressure you to act immediately",
                details:
                  'Scammers create urgency to prevent you from thinking clearly or consulting others. They\'ll say things like "Act now or lose your benefits" or "Your account will be frozen."',
                icon: "⏰",
              },
              {
                sign: "They ask for unusual payment methods",
                details:
                  "Be suspicious if someone asks for payment via gift cards, wire transfers, cryptocurrency, or mailing cash. Government agencies and legitimate businesses never ask for these payment methods.",
                icon: "💳",
              },
              {
                sign: "They say there's a problem with your account or benefits",
                details:
                  "Scammers claim there's an issue with your Social Security, Medicare, or bank account to scare you. Always verify by contacting the organization directly using a number you know is genuine.",
                icon: "⚠️",
              },
              {
                sign: "They offer something too good to be true",
                details:
                  "Promises of free money, prizes, or miracle cures with no risk are almost always scams. Remember: if it sounds too good to be true, it probably is.",
                icon: "🎁",
              },
              {
                sign: "They request personal or financial information",
                details:
                  "Be extremely cautious about sharing your Social Security number, Medicare number, bank account details, or passwords—even if the person seems to know some information about you already.",
                icon: "🔒",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-4xl mr-4 mt-1">{item.icon}</span>
                <div>
                  <h3
                    className={`${
                      fontSize === "normal"
                        ? "text-lg md:text-xl"
                        : fontSize === "large"
                        ? "text-xl md:text-2xl"
                        : "text-2xl md:text-3xl"
                    } font-bold text-red-600`}
                  >
                    {item.sign}
                  </h3>
                  <p
                    className={`${fontSizeClasses[fontSize]} text-gray-700 mt-2`}
                  >
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-600 rounded">
            <p className={`${fontSizeClasses[fontSize]} font-semibold`}>
              AARP Tip: Trust your instincts. If something feels suspicious or
              uncomfortable, it's okay to hang up, delete the email, or walk
              away.
            </p>
          </div>
        </section>

        {/* How to Protect Yourself */}
        <section className="mb-12">
          <h2
            className={`${
              fontSize === "normal"
                ? "text-2xl md:text-3xl"
                : fontSize === "large"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            } font-bold text-blue-700 mb-6 text-center`}
          >
            How to Protect Yourself
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Be Cautious with Personal Information",
                source: "FTC",
                content:
                  "Never give out personal information like your Social Security number, Medicare number, bank account details, or passwords unless you initiated the contact and are certain who you're dealing with. Shred documents with personal information before discarding them.",
              },
              {
                title: "Verify Before You Trust",
                source: "AARP",
                content:
                  "If someone contacts you claiming to be from a company or government agency, hang up and call the organization directly using the official phone number from their website, a bill, or the back of your credit card.",
              },
              {
                title: "Use Strong Password Practices",
                source: "FTC",
                content:
                  "Create unique passwords for each account. Consider using a passphrase (like 'BlueSkyHappyDay2023!') instead of a single word. Enable two-factor authentication when available, which requires both a password and a code sent to your phone.",
              },
              {
                title: "Be Careful Online",
                source: "AARP",
                content:
                  "Don't click on links or attachments in unexpected emails or text messages. Type website addresses directly into your browser instead of clicking links. Be wary of free downloads and pop-up offers for antivirus protection.",
              },
              {
                title: "Set Up Fraud Alerts",
                source: "FTC",
                content:
                  "Ask your bank and credit card companies to send you alerts about suspicious activity. Consider placing a free fraud alert on your credit reports by contacting any one of the three major credit bureaus (Equifax, Experian, or TransUnion).",
              },
              {
                title: "Check Your Credit Reports",
                source: "AARP",
                content:
                  "Review your free credit reports regularly at AnnualCreditReport.com or by calling 1-877-322-8228. Look for accounts or charges you don't recognize, which could indicate identity theft.",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-green-500"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className={`w-full text-left p-4 flex justify-between items-center ${fontSizeClasses[fontSize]} font-semibold text-blue-700`}
                  aria-expanded={expandedSection === index}
                >
                  <div className="flex items-center">
                    <span>{tip.title}</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {tip.source}
                    </span>
                  </div>
                  <span className="text-xl">
                    {expandedSection === index ? "−" : "+"}
                  </span>
                </button>
                {expandedSection === index && (
                  <div className="p-4 pt-2 border-t border-gray-200">
                    <p className={`${fontSizeClasses[fontSize]} text-gray-700`}>
                      {tip.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* What to Do If Targeted */}
        {/* What to Do If Targeted */}
        <section className="mb-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2
            className={`${
              fontSize === "normal"
                ? "text-2xl md:text-3xl"
                : fontSize === "large"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            } font-bold text-blue-700 mb-4`}
          >
            What to Do If You've Been Targeted
          </h2>
          <div
            className={`${fontSizeClasses[fontSize]} text-gray-700 space-y-4`}
          >
            <p>
              If you think you've been contacted by a scammer or fallen victim
              to a scam, don't be embarrassed—scammers are professionals at
              deception. Take these steps right away:
            </p>
          </div>
          <div className="mt-6 space-y-6">
            {[
              {
                action: "Act Quickly",
                source: "FTC",
                steps: [
                  "If you shared financial information, contact your bank immediately",
                  "If you sent money via gift card, contact the company that issued the card",
                  "If you paid by credit card, contact your credit card company to dispute the charge",
                ],
              },
              {
                action: "Report the Scam",
                source: "AARP",
                steps: [
                  "Report to the FTC at ReportFraud.ftc.gov or 1-877-382-4357",
                  "Contact the AARP Fraud Watch Network Helpline: 1-877-908-3360",
                  "Report identity theft at IdentityTheft.gov",
                  "File a report with your local police department",
                ],
              },
              {
                action: "Protect Your Identity",
                source: "FTC",
                steps: [
                  "Change passwords for any affected accounts",
                  "Place a free fraud alert with the credit bureaus",
                  "Consider a credit freeze for maximum protection",
                  "Continue to monitor your credit reports and financial statements",
                ],
              },
              {
                action: "Seek Support",
                source: "AARP",
                steps: [
                  "Talk to a trusted family member or friend",
                  "Contact your local Area Agency on Aging for resources",
                  "If you feel overwhelmed, consider speaking with a counselor or therapist",
                ],
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-5">
                <h3
                  className={`${
                    fontSize === "normal"
                      ? "text-xl"
                      : fontSize === "large"
                      ? "text-2xl"
                      : "text-3xl"
                  } font-bold text-blue-700 mb-2 flex items-center`}
                >
                  <span className="mr-3 w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full text-sm">
                    {index + 1}
                  </span>
                  {item.action}
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {item.source}
                  </span>
                </h3>
                <ul className="list-disc pl-12 space-y-2 mt-3">
                  {item.steps.map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className={`${fontSizeClasses[fontSize]} text-gray-700`}
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Free Resources */}
        <section className="mb-12">
          <h2
            className={`${
              fontSize === "normal"
                ? "text-2xl md:text-3xl"
                : fontSize === "large"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            } font-bold text-blue-700 mb-6 text-center`}
          >
            Free Resources to Help You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "AARP Fraud Watch Network",
                phone: "1-877-908-3360",
                website: "www.aarp.org/money/scams-fraud",
                description:
                  "Free resource for people of all ages. Get fraud alerts, tips, and support if you've been targeted.",
              },
              {
                name: "FTC's Consumer Website",
                phone: "1-877-382-4357",
                website: "www.consumer.ftc.gov",
                description:
                  "Report scams, get tips, and find out what's happening with consumer protection issues.",
              },
              {
                name: "National Elder Fraud Hotline",
                phone: "1-833-372-8311",
                website: null,
                description:
                  "Free service that provides support to people who believe they may be victims of fraud.",
              },
              {
                name: "Identity Theft Resource Center",
                phone: "1-888-400-5530",
                website: "www.idtheftcenter.org",
                description:
                  "Live support for victims of identity theft. Help with creating a recovery plan.",
              },
              {
                name: "Free Credit Reports",
                phone: "1-877-322-8228",
                website: "www.annualcreditreport.com",
                description:
                  "Get a free copy of your credit report from each of the three major credit bureaus.",
              },
              {
                name: "Medicare Fraud Hotline",
                phone: "1-800-633-4227",
                website: "www.medicare.gov/fraud",
                description:
                  "Report suspicious Medicare claims or potential fraud related to your benefits.",
              },
            ].map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full"
              >
                <h3
                  className={`${
                    fontSize === "normal"
                      ? "text-xl"
                      : fontSize === "large"
                      ? "text-2xl"
                      : "text-3xl"
                  } font-semibold text-blue-700 mb-2`}
                >
                  {resource.name}
                </h3>
                <p
                  className={`${fontSizeClasses[fontSize]} text-gray-700 mb-2 flex-grow`}
                >
                  {resource.description}
                </p>
                <div className="pt-4 border-t border-gray-200 mt-auto">
                  <p className="font-bold text-gray-800">
                    <span className="inline-block w-6 text-center mr-2">
                      📞
                    </span>
                    {resource.phone}
                  </p>
                  {resource.website && (
                    <p className="font-bold text-blue-600 break-words">
                      <span className="inline-block w-6 text-center mr-2">
                        🌐
                      </span>
                      {resource.website}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Printable Checklist */}
        <section className="mb-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2
            className={`${
              fontSize === "normal"
                ? "text-2xl md:text-3xl"
                : fontSize === "large"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            } font-bold text-blue-700 mb-4`}
          >
            Printable Safety Checklist
          </h2>
          <div className={`${fontSizeClasses[fontSize]} text-gray-700 mb-6`}>
            <p>
              Keep this checklist handy as a quick reference. Click the button
              below to print it out.
            </p>
          </div>
          <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50 print:bg-white">
            <h3
              className={`${
                fontSize === "normal"
                  ? "text-xl"
                  : fontSize === "large"
                  ? "text-2xl"
                  : "text-3xl"
              } font-bold text-blue-700 mb-4 text-center`}
            >
              Scam Prevention Checklist
            </h3>
            <div className="space-y-4">
              {[
                "If someone contacts you claiming to be from a government agency (IRS, Social Security, Medicare), hang up and call the official number.",
                "Never send money via gift cards, wire transfers, or cryptocurrency when requested by someone you don't know and trust.",
                "Don't click on links in unexpected emails or text messages.",
                'If someone creates urgency ("Act now or else!"), it\'s likely a scam.',
                "Don't share personal information like your Social Security number or banking details with unexpected callers.",
                "If someone asks you to keep a conversation secret, be suspicious.",
                "Check your financial statements and credit report regularly.",
                "Use strong, unique passwords and enable two-factor authentication on important accounts.",
                "Before making a financial decision, discuss it with someone you trust.",
                "Remember: It's okay to hang up, say no, or take time to think.",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 mr-3 border-2 border-blue-700 print:border-black"></div>
                  <p className={`${fontSizeClasses[fontSize]} text-gray-800`}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2
              className={`${
                fontSize === "normal"
                  ? "text-2xl"
                  : fontSize === "large"
                  ? "text-3xl"
                  : "text-4xl"
              } font-bold mb-4`}
            >
              Need Help Right Now?
            </h2>
            <p
              className={`${fontSizeClasses[fontSize]} mb-6 max-w-2xl mx-auto`}
            >
              If you think you've been scammed or need advice, call the AARP
              Fraud Watch Network Helpline or the FTC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
              <div className="bg-white rounded-lg p-4 text-blue-700">
                <p className="font-bold text-xl">AARP Fraud Watch</p>
                <p className="text-2xl font-bold">1-877-908-3360</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-blue-700">
                <p className="font-bold text-xl">FTC Helpline</p>
                <p className="text-2xl font-bold">1-877-382-4357</p>
              </div>
            </div>
            <div className="mt-10 text-sm text-blue-200">
              <p>
                Information sourced from AARP and the Federal Trade Commission
                (FTC).
              </p>
              <p>Last Updated: March 2025</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
