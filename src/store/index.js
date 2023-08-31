import {createStore} from 'vuex';
import todo from "@/store/modules/todo.js";

const index = createStore({
    modules: {
        todo
    }
});

export default index;