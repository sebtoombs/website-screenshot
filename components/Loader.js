import css from "@styled-system/css";
import { motion } from "framer-motion";

const Loader = props => {
  return (
    <div css={css({ px: 4, py: 8 })}>
      <motion.div
        css={css({
          borderRadius: "30px",
          bg: "primary",
          width: "150px",
          height: "150px",
          mx: "auto"
        })}
        animate={{ scale: 0.5, rotate: 180, opacity: 0.5 }}
        transition={{
          yoyo: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Loader;
