// here lives all the services related to consuming the /goal api endpoint 


import { api } from './index'

 
export async function getAllRoastsService(){
    try {
        const { data } = await api.get('/roast/user/')
        
        if(data.error){
            return {"error": "An error occurred"}
        }
        
        console.log(data);


        return data.response;

    } catch (err) {
        return {"error": err.message}
    }
}




export async function addRoastService(goal) {
    try {
        const { data } = await api.post("/roast/", {
          goal: goal
        });

        return data.response;
      } catch (err) {
        return {"Error creating roast": err.message};
      } 
}

