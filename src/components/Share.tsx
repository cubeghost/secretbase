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
    <button onClick={share} className="icon-button icon-button--share">
      <span role="alert" className={clsx('tooltip', tooltipState.status)}>
        {tooltipState.isEnter && 'Copied ✅'}
      </span>
      <span>Share</span>
    </button>
  );
}

export default React.memo(Share);