import { useState } from "react";
import Navbar from "../components/navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import { useEffect } from "react";
import api from '../lib/axios';
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [israteLimited, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log("Notes fetched:", res.data);
        setNotes(res.data);
        setRateLimit(false);
      } catch (error){
        console.error("Error fetching notes:");
        if (error.response && error.response.status === 429) {
          setRateLimit(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);
  return( 
    <div className="min-h-screen">
       <Navbar/>

       {israteLimited && <RateLimitedUI />}

       <div className="max-w-7xl mx-auto p-4 mt-6">
        <h1 className="text-3xl font-bold mb-4">Your Notes</h1>
        {loading && <div className="text-center">Loading notes...</div>}
        {notes.length === 0 && !israteLimited && <NotesNotFound/>}
        {notes.length > 0 && !israteLimited && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) =>(
            <NoteCard key= {note._id} note={note} setNotes={setNotes}/>
          ))}

       </div> 
        )}
      </div>
    </div>
   
  )
};

export default HomePage;
