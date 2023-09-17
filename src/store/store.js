import {createStore}  from "vuex";
import patients from "@/store/modules/patients";
export default createStore({
    modules: {patients}
})