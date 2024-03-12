import { MaintainInterface } from '../../interfaces/IMaintain';
import { MaintainStatusInterface } from '../../interfaces/IMaintainstatus';
import { MaintainTypeInterface } from '../../interfaces/IMaintaintype';

 const apiUrl = 'http://localhost:8080';
// const apiUrl = "https://api.megood.site";

async function createMaintain(data: MaintainInterface) {
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/maintain`, requestOptions)
  .then((response) => response.json())
  .then((res) => {
    if (res.data) {
      return { status: true, message: res.data };
    } else {
      return { status: false, message: res.error };
    }
  });

return res;
}

async function getAllMaintain(){
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/maintains`, requestOptions)

  .then((response) => response.json())
  .then((res) => {
    if (res.data) {
      return res.data;
    } else {
      return false;
    }
  });
return res;
}



async function GetMaintainById(id: Number) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/maintain/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}




async function deleteMaintain(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  let res = await fetch(`${apiUrl}/maintain/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {status: true};
      } else {
        return {status: false};
      }
    });

  return res;
}



async function updateMaintain(data: MaintainInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/maintain`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function updateMaintainUser(data: MaintainInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/maintainUser`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


  async function getMaintainStatusList(){
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/maintain-status`, requestOptions)
  
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
  }
  

  


  async function getMaintainStatusById(id: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  
    let res = await fetch(`${apiUrl}/maintain-status/${id}}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  

  async function getMaintainTypeList(){
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/maintain-type`, requestOptions)
  
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
  }
  

  async function getMaintainTypeById(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/maintain-type/${id}}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  

export {
    createMaintain,
    getAllMaintain,
    GetMaintainById,
    deleteMaintain,
    updateMaintain,
    getMaintainStatusList, 
    getMaintainStatusById,
    getMaintainTypeList, 
    getMaintainTypeById,
    updateMaintainUser
};
