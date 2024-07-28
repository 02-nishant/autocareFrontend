import { myAxios } from "../helper/helper";



export const isLoggedIn= ()=>{
    let data = localStorage.getItem("data");
    if(data == null){
        return false;
    }else{
        return true;
    }
};

export const doLogin= (data, next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}

export const doLogout=(next)=>{
    localStorage.removeItem("data");
    next();
}

export const getCurrentUserDetail = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"));
    }else{
        return undefined;
    }
}

export const getUser = (userId) => {
    if (isLoggedIn()) {
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token; 
        return myAxios.get(`/api/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }).then(resp => resp.data);
    } else {
  
        return Promise.reject(new Error("User is not logged in"));
    }
}

export const updateUser = (userId, formData) => {
    if (isLoggedIn()) {
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' // Change content type to JSON
            }
        };

        return myAxios.put(`/api/user/${userId}`, JSON.stringify(formData), config)
            .then(resp => resp.data)
            .catch(error => {
                console.error('Error updating user:', error);
                throw error;
            });
    } else {
        return Promise.reject(new Error("User is not logged in"));
    }
};

export const getAllUser = () => {
    if(isLoggedIn()){
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser && currentUser.role === "ROLE_ADMIN"){
            return myAxios.get(`/api/user/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(resp => resp.data);

        }else {
  
            return Promise.reject(new Error("UnAuthorise User!!"));
        }
    }else {
  
        return Promise.reject(new Error("User is not logged in"));
    }
}

export const getAllVehicle = () => {
    if(isLoggedIn()){
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser && currentUser.role === "ROLE_ADMIN"){
            return myAxios.get(`/api/vehicle/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(resp => resp.data);

        }else {
  
            return Promise.reject(new Error("UnAuthorise User!!"));
        }
    }else {
  
        return Promise.reject(new Error("User is not logged in"));
    }
}

export const getAllInsurance = () => {
    if(isLoggedIn()){
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser){
            return myAxios.get(`/api/insurance/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(resp => resp.data);

        }else {
  
            return Promise.reject(new Error("UnAuthorise User!!"));
        }
    }else {
  
        return Promise.reject(new Error("User is not logged in"));
    }
}

export const deleteUser = (userId) => {
    if(isLoggedIn()){
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser && currentUser.role === "ROLE_ADMIN"){
            return myAxios.delete(`/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(resp => resp.data);
        } else {
            return Promise.reject(new Error("Unauthorized: Insufficient privileges"));
        }
    } else {
        return Promise.reject(new Error("User is not logged in"));
    }
}

export const deleteVehicle = (vehicleId) => {
    if(isLoggedIn()){
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser && currentUser.role === "ROLE_ADMIN" ){
            return myAxios.delete(`/api/vehicle/${vehicleId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(resp => resp.data);
        } else {
            return Promise.reject(new Error("Unauthorized: Insufficient privileges"));
        }
    } else {
        return Promise.reject(new Error("User is not logged in"));
    }
}

export const deleteInsurance = (insureId) => {
    if(isLoggedIn()){
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser && currentUser.role === "ROLE_ADMIN"){
            return myAxios.delete(`/api/insurance/${insureId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(resp => resp.data);
        } else {
            return Promise.reject(new Error("Unauthorized: Insufficient privileges"));
        }
    } else {
        return Promise.reject(new Error("User is not logged in"));
    }
}

export const addInsurance = (formData) => {
    if (isLoggedIn()) {
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser && currentUser.role === "ROLE_ADMIN"){
            return myAxios.post(`/api/insurance/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.data);
        } else {
            return Promise.reject(new Error("Unauthorized: Insufficient privileges"));
        }
        
    } else {
        return Promise.reject(new Error("User is not logged in"));
    }
};


export const addVehicle = (formData) => {
    if (isLoggedIn()) {
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser ){
            return myAxios.post(`/api/vehicle/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.data);
        } else {
            return Promise.reject(new Error("Unauthorized: Insufficient privileges"));
        }
        
    } else {
        return Promise.reject(new Error("User is not logged in"));
    }
};


export const deleteVehicleByUser = (vehicleId , userId) => {
    if(isLoggedIn()){
        const currentUser = getCurrentUserDetail();
        const token = currentUser.token;

        if(currentUser && currentUser.id == userId){
            return myAxios.delete(`/api/vehicle/${vehicleId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(resp => resp.data);
        } else {
            return Promise.reject(new Error("Unauthorized: Insufficient privileges"));
        }
    } else {
        return Promise.reject(new Error("User is not logged in"));
    }
}
