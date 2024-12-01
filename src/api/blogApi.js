const getListBlog = async () => {
    try {
      const response = await fetch("/api/blog");
      const body = await response.json();
      return body;
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  
  const getBlogById = async (blog_id) => {
    try {
      const response = await fetch(`/api/blog/${blog_id}`);
      const body = await response.json();
      return body;
    } catch (error) {
      console.error("Error fetching blog by id:", error);
    }
  };
  
  const createBlog = async (data) => {
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: data,
      });
      const body = await response.json();
      return body;
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };
  
  const updateBlog = async (id, data) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: data,
      });
      const body = await response.json();
      return body;
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  
  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  

 
  
  const blogApi = {
    getListBlog,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
  };
  
  export default blogApi;
  