import { ref, computed } from "vue";

export interface UseUIOptions {
    prefix: string;
    uiProps: any;
    defaultConfig: any;
    classProps: any;
    mergeAttrs?: boolean
}

export function useUI({ prefix, uiProps, defaultConfig, classProps, mergeAttrs }: UseUIOptions) {
    const config = computed(() => ({ ...defaultConfig, ...uiProps }));
    const attrs = computed(() => {
        const attrsObj = { ...classProps };
        if(mergeAttrs) {
            attrsObj.class = [attrsObj.class, config.value[prefix]]
        }
        return attrsObj;
    })

    return { ui: config, attrs: attrs }
}