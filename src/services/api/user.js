// here lives all the services related to consuming the /user api endpoint 

import { api } from './index'

export async function addUserSevice(user){
    try {
        const { data } = await api.post("/user/", {
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username || `${user.firstName}${user.lastName}`,
          phone: user.primaryPhoneNumber?.phoneNumber || null,
        });

        return data.response;
      } catch (err) {
        return {"Error creating user": err.message};
      }

}