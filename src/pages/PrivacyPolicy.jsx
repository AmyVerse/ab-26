import PageHero from "../components/page-hero/PageHero";
import PoliciesSection from "../components/policy/PoliciesSection";

const PrivacyPolicy = () => {

    const privacyPolicy = {
        title: "PRIVACY POLICY",
        content: [
            "We collect your name, college, roll number, email, and contact details solely for registration purposes.",
            "Your data is utilized to facilitate your digital registration and to send official fest-related updates.",
            "Payment details are handled securely by Razorpay; Abhivyakti 2026 does not store your credit/debit card or UPI information.",
            "Personal data is not sold to third parties and is shared only with internal teams to facilitate event logistics."
        ],
    };

    return (
        <main>
            <PageHero title="Privacy Policy" />
            <PoliciesSection title={privacyPolicy.title} content={privacyPolicy.content} />
        </main>
    );
};

export default PrivacyPolicy;
