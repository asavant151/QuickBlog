import React, { useState, useRef, useEffect } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddBlog = () => {

  const {axios, fetchBlogs} = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);

    const onSubmitHandler = async (e) => {
       try {
         e.preventDefault();
         if (!image) {
           return toast.error("Image is required");
         }
         setIsAdding(true);

         const blog = {
          title, subTitle,
          description: quillRef.current.root.innerHTML,
          category,
          isPublished,
          isPrivate
         }

         const formData = new FormData();
         formData.append('blog', JSON.stringify(blog));
         formData.append('image', image);

         const {data} = await axios.post('/api/blog/add', formData);
         if(data.success) {
           toast.success(data.message);
           await fetchBlogs(); // Refresh blog list so Home page shows new data
           setImage(false);
           setTitle('');
           setSubTitle('');
           quillRef.current.root.innerHTML = '';
           setCategory('Startup');
         }
         else {
           toast.error(data.message);
         }
       } catch (error) {
        toast.error(error.message);
       } finally {
        setIsAdding(false);
       }
    }

    useEffect(() => {
       if(!quillRef.current && editorRef.current) {
        
        const imageHandler = () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
    
            input.onchange = async () => {
                const file = input.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append('image', file);
                    
                    const toastId = toast.loading("Uploading image...");
                    try {
                        const { data } = await axios.post('/api/blog/upload-image', formData);
                        if (data.success) {
                            const range = quillRef.current.getSelection(true);
                            quillRef.current.insertEmbed(range.index, 'image', data.url);
                            quillRef.current.setSelection(range.index + 1);
                            toast.success("Image uploaded", { id: toastId });
                        } else {
                            toast.error(data.message, { id: toastId });
                        }
                    } catch (error) {
                        toast.error(error.message, { id: toastId });
                    }
                }
            };
        };

        quillRef.current = new Quill(editorRef.current, {
            theme: 'snow',
            placeholder: 'Type here',
            modules: {
                toolbar: {
                    container: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ],
                    handlers: {
                        image: imageHandler
                    }
                }
            }
        })
       }
    }, [editorRef, axios])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>

      {/* Full-screen loader overlay during API call */}
      {isAdding && (
        <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm'>
          <div className='w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin'></div>
          <p className='mt-4 text-white text-sm font-medium tracking-wide'>Uploading blog...</p>
        </div>
      )}

      <div className='bg-white w-full max-w-3xl md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
           <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload_area" className='mt-2 h-16 rounded cursor-pointer' />
           <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])}/>
        </label>
        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <p className='mt-4'>Blog Sub Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>
        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}></div>
        </div>
        <p className='mt-4'>Blog Category</p>
        <select name="" id="" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded' onChange={(e) => setCategory(e.target.value)}>
           <option value="">Select category</option>
           {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
           ))}
        </select>

        <div className='flex gap-2 mt-4'>
            <p>Publish Now</p>
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className='scale-125 cursor-pointer' />
        </div>
        
        <div className='flex gap-2 mt-4'>
            <p>Private Blog (Requires Login)</p>
            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className='scale-125 cursor-pointer' />
        </div>

        <div className='flex gap-4 mt-8'>
            <button disabled={isAdding} type='submit' className='w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>{isAdding ? "Adding..." : "Add Blog"}</button>
            <button type='button' onClick={() => setShowPreview(true)} className='w-40 h-10 border border-primary text-primary bg-white rounded cursor-pointer text-sm'>Preview</button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-10">
              <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
                  <div className="sticky top-0 right-0 p-4 flex justify-end bg-white border-b border-gray-100 z-10">
                      <button type="button" onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl font-bold">&times;</button>
                  </div>
                  <div className="p-8">
                      <h1 className="text-4xl font-bold mb-4">{title || "Untitled Blog"}</h1>
                      <h2 className="text-xl text-gray-600 mb-8">{subTitle || "Blog Subtitle will appear here"}</h2>
                      {image && <img src={URL.createObjectURL(image)} alt="Preview" className="w-full rounded-2xl mb-8" />}
                      <div className="rich-text" dangerouslySetInnerHTML={{__html: quillRef.current?.root.innerHTML || "<p>No content written yet...</p>"}}></div>
                  </div>
              </div>
          </div>
      )}
    </form>
  )
}

export default AddBlog
