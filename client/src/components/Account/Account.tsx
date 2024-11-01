import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextWrapper';
import './Account.css';

type ProfileField = 'fullName' | 'email' | 'phone' | 'mobile' | 'address';

interface Project {
  name: string;
  progress: number;
}

function Account() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Record<ProfileField, string>>({
    fullName: `${user.firstName} ${user.lastName}`,
    email: '',
    phone: '',
    mobile: '',
    address: '',
  });

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingProjects, setIsEditingProjects] = useState(false);

  const [visibility, setVisibility] = useState<Record<ProfileField, 'public' | 'private'>>({
    fullName: 'public',
    email: 'private',
    phone: 'private',
    mobile: 'private',
    address: 'private',
  });

  const [projects, setProjects] = useState<Project[]>([
    { name: 'Web Design', progress: 80 },
    { name: 'Website Markup', progress: 72 },
    { name: 'One Page', progress: 89 },
    { name: 'Mobile Template', progress: 55 },
    { name: 'Backend API', progress: 66 },
  ]);

  const handleEditContactClick = () => setIsEditingContact(!isEditingContact);
  const handleEditProjectsClick = () => setIsEditingProjects(!isEditingProjects);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as ProfileField]: value,
    }));
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name as ProfileField]: value as 'public' | 'private',
    }));
  };

  const handleProjectChange = (index: number, field: 'name' | 'progress', value: string | number) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return updatedProjects;
    });
  };

  // Function to add a new skill/project
  const handleAddSkill = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { name: 'New Skill', progress: 0 },
    ]);
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Profile Sidebar */}
        <div className="col-md-4">
          <div className="card text-center mb-4">
            <div className="card-body">
              <img 
                src={`../images/${user.image ? user.image : 'blank-profile-picture.png'}`} 
                className="UPP img-thumbnail rounded-circle mb-3" 
                alt="User Profile"
              />
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p className="text-muted">Full Stack Developer<br />Bay Area, San Francisco, CA</p>
              <button className="btn btn-primary mb-2">Follow</button>
              <button className="btn btn-outline-primary">Message</button>
            </div>
          </div>

          {/* Social Links */}
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><i className="bi bi-globe me-2"></i>Website: <a href="#">https://bootdey.com</a></li>
              <li className="list-group-item"><i className="bi bi-github me-2"></i>Github: <a href="#">bootdey</a></li>
              <li className="list-group-item"><i className="bi bi-twitter me-2"></i>Twitter: <a href="#">@bootdey</a></li>
              <li className="list-group-item"><i className="bi bi-instagram me-2"></i>Instagram: <a href="#">bootdey</a></li>
              <li className="list-group-item"><i className="bi bi-facebook me-2"></i>Facebook: <a href="#">bootdey</a></li>
            </ul>
          </div>
        </div>

        {/* Profile Details and Skills */}
        <div className="col-md-8">
          {/* Editable Contact Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Contact Information</h5>
            </div>
            <div className="card-body">
              {(Object.keys(formData) as ProfileField[]).map((field) => (
                <div key={field} className="mb-3">
                  <label className="form-label">
                    <strong>{field.replace(/^\w/, (c) => c.toUpperCase())}:</strong>
                  </label>
                  
                  {isEditingContact ? (
                    <input 
                      type="text" 
                      name={field} 
                      value={formData[field as ProfileField]} 
                      onChange={handleInputChange} 
                      className="form-control"
                    />
                  ) : (
                    <p>{formData[field as ProfileField]}</p>
                  )}

                  {isEditingContact && (
                    <div className="mt-2">
                      <div className="form-check form-check-inline">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name={field} 
                          value="public" 
                          checked={visibility[field as ProfileField] === 'public'} 
                          onChange={handleVisibilityChange}
                        />
                        <label className="form-check-label">Public</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name={field} 
                          value="private" 
                          checked={visibility[field as ProfileField] === 'private'} 
                          onChange={handleVisibilityChange}
                        />
                        <label className="form-check-label">Private</label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button onClick={handleEditContactClick} className="btn btn-info mt-3">
                {isEditingContact ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Editable Skills */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Skills</h5>
            </div>
            <div className="card-body">
              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  {isEditingProjects ? (
                    <>
                      <input 
                        type="text" 
                        value={project.name} 
                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                        className="form-control mb-2"
                      />
                      <input 
                        type="number" 
                        value={project.progress} 
                        onChange={(e) => handleProjectChange(index, 'progress', Number(e.target.value))}
                        className="form-control mb-2"
                        max="100"
                        min="0"
                      />
                    </>
                  ) : (
                    <>
                      <p><strong>{project.name}</strong></p>
                      <div className="progress">
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${project.progress}%` }} 
                          aria-valuenow={project.progress} 
                          aria-valuemin={0} 
                          aria-valuemax={100}
                        >
                          {project.progress}%
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Button Container */}
<div className="button-container mt-3">
  {isEditingProjects && (
    <button onClick={handleAddSkill} className="btn btn-success me-2">
      + Add Skill
    </button>
  )}
  <button onClick={handleEditProjectsClick} className="btn btn-info">
    {isEditingProjects ? 'Save' : 'Edit'}
  </button>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
