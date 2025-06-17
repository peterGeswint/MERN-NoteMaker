import { Link } from "react-router";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim || !content.trim) {
      alert("Title and content are required.");
      return;
    }

    setLoading(true)
    try{
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note created successfully!");
      navigate("/");

    }catch (error) {
      console.error("Error creating note:", error);
      if (error.response && error.response.status === 429) {
        toast.error("You have exceeded the rate limit. Please try again later.",{
          duration: 4000,
          icon: "🚫",
        });


      }else {
        toast.error("Failed to create note. Please try again later.");
      }
     
    }finally {
      (setLoading(false)) 
  }
  }
  
  return (<div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-4">
        <ArrowLeftIcon className="size-5"/>
        Back to Notes
        </Link>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Create a New Note</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note Title" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Note Content" className="textarea textarea-bordered" value={content} onChange={(e) => setContent(e.target.value)}/>
              </div>

              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>)
};

export default CreatePage;
