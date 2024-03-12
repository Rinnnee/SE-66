import { UserInterface } from "../../interfaces/Iuser";
import { AddressInterface } from "../../interfaces/IAddress";

// const apiUrl = "https://api.megood.site";
const apiUrl = "http://localhost:8080";

async function CreateUser(data: UserInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/user`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      console.log(result); // ดูค่าที่ server ส่งกลับมา
      const createdUser = result.data;
      return { status: true, message: 'User created successfully', user: createdUser };
    } else {
      const errorData = await response.json();
      return { status: false, message: `Error creating User: ${errorData.error}` };
    }
  } catch (error) {
    throw error;
  }
}



async function CreateAddress(studentID: string, addressData: AddressInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(addressData),
  };

  try {
    const response = await fetch(`${apiUrl}/user/${studentID}/address`, requestOptions);
    const result = await response.json();

    if (response.ok) {
      return { status: true, message: 'Address created successfully', data: result.data };
    } else {
      return { status: false, message: result.error || 'Failed to create address' };
    }
  } catch (error) {
    throw error;
  }
}

  

  
  async function UpdateUser(studentID: string, userData: UserInterface) {
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };
  
    try {
      const response = await fetch(`${apiUrl}/user/${studentID}`, requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        return { status: true, message: 'User update successfully', address: result.data };
      } else {
        return { status: false, message: result.error };
      }
    } catch (error) {
      throw error;
    }
  }
  
  async function UpdateAddress(studentID: string, addressData: AddressInterface) {
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(addressData),
    };
  
    try {
      const response = await fetch(`${apiUrl}/user/${studentID}/address`, requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        return { status: true, message: 'Address updated successfully', address: result.data };
      } else {
        return { status: false, message: result.error };
      }
    } catch (error) {
      throw error;
    }
  }
  

  async function GetAllBloodType() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/bloodtypes`, requestOptions)
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

  async function GetAllMajor() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/majors`, requestOptions)
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

async function GetAllUsers() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/users`, requestOptions)
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
  
  
  async function GetUserByStudentID(studentID: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await fetch(`${apiUrl}/user/${studentID}`, requestOptions);
    const result = await response.json();
    if (response.ok) {
      return result.data as UserInterface;
    } else {
      return null;
    }
  }
  
  async function DeleteUser(studentID: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  
    let res = await fetch(`${apiUrl}/user/${studentID}`, requestOptions)
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
    CreateUser,
    CreateAddress,
    UpdateUser,
    UpdateAddress,
    GetAllUsers,
    GetUserByStudentID,
    DeleteUser,
    GetAllMajor,
    GetAllBloodType,
  };