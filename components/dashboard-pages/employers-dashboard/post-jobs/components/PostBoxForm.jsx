import { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { jobTypes } from "../../../../../data/job-types";
import { UserContext } from "../../../../../pages/context/UserContext";
import { VscChromeClose } from 'react-icons/vsc';

const PostBoxForm = () => {
  const categoriesFetch = useFetch();
  const formFetch = useFetch();
  const [success, setSuccess] = useState(false);
  const [tag, setTag] = useState('');
  const [skill, setSkill] = useState('');
  const [formError, setFormError] = useState(null);

  const user = useContext(UserContext);

  const [form, setForm] = useState({
    job_title: '',
    company: 1,
    location: '',
    salary: '',
    tag: '',
    category: '',
    experience: '',
    description: '',
    job_type: 'FT',
    required_skills: ''
  });

  const tagsArr = form.tag.split(' ').filter(Boolean);
  const skillsArr = form.required_skills.split(' ').filter(Boolean);

  const onSubmitForm = useCallback(async (e) => {
    try {
      setFormError(null);
      if (!skillsArr.length) { 
        setFormError('Missing skills, at least one skill is required');
        return;
      }
      setSuccess(false);
      e.preventDefault();
      const data = await formFetch.makeRequest('/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          company: user?.companyData?.id,
          category: +form.category
        })
      });
      setSuccess(Boolean(data));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (er) {
      setSuccess(false);
    }
  }, [form, user, skillsArr]);

  const onFormValueChange = useCallback((key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  useEffect(() => {
    Promise.all([
      categoriesFetch.makeRequest('/catagories/')
        .then((response) => {
          const [firstCategory] = response || [];
          if (!firstCategory) return;
          onFormValueChange('category', firstCategory?.id)
        }),
    ]);
  }, []);

  const onAddTag = useCallback(() => {
    const trimmedTag = tag.trim();
    if (!trimmedTag.length) return;
    onFormValueChange('tag', form.tag + (form.tag.length ? ' ' : '') + trimmedTag);
    setTag('');
  }, [tag, form.tag]);

  const onAddSkill = useCallback(() => {
    const trimmedSkill = skill.trim();
    if (!trimmedSkill.length) return;
    onFormValueChange(
      'required_skills', 
      form.required_skills + (form.required_skills.length ? ' ' : '') + trimmedSkill
    );
    setSkill('');
  }, [skill, form.required_skills]);

  const onRemoveTag = useCallback((tag) => {
    const newTagsList = tagsArr.filter((addedTag) => addedTag !== tag);
    onFormValueChange('tag', newTagsList.join(' '));
  }, [tagsArr]);

  const onRemoveSkill = useCallback((tag) => {
    const newSkillsList = tagsArr.filter((addedSkill) => addedSkill !== skill);
    onFormValueChange('required_skills', newSkillsList.join(' '));
  }, [skillsArr]);

  const categoryOptions = categoriesFetch.data?.map(category => {
    return (
      <option key={category.id} value={category.id}>
        {category.title}
      </option>
    );
  });

  const jobTypeOptions = jobTypes.map(type => {
    return (
      <option key={type.value} value={type.value}>
        {type.label}
      </option>
    );
  });

  const skillEls = skillsArr.map((tag, index) => (
    <button 
      onClick={() => onRemoveSkill(tag)} 
      key={index} 
      className="border-1 border py-1 px-2 rounded d-flex align-items-center gap-1"
    >
      {tag}
      <VscChromeClose />
    </button>
  ));

  const tagEls = tagsArr.map((tag, index) => (
    <button 
      onClick={() => onRemoveTag(tag)} 
      key={index} 
      className="border-1 border py-1 px-2 rounded d-flex align-items-center gap-1"
    >
      {tag}
      <VscChromeClose />
    </button>
  ));

  return (
    <form className="default-form" onSubmit={onSubmitForm}>
      {(formFetch.error || formError) && (
        <p className="error">
          {formError || 'Something went wrong'}
        </p>
      )}
      {success && (
        <h6 className="success mb-3">
          Job posting has successfully been created!
        </h6>
      )}
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            value={form.job_title}
            onChange={(e) => onFormValueChange('job_title', e.target.value)}
            type="text"
            placeholder="Title"
            required
          />
        </div>
 
        <div className="form-group col-lg-6 col-md-12">
          <label>Category</label>
          <select 
            value={form.category}
            onChange={(e) => onFormValueChange('category', +e.target.value)} 
            className="chosen-single form-select"
            required
          >
            {categoryOptions}
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary ($)</label>
          <input
            value={form.salary}
            required
            onChange={(e) => onFormValueChange('salary', +e.target.value)}
            type="number"
            min={0}
            placeholder="Salary"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Years of experience</label>
          <input
            value={form.experience}
            required
            onChange={(e) => onFormValueChange('experience', +e.target.value)}
            type="number"
            min={0}
            placeholder="Experience"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select 
            value={form.job_type}
            required
            className="chosen-single form-select"
            onChange={(e) => onFormValueChange('job_type', e.target.value)} 
          >
            {jobTypeOptions}
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Location / Address</label>
          <input
            required
            value={form.location}
            onChange={(e) => onFormValueChange('location', e.target.value)}
            type="text"
            placeholder="Location"
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => onFormValueChange('description', e.target.value)}
            type="text"
            placeholder="Description"
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Required skills</label>
          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            type="text"
            placeholder="Input skills separated by white space"
          />
          {skillEls.length > 0 && (
            <div className="d-flex gap-2 mt-2">
              {skillEls}
            </div>
          )}
          <button
            type="button"
            className="add-btn"
            onClick={onAddSkill}
          >
            <span className="icon flaticon-plus"></span> Add skill
          </button>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Tag</label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            type="text"
            placeholder="Input tags separated by white space"
          />
          {tagEls.length > 0 && (
            <div className="d-flex gap-2 mt-2">
              {tagEls}
            </div>
          )}
          <button
            type="button"
            className="add-btn"
            onClick={onAddTag}
          >
            <span className="icon flaticon-plus"></span> Add tag
          </button>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
