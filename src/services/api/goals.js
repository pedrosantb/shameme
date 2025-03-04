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
        return {"Error creating user": err.message};
      }

    
}