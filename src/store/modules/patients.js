import {request} from "@/api/request";

export default  {
    actions: {
        async sendPatients(ctx, patientsInfo) {
            console.log(patientsInfo)
            const resultOfSendPatients = await request('/page1/add', 'POST',patientsInfo)
            ctx.commit('sendPatients', resultOfSendPatients);
        }

    },
    mutations: {
        sendPatients(state, allPatient) {
            const {successfulPatients, wrongFormat} = allPatient
            state.allPatients.wrongFormatPatients = wrongFormat
            state.allPatients.successfulPatients = successfulPatients
        }

    },
    state: {
        allPatients: {
            successfulPatients: [],
            wrongFormatPatients: [],
            duplicatesPatients: [],
        }

    },
    getters: {
        getAllPatients(state) {
            return state.allPatients
        }
    }
}