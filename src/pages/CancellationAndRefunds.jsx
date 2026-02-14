import PageHero from "../components/page-hero/PageHero";
import PoliciesSection from "../components/policy/PoliciesSection";

const CancellationAndRefunds = () => {

    const cancellationAndRefunds = {
        title: "CANCELLATION & REFUNDS",
        content: [
            "Once a registration (MVP or Headliner) is successful, no refunds will be provided, including cases of no-shows or exam collisions.",
            "If the fest is cancelled by the institute administration, refund procedures will be initiated as per institutional guidelines.",
            "If a payment is deducted twice due to a technical error, the duplicate amount will be refunded to the original payment source within 5–7 working days.",
            "For any queries related to payment, refunds, or transaction failures, please email us at support@abhivyaktifest.in."
        ],
    };

    return (
        <main>
            <PageHero title="Cancellation" />
            <PoliciesSection title={cancellationAndRefunds.title} content={cancellationAndRefunds.content} />
        </main>
    );
};

export default CancellationAndRefunds;
