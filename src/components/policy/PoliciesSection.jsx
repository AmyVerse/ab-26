import { motion } from "framer-motion";
import "./PoliciesSections.css";

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

const PoliciesSection = ({ title, content }) => {

    return (
        <section className="bg-black py-16 md:py-20 flex flex-col items-center gap-16 md:gap-20">

            <motion.div
                className="w-full flex flex-col items-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Title Row */}
                <div className="relative w-full flex justify-center mb-8 md:mb-10">

                    {/* Red Gradient Line */}
                    <span className="absolute top-1/2 -translate-y-1/2 h-0.5 w-[calc(100%-160px)] md:w-[calc(100%-160px)] max-md:w-[calc(100%-32px)] bg-linear-to-r from-transparent via-[rgba(123,15,31,1)] to-transparent shadow-[0_0_6px_rgba(123,15,31,0.6)]" />

                    {/* Title */}
                    <h2 className="title-font relative z-10 bg-black md:px-8 px-4 text-white text-center font-medium tracking-[0.19em] md:tracking-[0.19em] max-md:tracking-[0.24em] text-[1.5rem] md:text-[2.5rem]">
                        {title}
                    </h2>
                </div>

                {/* Description */}
                <motion.div
                    className="w-full max-w-300 px-6 flex justify-center"
                    variants={itemVariants}
                >
                    <ol className="max-w-250 text-neutral-200 text-[0.95rem] md:text-[1.1rem] leading-relaxed font-[Gabarito] list-decimal space-y-3 text-left">

                        {content.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}

                    </ol>

                </motion.div>
            </motion.div>
        </section>
    );
};

export default PoliciesSection;
