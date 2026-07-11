import { useEffect, useState } from "react";

function CropManager() {
  const [crops, setCrops] = useState([]);

  const [crop, setCrop] = useState("");
  const [disease, setDisease] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  // LOAD CROPS
  const loadCrops = async () => {
    try {
      const res = await fetch(
        `${API}/api/crops`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load crops");
      }

      setCrops(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error(err);
      setCrops([]);
      alert("Unable to load crops.");
    }
  };


  // ADD / UPDATE
  const handleSubmit = async () => {

    if (!crop || !disease) {
      alert("Please fill all fields");
      return;
    }


    try {

      const url = editId
        ? `${API}/api/crops/${editId}`
        : `${API}/api/crops`;


      const method = editId ? "PUT" : "POST";


      const res = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          crop,
          disease,
          description
        })

      });


      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }


      setCrop("");
      setDisease("");
      setDescription("");
      setEditId(null);


      loadCrops();


    } catch (err) {

      console.error(err);
      alert(err.message);

    }
  };



  // DELETE
  const deleteCrop = async (id) => {

    try {

      const res = await fetch(
        `${API}/api/crops/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      if (!res.ok) {
        throw new Error("Delete failed");
      }


      loadCrops();


    } catch (err) {

      console.error(err);
      alert(err.message);

    }
  };



  // EDIT
  const startEdit = (c) => {

    setCrop(c.crop);
    setDisease(c.disease);
    setDescription(c.description);
    setEditId(c._id);

  };



  useEffect(() => {

    loadCrops();

  }, []);



  return (

    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#ffffff",
        minHeight: "100vh",
        color: "#000"
      }}
    >

      <h1>🌾 Crop Manager (CRUD Panel)</h1>


      <div style={{ marginBottom: "20px" }}>

        <h3>
          {editId ? "Update Crop" : "Add New Crop"}
        </h3>


        <input
          placeholder="Crop Name"
          value={crop}
          onChange={(e)=>setCrop(e.target.value)}
          style={{
            marginRight:"10px",
            padding:"8px",
            background:"#fff",
            color:"#000",
            border:"1px solid #000"
          }}
        />


        <input
          placeholder="Disease"
          value={disease}
          onChange={(e)=>setDisease(e.target.value)}
          style={{
            marginRight:"10px",
            padding:"8px",
            background:"#fff",
            color:"#000",
            border:"1px solid #000"
          }}
        />


        <input
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          style={{
            marginRight:"10px",
            padding:"8px",
            background:"#fff",
            color:"#000",
            border:"1px solid #000"
          }}
        />


        <button
          onClick={handleSubmit}
          style={{
            padding:"8px 15px",
            background:"#000",
            color:"#fff",
            cursor:"pointer"
          }}
        >
          {editId ? "Update" : "Add"}
        </button>


      </div>



      <h2>All Crops</h2>


      <table
        style={{
          width:"100%",
          borderCollapse:"collapse",
          marginTop:"20px",
          color:"#000"
        }}
      >

        <thead>

          <tr style={{
            background:"#000",
            color:"#fff"
          }}>

            <th style={{padding:"10px"}}>
              Crop
            </th>

            <th style={{padding:"10px"}}>
              Disease
            </th>

            <th style={{padding:"10px"}}>
              Description
            </th>

            <th style={{padding:"10px"}}>
              Actions
            </th>

          </tr>

        </thead>


        <tbody>

        {crops.map((c)=>(

          <tr key={c._id}>


            <td style={{padding:"10px",border:"1px solid #000"}}>
              {c.crop}
            </td>


            <td style={{padding:"10px",border:"1px solid #000"}}>
              {c.disease}
            </td>


            <td style={{padding:"10px",border:"1px solid #000"}}>
              {c.description}
            </td>


            <td style={{padding:"10px",border:"1px solid #000"}}>


              <button

                onClick={()=>startEdit(c)}

                style={{
                  marginRight:"10px",
                  background:"#333",
                  color:"#fff",
                  padding:"5px 10px"
                }}

              >
                Edit
              </button>



              <button

                onClick={()=>deleteCrop(c._id)}

                style={{
                  background:"red",
                  color:"#fff",
                  padding:"5px 10px"
                }}

              >
                Delete
              </button>


            </td>


          </tr>


        ))}


        </tbody>


      </table>


    </div>

  );

}


export default CropManager;