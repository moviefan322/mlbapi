import bases000 from "../assets/onbase/bases000.png";
import bases001 from "../assets/onbase/bases001.png";
import bases010 from "../assets/onbase/bases010.png";
import bases011 from "../assets/onbase/bases011.png";
import bases100 from "../assets/onbase/bases100.png";
import bases101 from "../assets/onbase/bases101.png";
import bases110 from "../assets/onbase/bases110.png";
import bases111 from "../assets/onbase/bases111.png";

const renderOnBaseImage = (game) => {
  const runnerOnFirst = game.liveData.linescore.offense.first;
  const runnerOnSecond = game.liveData.linescore.offense.second;
  const runnerOnThird = game.liveData.linescore.offense.third;

  if (!runnerOnFirst && !runnerOnSecond && !runnerOnThird) {
    return bases000;
  } else if (!runnerOnFirst && !runnerOnSecond && runnerOnThird) {
    return bases001;
  } else if (!runnerOnFirst && runnerOnSecond && !runnerOnThird) {
    return bases010;
  } else if (!runnerOnFirst && runnerOnSecond && runnerOnThird) {
    return bases011;
  } else if (runnerOnFirst && !runnerOnSecond && !runnerOnThird) {
    return bases100;
  } else if (runnerOnFirst && !runnerOnSecond && runnerOnThird) {
    return bases101;
  } else if (runnerOnFirst && runnerOnSecond && !runnerOnThird) {
    return bases110;
  } else if (runnerOnFirst && runnerOnSecond && runnerOnThird) {
    return bases111;
  }
};

export default renderOnBaseImage;