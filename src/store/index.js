import {createStore} from 'vuex';
import todo from "@/store/modules/todo.js";
import user from "@/store/modules/user.js";

const index = createStore({
    modules: {
        todo,
        user
    }
});

export default index;