import React from 'react';

import type { BaseId } from '../types';
import { ASSET_BASE } from "../constants";

export interface BaseProps {
  id: BaseId;
  alt: string;
}

const StaticBase = ({ id, alt }: BaseProps) => (
  <img src={`${ASSET_BASE}assets/bases/${id}.png`} alt={alt} className="util-pixelated util-block" />
);

export default React.memo(StaticBase);