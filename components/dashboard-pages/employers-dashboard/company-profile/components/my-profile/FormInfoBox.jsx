import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../../pages/context/UserContext";
import LogoUpload from "../../../../candidates-dashboard/my-profile/components/my-profile/LogoUpload";
import { useFetch } from "../../../../../../hooks/useFetch";

const FormInfoBox = () => {
    const user = useContext(UserContext);
    const companyFetch = useFetch(false);
    const [success, setSuccess] = useState(false);
    const [companyLogo, setCompanyLogo] = useState('');

    const [form, setForm] = useState({
        description: '',
        title: '',
        website: ''
    });

    const company = user?.companyData;

    const onChangeForm = useCallback((key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const onUploadCompanyLogo = useCallback(async (e) => {
        const [logo] = e.target.files;
        if (!logo) return;
        const formData = new FormData();
        formData.append('company_logo', logo);
        const response = await companyFetch.makeRequest(
            `/companies/${company.id}/`,
            {
                method: 'PATCH',
                body: formData
            },
            true
        );
        if (response) {
            setCompanyLogo(logo.name);
        }
    }, [company]);

    const onSaveCompany = useCallback(async (e) => {
        setSuccess(false);
        e.preventDefault();
        const formCopy = { ...form, owner: user.id };
        if (formCopy.company_logo) {
            delete formCopy['company_logo'];
        }
        const response = await companyFetch.makeRequest(
            company ? `/companies/${company.id}/` : '/companies/',
            {
                method: company ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formCopy)
            }
        );
        if (response) {
            setSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (!company) {
                window.location.reload();
            }
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        }
    }, [company, form, user]);

    useEffect(() => {
        if (company) {
            setForm(company);
            const logoFileName = company?.company_logo?.split('/')?.at(-1);
            setCompanyLogo(logoFileName);
        }
    }, [company]);

    if ((!company && !user) || companyFetch.loading) {
        return <h6 className="text-center">Loading...</h6>
    }

    return (
        <form className="default-form" onSubmit={onSaveCompany}>
            {success && (
                <h5 className="success">
                    Company information has successfully been saved
                </h5>
            )}
            {companyFetch.error && (
                <h5 className="error">Something went wrong😐</h5>
            )}
            <div className="row">
                {/* <!-- Input --> */}
                <LogoUpload />

                {company && (
                    <div className="uploading-outer">
                        <label className="w-25">Company Logo</label>
                        <div className="uploadButton">
                            <input
                                className="uploadButton-input"
                                type="file"
                                accept="image/*"
                                id="upload-company-logo"
                                onChange={onUploadCompanyLogo}
                            />
                            <label
                                className="uploadButton-button ripple-effect"
                                htmlFor="upload-company-logo"
                            >
                                {companyLogo || "Browse Image"}
                            </label>
                            <span className="uploadButton-file-name"></span>
                        </div>
                        <div className="text">
                            Max file size is 1MB, Minimum dimension: 330x300 And
                            Suitable files are .jpg & .png
                        </div>
                    </div>
                )}

                <div className="form-group col-lg-6 col-md-12">
                    <label>Company name (optional)</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Invisionn"
                        required
                        value={form.title}
                        onChange={(e) => onChangeForm('title', e.target.value)}
                    />
                </div>

                {/* <!-- Input --> */}
                {/* <div className="form-group col-lg-6 col-md-12">
                    <label>Email address</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="ib-themes"
                        required
                    />
                </div> */}

                {/* <!-- Input --> */}
                {/* <div className="form-group col-lg-6 col-md-12">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="0 123 456 7890"
                        required
                    />
                </div> */}

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Website</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="www.invision.com"
                        required
                        value={form.website}
                        onChange={(e) => onChangeForm('website', e.target.value)}
                    />
                </div>

                {/* <!-- Input --> */}
                {/* <div className="form-group col-lg-6 col-md-12">
                    <label>Est. Since</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="06.04.2020"
                        required
                    />
                </div> */}

                {/* <!-- Input --> */}
                {/* <div className="form-group col-lg-6 col-md-12">
                    <label>Team Size</label>
                    <select className="chosen-single form-select" required>
                        <option>50 - 100</option>
                        <option>100 - 150</option>
                        <option>200 - 250</option>
                        <option>300 - 350</option>
                        <option>500 - 1000</option>
                    </select>
                </div> */}

                {/* <!-- Search Select --> */}
                {/* <div className="form-group col-lg-6 col-md-12">
                    <label>Multiple Select boxes </label>
                    <Select
                        defaultValue={[catOptions[2]]}
                        isMulti
                        name="colors"
                        options={catOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div> */}

                {/* <!-- Input --> */}
                {/* <div className="form-group col-lg-6 col-md-12">
                    <label>Allow In Search & Listing</label>
                    <select className="chosen-single form-select">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div> */}

                {/* <!-- About Company --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>About Company</label>
                    <textarea
                        placeholder="about"
                        value={form.description}
                        onChange={(e) => onChangeForm('description', e.target.value)}
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <button className="theme-btn btn-style-one">Save</button>
                </div>
            </div>
        </form>
    );
};

export default FormInfoBox;
