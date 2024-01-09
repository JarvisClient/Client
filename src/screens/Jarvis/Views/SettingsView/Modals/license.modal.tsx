import React from "react";
import { motion } from "framer-motion";
import { IcoCross, IcoFavorite, IcotInformation } from "@/Icons/pack_1";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

const LicenseModal: React.FC<Props> = ({ isOpen, closeModal }) => (isOpen ? (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-black/70 transition flex justify-center items-center"
        onClick={() => closeModal()}
    >
<div
    className="bg-background-sidebar p-14 w-[850px] h-[600px] rounded-md relative overflow-y-scroll overflow-x-hidden custom-scroll scrollbar-hidden"
    onClick={(e) => e.stopPropagation()}>
    <div
        onClick={() => closeModal()}
        className="absolute top-4 right-4 cursor-pointer">
        <IcoCross size={32} className="transition hover:brightness-75 hover:scale-105 active:brightness-105 active:scale-95"/>
    </div>

    <p className="text-3xl font-bold">License Disclaimers</p>
    <p className="text-2xl font-bold mt-4">Packages</p>
    <p>
        The following packages are used in this software project and are subject to their respective licenses:
        <ul>
            <li>@emotion/react</li>
            <li>@emotion/styled</li>
            <li>@tauri-apps/api</li>
            <li>autoprefixer</li>
            <li>chart.js</li>
            <li>dompurify</li>
            <li>framer-motion</li>
            <li>jsdom</li>
            <li>react</li>
            <li>react-chartjs-2</li>
            <li>react-dom</li>
            <li>react-router-dom</li>
            <li>showdown</li>
            <li>tailwindcss</li>
        </ul>
    </p>

    <p className="text-2xl font-bold mt-4">Iconography</p>
    <p>
        For Open Source Builds, we use the icons from <a className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer" href="https://phosphoricons.com/" target="_blank" rel="noopener noreferrer">Phosphor Icons</a>, which are licensed under the MIT License.
    </p>
    <p>
        For official releases, the icons from <a className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer" href="https://iconists.co/" target="_blank" rel="noopener noreferrer">Iconists</a> may be used. Please note that these icons are not available for the Open Source project due to licensing issues.
    </p>

    <p className="text-2xl font-bold mt-4">Font</p>
    <p>
        The font used in this project is <strong>Poppins</strong>.
    </p>
</div>

    </motion.div>
) : null);

export default LicenseModal;
