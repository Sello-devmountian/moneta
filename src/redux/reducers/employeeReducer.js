const initialState = {
    employee: {}
};

const GET_EMPLOYEE = 'GET_EMPLOYEE';
const DEL_EMPLOYEE = 'DEL_EMPLOYEE';

export function getEmployee(employeeObj){

    return {
        type: GET_EMPLOYEE,
        payload: employeeObj
    }
}

export function delEmployee(employee){
    return {
        type: DEL_EMPLOYEE,
        payload: null
    }
}

export default function employeeReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_EMPLOYEE:
            return {...state, employee: payload}

        case DEL_EMPLOYEE:
            return {...state, employee: {}}

        default:
            return state;
    }
}