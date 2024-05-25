import api from "../Axios";

export const getEspecialidades = async () => {
  try {
    const response = await api.get("/especialidad");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

/* Expected output:
    [
        {
            "id": 1,
            "nombre": "Cardiología"
        },
        {
            "id": 2,
            "nombre": "Dermatología"
        },
        {
            "id": 3,
            "nombre": "Endocrinología"
        },    
    ]
*/
