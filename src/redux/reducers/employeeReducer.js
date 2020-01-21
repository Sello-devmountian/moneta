const initialState = {
    employee: {}
};

const GET_EMPLOYEE = 'GET_EMPLOYEE';

export function getEmployee(employeeObj){
    console.log('getemplyee hit')

    return {
        type: GET_EMPLOYEE,
        payload: employeeObj
    }
}



export default function employeeReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_EMPLOYEE:
            return {...state, employee: payload}

        default:
            return state;
    }
}