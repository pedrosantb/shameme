// here lives all the services related to consuming the /goal api endpoint 


import { api } from './index'

 
export async function getAllGoalsService(){
    try {
        const { data } = await api.get('/goal/user/')
        
        if(data.error){
            return {"error": "An error occurred"}
        }

        return data.response;

    } catch (err) {
        return {"error": err.message}
    }
}


export async function getGoalService(id){
  try {
      const { data } = await api.get(`/goal/${id}`)
      if (data.error) {
        return { "error": "An error occurred" };
    }
    return data.response;

  } catch (err) {
      return {"error": err.message}
  }
}


export async function addGoalService(goal) {
    try {
        const { data } = await api.post("/goal/", {
          title: goal
        });

        return data.response;
      } catch (err) {
        return {"Error creating goal": err.message};
      } 
}


export async function toggleGoalService(id, status) {
    
    let statusUpdate = "paused"
    if(status == statusUpdate){
      statusUpdate = "running"
    }

    try {
      const { data } = await api.put(`/goal/${id}`,{
        status: statusUpdate
      });

      return data.response;
    } catch (err) {
      return {"Error updating goal": err.message};
    } 
}
