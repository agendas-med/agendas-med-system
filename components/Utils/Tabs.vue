<template>
    <div class="system-tabs flex items-center flex-wrap">
        <div class="tab cinza fontsize-md" v-for="(tab, index) in tabs" :class="tabActive == index ? 'active' : ''" v-on:click="selectTab(index)" ref="tabs">
            <div class="tab-inner flex items-center">
                <p>{{ tab.name }}</p>
                <div class="tab-number fontsize-sm" v-if="tab.quantity != null">{{ tab.quantity }}</div>
            </div>
        </div>
        <div class="tabs-indicator" :style="indicatorStyle"></div>
    </div>
</template>
<script>
export default {
    props: ['tabs'],
    data() {
        return {
            tabActive: null,
            indicatorStyle: {
                width: '0px',
                left: '0px'
            }
        }
    },
    methods: {
        selectTab(index) {
            this.tabActive = index;
            this.updateIndicator();
            this.$emit("changedTab", index);
        },
        updateIndicator() {
            this.$nextTick(() => {
                const activeTab = this.$refs.tabs[this.tabActive];
                
                if (activeTab) {
                    const tabWidth = activeTab.offsetWidth;
                    const tabLeft = activeTab.offsetLeft;

                    this.indicatorStyle = {
                        width: `${tabWidth}px`,
                        left: `${tabLeft}px`
                    };
                }
            });
        }
    },
    mounted: function () {
        for (let i = 0; i < this.tabs.length; i++) {
            let currentTab = this.tabs[i];

            if (currentTab.default) {
                this.tabActive = i;
            }
        }

        this.selectTab(this.tabActive);
        this.updateIndicator();
    }
}
</script>
<style scoped>
.system-tabs {
    margin: var(--space-6) 0;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--cinza-medio);
    width: 100%;
    position: relative;
}

.tab {
    margin-right: var(--space-6);
    cursor: pointer;
    padding-bottom: var(--space-4);
    position: relative;
    transition: color 0.4s;
}

.active {
    color: var(--verde-escuro);
}

.tab-number {
    margin-left: var(--space-3);
    padding: 0 var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--cinza-claro); 
}

.tabs-indicator {
    position: absolute;
    bottom: 0;
    height: 3px;
    background-color: var(--verde-escuro); /* Cor do indicador */
    transition: all 0.4s;
}
</style>