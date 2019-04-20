<template>
    <div>
        <showplan-statement
            v-if="showPlan !== undefined"
            :show-plan="showPlan"
        />
    </div>
</template>

<script lang='ts'>
import {
    Vue, Component,
} from 'vue-property-decorator';
import { ShowPlanParser, ShowPlanXML } from 'showplan-js';
import { Statement as ShowplanStatement } from 'showplan-vue';

@Component({
    components: { ShowplanStatement },
    data() {
        return {
            showPlan: undefined,
        };
    },
})
export default class extends Vue {
    public showPlan: ShowPlanXML | undefined;

    planXmlChanged(plan: string): void {
        this.showPlan = ShowPlanParser.Parse(plan);
    }

    mounted() {
        // VS Code will dynamically add aquireVsCodeApi.
        // Since it isn't valid until then we'll need
        // to invoke it dynamically.
        // eslint-disable-next-line no-new-func
        const vsCodeFunction = Function(`
            if (typeof acquireVsCodeApi == 'function') {
            return acquireVsCodeApi();
            } else {
            return undefined;
            }
        `);

        this.$nextTick(() => {
            window.addEventListener('message', (event) => {
                const xml = event.data;
                this.planXmlChanged(xml);
            });
        });

        const vscode = vsCodeFunction();
        if (vscode !== undefined) {
            // we need to send a message to VS Code to tell it we are
            // ready to go and everything is loaded up so send us
            // the xml payload
            vscode.postMessage({ command: 'mounted' });
        }
    }
}
</script>
