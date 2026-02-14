import PageHero from "../components/page-hero/PageHero";
import PoliciesSection from "../components/policy/PoliciesSection";

const TermsAndConditions = () => {

    const termsAndConditions = {
        title: "TERMS & CONDITIONS",
        content: [
            "By completing any registration for Abhivyakti 2026, participants agree to comply with the rules of IIIT Nagpur and the specific event guidelines.",
            "Participation is open to all bona fide students holding a valid college identity card.",
            "The MVP, Headliner, and Flash registrations are non-transferable and must be presented at the entry gate for validation.",
            "The organizing committee holds the right to record and upload any performance held during the fest on various media platforms.",
            "Any misconduct, damage to college property, or use of prohibited substances will lead to immediate disqualification and removal from the campus without a refund."
        ],
    };

    return (
        <main>
            <PageHero title="Terms" />
            <PoliciesSection title={termsAndConditions.title} content={termsAndConditions.content} />
        </main>
    );
};

export default TermsAndConditions;
