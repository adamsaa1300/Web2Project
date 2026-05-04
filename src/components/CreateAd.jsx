import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Navbar from "./navbar";
import { 
  FaCameraRetro, 
  FaLightbulb, 
  FaShieldHalved, 
  FaPlus, 
  FaXmark, 
  FaArrowRight,
  FaCamera,
  FaTag,
  FaBolt,
  FaCircle
} from "react-icons/fa6";

function CreateAd({ userRole }) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    university: "", 
    college: "",    
    price: "",
    condition: "new",
    description: "",
    isNegotiable: false
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const MAX_IMAGES = 8;

  const Colors = {
    bg: "#fdf5ec",
    nav: "#f5e7d0",
    navText: "#5a3e2b",
    card: "#ffffff",
    border: "#e6d3b3",
    text: "#5a3e2b",
    accent: "#cfa879",
    btnPrimary: "#5a3e2b"
  };

  const palestineCities = [
    "Acre (Akka)", "Al-Bireh", "Beersheba", "Bethlehem", "Deir al-Balah", 
    "Gaza City", "Haifa", "Hebron", "Jaffa", "Jenin", "Jericho", 
    "Jerusalem", "Khan Yunis", "Nablus", "Nazareth", "Qalqilya", 
    "Rafah", "Ramallah", "Safed", "Salfit", "Tiberias", "Tubas", "Tulkarm"
  ];

  const universities = [
    "Palestine University", 
    "An-Najah National University", 
    "Birzeit University", 
    "Palestine Technical University (Kadoorie)"
  ];

  const colleges = [
    "Medicine", 
    "Engineering", 
    "IT / Technology", 
    "Law", 
    "Business", 
    "Arts", 
    "Pharmacy"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePhotoClick = () => {
    if (selectedImages.length < MAX_IMAGES) {
      fileInputRef.current.click();
    } else {
      alert(`You can only upload up to ${MAX_IMAGES} photos.`);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const availableSlots = MAX_IMAGES - selectedImages.length;
    const newFiles = files.slice(0, availableSlots);
    setSelectedImages((prev) => [...prev, ...newFiles]);
    e.target.value = null; 
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImages.length === 0) {
      alert("Please upload at least one photo.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("university", formData.university); 
    data.append("college", formData.college);       
    data.append("price", Number(formData.price) || 0);
    data.append("condition", formData.condition);
    data.append("description", formData.description);
    data.append("isNegotiable", String(formData.isNegotiable));

    selectedImages.forEach((image) => {
      data.append("images", image);
    });

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/ads";
      const response = await axios.post(apiUrl, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 201 || response.status === 200) {
        alert("Listing Added Successfully! 🎉");
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error creating ad:", error);
      alert(error.response?.data?.message || "Failed to add listing. Make sure the server is running.");
    }
  };

  return (
    <div style={{ backgroundColor: Colors.bg, minHeight: "100vh" }}>
      <Navbar userRole={userRole} />

      <form className="container pb-5" style={{ paddingTop: "100px" }} onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="fw-bold mb-1" style={{ color: Colors.text }}>Add Listing</h2>
          <p className="text-muted small">Dashboard / Add Listing</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 mb-4 p-4" style={{ borderRadius: "12px" }}>
              <h6 className="fw-bold mb-3" style={{ color: Colors.text }}>Upload Photos ({selectedImages.length}/{MAX_IMAGES})</h6>
              <input type="file" ref={fileInputRef} multiple accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
              
              <div className="text-center p-5 mb-3 rounded-3 border border-2 border-dashed" 
                style={{ backgroundColor: "#fcf9f5", borderStyle: "dashed", borderColor: Colors.accent, cursor: selectedImages.length < MAX_IMAGES ? "pointer" : "not-allowed", opacity: selectedImages.length < MAX_IMAGES ? 1 : 0.6 }}
                onClick={handlePhotoClick}>
                <FaCameraRetro size={48} className="mb-3" style={{ color: Colors.accent }} />
                <button type="button" className="btn btn-outline-dark d-block mx-auto mb-2 px-4 shadow-sm bg-white border-0" style={{ color: Colors.text, border: `1px solid ${Colors.border}` }}>
                  {selectedImages.length < MAX_IMAGES ? "Add Photos" : "Limit Reached"}
                </button>
                <small className="text-muted">Maximum {MAX_IMAGES} clear photos</small>
              </div>
              
              <div className="d-flex gap-2 overflow-auto pb-2">
                 {selectedImages.map((file, index) => (
                   <div key={index} className="position-relative" style={{ minWidth: "85px", height: "85px" }}>
                     <img src={URL.createObjectURL(file)} alt="preview" className="rounded-3 border shadow-sm" style={{ width: "100%", height: "100%", objectFit: "cover", borderColor: Colors.border }} />
                     <button type="button" onClick={() => removeImage(index)} className="btn btn-danger btn-sm position-absolute top-0 end-0 d-flex align-items-center justify-content-center p-1 rounded-circle shadow" style={{ width: "22px", height: "22px", transform: "translate(30%, -30%)", fontSize: "10px" }}>
                        <FaXmark />
                     </button>
                   </div>
                 ))}
                 {[...Array(MAX_IMAGES - selectedImages.length)].map((_, i) => (
                    <div key={i} className="rounded-3 d-flex align-items-center justify-content-center bg-light border" style={{ minWidth: "85px", height: "85px", borderColor: Colors.border }}>
                        <FaPlus className="text-muted opacity-50" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="card shadow-sm border-0 p-4 mb-4" style={{ borderRadius: "12px" }}>
              <h6 className="fw-bold mb-3" style={{ color: Colors.text }}>Listing Details</h6>
              <div className="row g-3">
                <div className="col-md-12 mb-2">
                  <label className="form-label small fw-bold">Title *</label>
                  <input name="title" value={formData.title} onChange={handleChange} required type="text" className="form-control border-0 p-2 shadow-sm" style={{ backgroundColor: "#fcf9f5" }} placeholder="e.g. iPhone 15 Pro Max 256GB Titanium" />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="form-select border-0 shadow-sm" style={{ backgroundColor: "#fcf9f5" }}>
                    <option value="">Select Category</option>
                    <option value="motors">Cars & Motors</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion & Clothing</option>
                    <option value="home">Home & Garden</option>
                    <option value="realestate">Real Estate</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Location *</label>
                  <select name="location" value={formData.location} onChange={handleChange} required className="form-select border-0 shadow-sm" style={{ backgroundColor: "#fcf9f5" }}>
                    <option value="">Select City</option>
                    {palestineCities.map(city => (
                      <option key={city} value={city.toLowerCase()}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">University *</label>
                  <select name="university" value={formData.university} onChange={handleChange} required className="form-select border-0 shadow-sm" style={{ backgroundColor: "#fcf9f5" }}>
                    <option value="">Select University</option>
                    {universities.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Faculty *</label>
                  <select name="college" value={formData.college} onChange={handleChange} required className="form-select border-0 shadow-sm" style={{ backgroundColor: "#fcf9f5" }}>
                    <option value="">Select Faculty</option>
                    {colleges.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Price (₪) *</label>
                  <input name="price" value={formData.price} onChange={handleChange} required type="number" className="form-control border-0 shadow-sm" style={{ backgroundColor: "#fcf9f5" }} placeholder="0.00" />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Condition *</label>
                  <select name="condition" value={formData.condition} onChange={handleChange} className="form-select border-0 shadow-sm" style={{ backgroundColor: "#fcf9f5" }}>
                    <option value="new">Brand New (In Box)</option>
                    <option value="open_box">Open Box (Like New)</option>
                    <option value="used_excellent">Used - Like New</option>
                    <option value="used_good">Used - Good Condition</option>
                    <option value="used_fair">Used - Fair Condition</option>
                  </select>
                </div>

                <div className="col-md-12">
                   <div className="form-check form-switch bg-light p-2 rounded-3 border px-3 d-flex justify-content-between align-items-center shadow-sm">
                      <label className="form-check-label small mb-0">Negotiable Price</label>
                      <input name="isNegotiable" checked={formData.isNegotiable} onChange={handleChange} className="form-check-input ms-0" type="checkbox" />
                   </div>
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-bold">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required className="form-control border-0 p-2 shadow-sm" style={{ backgroundColor: "#fcf9f5" }} rows="4" placeholder="Tell us more about the item..."></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-3 p-4" style={{ backgroundColor: Colors.nav, borderRadius: "12px", color: Colors.text }}>
              <h6 className="fw-bold mb-3"><FaLightbulb className="me-2 text-warning" /> Selling Tips</h6>
              <ul className="list-unstyled small mb-0">
                <li className="mb-3 d-flex align-items-start"><FaCamera className="me-2 mt-1 text-success" /><span>Photos in <strong>natural light</strong> attract 3x more buyers.</span></li>
                <li className="mb-3 d-flex align-items-start"><FaTag className="me-2 mt-1 text-primary" /><span>Competitive prices lead to faster sales.</span></li>
                <li className="d-flex align-items-start"><FaBolt className="me-2 mt-1 text-warning" /><span>Fast replies build trust with buyers.</span></li>
              </ul>
            </div>

            <div className="card border-0 shadow-sm mb-4 p-4" style={{ backgroundColor: "#fff5f5", borderRadius: "12px", border: "1px solid #feb2b2" }}>
              <h6 className="fw-bold mb-3" style={{ color: "#c53030" }}><FaShieldHalved className="me-2" /> Safety First</h6>
              <ul className="list-unstyled small mb-0" style={{ color: "#742a2a" }}>
                <li className="mb-2 d-flex align-items-start"><FaCircle size={8} className="mt-2 me-2" /><span>Meet in a <strong>public place</strong> for exchange.</span></li>
                <li className="d-flex align-items-start"><FaCircle size={8} className="mt-2 me-2" /><span>Never send deposits upfront.</span></li>
              </ul>
            </div>

            <div className="d-flex gap-2">
              <button type="button" className="btn btn-white border flex-grow-1 py-2 fw-bold" style={{ backgroundColor: "#ffffff", color: Colors.text, borderColor: Colors.border }} onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn flex-grow-1 py-2 fw-bold shadow text-white border-0" style={{ backgroundColor: Colors.btnPrimary }}>Add Listing <FaArrowRight className="ms-2" size={14} /></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAd;