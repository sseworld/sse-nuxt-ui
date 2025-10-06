import { createTV } from "tailwind-variants";
import appConfig from "#build/app.config";
const appConfigTv = appConfig;
// @ts-ignore
export const tv = createTV(appConfigTv.ui?.tv);
