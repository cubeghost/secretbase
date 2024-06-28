import React from 'react';

import type { BaseId } from '../types';
import { ASSET_BASE } from "../constants";

export interface BaseProps {
  id: BaseId;
}

const StaticBase = ({ id }: BaseProps) => (
  <img src={`${ASSET_BASE}assets/bases/${id}.png`} className="util-pixelated util-block" />
);

export default React.memo(StaticBase);