import { api } from './index'

export async function getAllGoals(){

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

export async function addGoalService(goal) {
    try {
        const response = await api.post("/goal/", {
          title: goal
        });

        return response;
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
      const response = await api.put(`/goal/${id}`,{
        status: statusUpdate
      });

      return response;
    } catch (err) {
      return {"Error updating goal": err.message};
    } 
  }