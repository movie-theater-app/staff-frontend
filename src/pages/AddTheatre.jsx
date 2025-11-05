import AddTheatreForm from "../components/AddTheatreForm";
import Navbar from "../components/Navbar";
import { addTheatre } from "../api-logic/StaffApi";

export default function AddTheatre() {
  const handleSubmit = async (data) => {
    const res = await addTheatre(data); 
    console.log(await res.json());
  };

  return (
    <div>
        <Navbar showLinks={true}/>
        <h1 style={{color: "white", padding:"4rem 0 1rem 0", }}>Add new theatre</h1>
        <AddTheatreForm onSubmit={handleSubmit} />
    </div>
  )
};
