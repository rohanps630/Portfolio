import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import { TypeAnimation } from "react-type-animation";
import "./Header.scss";
import { UserData } from "../../constants/UserData";
import { Skills } from "../../assets";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header = () => (
  <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__header-info"
    >
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <span>👋</span>
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Hello, I am</p>
            <h1 className="head-text">{UserData.name}</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
          <TypeAnimation
            sequence={[
              UserData.tags[0],
              2000,
              UserData.tags[1],
              2000,
              UserData.tags[2],
              2000,
            ]}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className={"p-text"}
          />
        </div>
      </div>
    </motion.div>

    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
    >
      <img src={images.profile} alt="profile_bg" />
      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        src={String(images.circle)}
        alt="profile_circle"
        className="overlay_circle"
      />
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
    >
      {[
        Skills.ReactJs,
        Skills.NodeJs,
        Skills.JavaScript,
        Skills.TypeScript,
        Skills.Flutter,
        Skills.Redux,
      ].map((circle, index) => (
        <div className="circle-cmp app__flex" key={`circle-${index}`}>
          <img src={circle} alt="profile_bg" />
        </div>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Header, "home");
