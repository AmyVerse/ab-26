import PageHero from "../components/page-hero/PageHero";
import PoliciesSection from "../components/policy/PoliciesSection";

const ShippingPolicy = () => {

    const shippingPolicy = {
        title: "SHIPPING POLICY",
        content: [
            "All registrations (MVP, Headliner, Flash) are digital. Your registration status will be confirmed and accessible through the website/app immediately upon successful payment.",
            "For MVP Registration holders, official Abhivyakti merchandise must be collected physically from the designated 'Merch Desk' on the IIIT Nagpur campus during the fest days (March 19–21, 2026).",
            "We do not provide home delivery or shipping services for merchandise."
        ],
    };

    return (
        <main>
            <PageHero title="Shipping Policy" />
            <PoliciesSection title={shippingPolicy.title} content={shippingPolicy.content} />
        </main>
    );
};

export default ShippingPolicy;
