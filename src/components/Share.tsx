import React, { useCallback } from "react"
import useTransition from "react-transition-state";
import copy from "copy-to-clipboard";
import clsx from "clsx";

import { encodeSaveData, minimizeSaveData } from "../share";

import { SaveData } from "../types";

interface ShareProps {
  getSaveData: () => SaveData;
}

const Share = ({ getSaveData }: ShareProps) => {
  // const [tooltip, setTooltip] = useState<string | null>(null);
  const [tooltipState, toggleTooltip] = useTransition({ timeout: 400, preEnter: true })

  const share = useCallback(async () => {
    const minimalSaveData = minimizeSaveData(getSaveData());
    const encodedSaveData = await encodeSaveData(minimalSaveData);
    const url = `${window.location.href}?share=1&${encodedSaveData}`;
    console.log(url);
    copy(url);
    toggleTooltip();
    setTimeout(() => {
      toggleTooltip();
    }, 2000);
  }, [getSaveData]);

  return (
    <div style={{position: "relative"}}>
      <span className={clsx('tooltip', tooltipState.status)}>
        Copied ✅
      </span>
      <button onClick={share} className="icon-button icon-button--share">
        <span>Share</span>
      </button>
    </div>
  );
}

export default React.memo(Share);