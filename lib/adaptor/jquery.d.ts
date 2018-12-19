import { OptionsType } from "../type";
declare global {
    interface JQuery {
        documentOutliner(options: OptionsType): JQuery;
    }
}
