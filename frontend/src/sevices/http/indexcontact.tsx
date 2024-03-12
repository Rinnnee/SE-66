import { ContactLogInterface } from "../../interfaces/IContactLog";
import { AdminResponseInterface } from "../../interfaces/IAdminResponse";


// const apiUrl = "https://api.megood.site";
const apiUrl = "http://localhost:8080";


async function GetContactLogsByUserID(id: number) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  
  const response = await fetch(`${apiUrl}/contact-log/${id}`, requestOptions);
  const result = await response.json();

  if (response.ok) {
    return result.data as ContactLogInterface;
  } else {
    return null;
  }
  
}

async function CreateContactLog(studentID: string, data: ContactLogInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(`${apiUrl}/contact-log/${studentID}`, requestOptions);
      if (response.ok) {
        const result = await response.json();
        const createdContactLog = result.data;
  
        return { status: true, message: 'Contact log created successfully', contactLog: createdContactLog };
      } else {
        const errorData = await response.json();
        return { status: false, message: `Error creating Contact Log: ${errorData.error}` };
      }
    } catch (error) {
      throw error;
    }
  }
  
  
  
  async function CreateAdminResponse(adminID: number,contactLogID: number, data: AdminResponseInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(`${apiUrl}/${adminID}/${contactLogID}/response`, requestOptions);

      const result = await response.json();
  
      if (response.ok) {
        return { status: true, message: 'Admin response created successfully', adminResponse: result.data };
      } else {
        return { status: false, message: result.error };
      }
    } catch (error) {
      throw error;
    }
  }
  
  
  async function DeleteContactLog(studentID: string, contactLogID: number) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
  
    try {
      const response = await fetch(`${apiUrl}/users/${studentID}/contact-logs/${contactLogID}`, requestOptions);
      if (response.ok) {
        return { status: true, message: 'Contact log deleted successfully' };
      } else {
        const errorData = await response.json();
        return { status: false, message: `Error deleting Contact Log: ${errorData.error}` };
      }
    } catch (error) {
      throw error;
    }
  }
  
  async function GetAllContactLogs() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
  
    try {
      const response = await fetch(`${apiUrl}/contact-logs`, requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        return result.data;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  
  export {
    CreateContactLog,
    CreateAdminResponse,
    DeleteContactLog,
    GetAllContactLogs,
    GetContactLogsByUserID
  };