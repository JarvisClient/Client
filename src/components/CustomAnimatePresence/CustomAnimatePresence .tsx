import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  currentFeature: string | undefined;
  activeJobBuild: number | null;
}

const CustomAnimatePresence = ({ children, currentFeature, activeJobBuild }: Props) => {
	const [animationKey, setAnimationKey] = useState(0);

	useEffect(() => {
		// Start animation when currentFeature changes
		setAnimationKey((prevKey) => prevKey + 1); // Change the key to trigger unmount/remount
	}, [currentFeature, activeJobBuild]);



	return (
		<motion.div
			key={animationKey} // Change the key to trigger unmount/remount
			initial={{ opacity: 0, y: -5 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.2}}>
			{children}
		</motion.div>
	);
};

export default CustomAnimatePresence;
