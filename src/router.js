import {createRouter, createWebHashHistory} from "vue-router";
import menuBar from "@/components/menuBar.vue";
import pageOne from "@/components/pageOne.vue";
import pageTwo from "@/components/pageTwo.vue";
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/menu/',
            alias: '/',
            component: menuBar,
            children: [
                {
                    path: 'page1',
                    component: pageOne,
                },
                {
                    path: 'page2',
                    component: pageTwo,
                }


            ]

        }

    ]
})